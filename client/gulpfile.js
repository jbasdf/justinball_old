'use strict';

var gulp          = require('gulp');
var filter        = require('gulp-filter');
var util          = require('gulp-util');
var htmlmin       = require('gulp-htmlmin');
var ignore        = require('gulp-ignore');
var rename        = require('gulp-rename');
var marked        = require('gulp-markdown');
var frontMatter   = require('gulp-front-matter');

var through2      = require('through2');
var es            = require('event-stream');
var runSequence   = require('run-sequence');
var webpack       = require('webpack');
var settings      = require('./config/settings');
var argv          = require('minimist')(process.argv.slice(2));
var path          = require('path');
var _             = require("lodash");
var fs            = require("fs");
var mkdirp        = require("mkdirp");
var ejs           = require('ejs');

// Settings
var release       = argv.release;
var stage         = release ? "production" : "development";
var outputPath    = release ? settings.prodOutput : settings.devOutput;
var webpackConfig = require('./config/webpack.config')(stage);
var webpackStats;

var defaultLayout = 'application.html';
var dateRegEx     = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/; // Regex used to parse date from file name

var site          = require('./site.json');
site.time         = new Date();

// Clean up
// -----------------------------------------------------------------------------
gulp.task('clean', function(cb){
  var rimraf = require('rimraf');
  rimraf(outputPath, cb);
});


// Copy vendor files
// -----------------------------------------------------------------------------
// Use this task to copy assets (ie fonts) from node modules
gulp.task('vendor', function(){
  return es.merge(
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/**')
      .pipe(gulp.dest(outputPath + '/fonts')),
    gulp.src('./node_modules/font-awesome/fonts/**')
      .pipe(gulp.dest(outputPath + '/fonts'))
  );
});


// Build markdown files
// -----------------------------------------------------------------------------
gulp.task('markdown', function(){

  var options = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang, callback) {
      require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
        callback(err, result.toString());
      });
    }
  };

  return gulp.src('./html/**/*.md')
    .pipe(frontMatter({property: 'metadata', remove: true}))
    .pipe(applyLayout(defaultLayout))
    .pipe(marked(options))
    .pipe(summarize('<!--more-->'))
    .pipe(filename2date())
    .pipe(collectPosts())
    .pipe(applyWebpack()) // Change to webpack hashed file names in release
    .pipe(!release ? util.noop() : htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(rename(function (path) {
      path.extname = ".html";
      var match = dateRegEx.exec(path.basename);
      if (match){
        var year = match[1];            
        var month = match[2];
        var day = match[3];

        path.dirname = year + '/' + month + '/' + day;
        path.basename = match[4];
      }            
    }))


    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(outputPath));
});

// Process files in the html diretory
// -----------------------------------------------------------------------------
gulp.task('html', function(){

  var htmlFilter = filter('**/*.html', {restore: true});
  
  return gulp.src('./html/**/*')
    .pipe(ignore.exclude('layouts/**'))
    .pipe(ignore.exclude('layouts'))
    .pipe(ignore.exclude('partials/**'))
    .pipe(ignore.exclude('partials'))
    .pipe(ignore.exclude('**/*.md'))
    .pipe(htmlFilter)
    .pipe(applyLayout(defaultLayout))
    .pipe(applyWebpack()) // Change to webpack hashed file names in release
    .pipe(!release ? util.noop() : htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(outputPath));
});

// Build pages for navigating with tags
// -----------------------------------------------------------------------------
gulp.task('tags', ['markdown'], function () {
  return tags()
    .pipe(applyLayout('tag'))
    .pipe(gulp.dest(outputPath));
});

// Builds home page
// -----------------------------------------------------------------------------
gulp.task('index', ['html', 'markdown'], function () {
  return dummy('index.html')
    .pipe(applyLayout('home'))
    .pipe(gulp.dest(outputPath));
});

// Create JavaScript bundle
// -----------------------------------------------------------------------------
gulp.task('javascript', function(cb){

  var bundler = webpack(webpackConfig);
  function bundle(err, stats){
    webpackStats = stats.toJson();
    if (err){
      throw new util.PluginError('webpack', err);
    }
    //util.log('[webpack]', stats.toString({colors: true}));
    cb();
  }
  bundler.run(bundle);
});


// Build the app from source code
// -----------------------------------------------------------------------------
gulp.task('build', ['clean'], function(cb){
  runSequence('javascript', ['html', 'markdown', 'index', 'tags'], cb);
});


// Watch for changes to html files and rebuild as needed. Webpack watches everything else 
// and serves js, css, etc from memory. Html files are served from the build directory.
// -----------------------------------------------------------------------------
gulp.task('watch', ['html', 'markdown'], function() {
  gulp.watch(['html/**/*'], ['html', 'markdown']);
});

// The default task
gulp.task('default', ['watch']);


// A bit hackish. This function can't be called until after the javascript task has been run
// because webpackStats is undefined until webpack has run.
function getHashed(entryPoint, ext){
  return _.find(webpackStats.assetsByChunkName[entryPoint], function(hashEntry){
    return path.extname(hashEntry).toLowerCase() === '.' + ext;
  });
}


// Changes webpack paths as needed.
function applyWebpack(){
  return through2.obj(function (html, enc, cb) { // replace entry points with names generated by webpack
    if(release){
      var result = String(html.contents);
      _.each(webpackConfig.entry, function(path, entry){
        if(_.has(settings.entries, entry)){
          result = result.replace(entry + settings.buildSuffix, getHashed(entry, 'js'));  
        } else if(_.has(settings.cssEntries, entry)){
          result = result.replace(entry + '.css', getHashed(entry, 'css')); 
        }
      });
      html.contents = new Buffer(result);
    }
    this.push(html);
    cb();
  });
}


// Apply templates to content
function applyLayout(defaultLayout){
  return through2.obj(function (file, enc, cb) {            
    
    var data = {
      site: site,
      metadata: file.metadata
    };
    
    // Allow ejs code in content
    data.content = ejs.compile(String(file.contents), {
      cache: false,
      filename: file.path
    })(data);

    // If the user has specified a layout in the front matter user that.
    // Otherwise use the default
    var layout = file.metadata && file.metadata.layout ? file.metadata.layout : defaultLayout;
    layout = path.extname(layout) ? layout : layout + '.html';
    layout = path.join(__dirname, './html/layouts/' + layout);

    var template = ejs.compile(fs.readFileSync(layout, 'utf8'), {
      cache: false,
      filename: layout
    });
    
    file.contents = new Buffer(template(data), 'utf8');
    this.push(file);
    cb();

  });
}

// Collects all .md files and adds the page and it's tags to arrays on the site object called 'posts' and 'tags'
// This can later be used to generate a home page
function collectPosts() {
  var posts = [];
  var tags = [];
  return through2.obj(function(file, enc, cb) {
    posts.push(file.metadata);
    posts[posts.length - 1].content = file.contents.toString();

    if(file.metadata.tags) {
      file.metadata.tags.forEach(function(tag) {
        if(tags.indexOf(tag) == -1) {
          tags.push(tag);
        }
      });
    }

    this.push(file);
    cb();
  },
  function(cb) {
    posts.sort(function(a, b) {
      return b.date - a.date;
    });
    site.posts = posts;
    site.tags = tags;
    cb();
  });
}

function filename2date() {
  return through2.obj(function(file, enc, cb) {
    var basename = path.basename(file.path, '.md');
    var match = dateRegEx.exec(basename);
    if(match) {
      var year = match[1];
      var month = match[2];
      var day = match[3];
      var basename = match[4];
      file.metadata.date = new Date(year, month, day);
      file.metadata.url = '/' + year + '/' + month + '/' + day + '/' + basename + '.html';
    }

    this.push(file);
    cb();
  });
}

function summarize(marker) {
  return through2.obj(function(file, enc, cb) {
    var summary = file.contents.toString().split(marker)[0]
    file.metadata.summary = summary;
    this.push(file);
    cb();
  });
}

function tags() {    
  var stream = through2.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  });
    
  if (site.tags)
  {
    site.tags.forEach(function (tag) {
      var file = new gutil.File({
        path: tag + '.html',
        contents: new Buffer('')
      });
      file.metadata = {title: tag, tag: tag}
            
      stream.write(file);        
    });
  }
  
  stream.end();
  stream.emit("end");
  
  return stream;
}

function dummy(file) {
  var stream = through2.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  });
    
  if (site)
  {
    var file = new gutil.File({
      path: file,
      contents: new Buffer('')
    });
    file.metadata = {}        
    stream.write(file);        
  }
  
  stream.end();
  stream.emit("end");
  
  return stream;
}

