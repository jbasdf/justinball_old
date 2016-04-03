// Debug tasks with:
// iron-node $(which gulp) build

'use strict';

var gulp          = require('gulp');
var filter        = require('gulp-filter');
var util          = require('gulp-util');
var htmlmin       = require('gulp-htmlmin');
var ignore        = require('gulp-ignore');
var rename        = require('gulp-rename');
var markedGulp    = require('gulp-markdown');
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
var moment        = require('moment');
var marked        = require('marked');
var highlight     = require('highlight.js');
var truncate      = require('truncate-html');

// Settings
var release       = argv.release;
var stage         = release ? "production" : "development";
var outputPath    = release ? settings.prodOutput : settings.devOutput;
var webpackConfig = require('./config/webpack.config')(stage);
var webpackStats;

var defaultLayout   = 'application.html';
var tagsTemplate    = ejs.compile(fs.readFileSync(path.join(__dirname, './themes/' + settings.theme + '/_tag.html'), 'utf8'), {cache: false});
var archiveTemplate = ejs.compile(fs.readFileSync(path.join(__dirname, './themes/' + settings.theme + '/_archive.html'), 'utf8'), {cache: false});

var dateRegEx     = /(\d{4})-(\d{1,2})-(\d{1,2})-(.*)/; // Regex used to parse date from file name

var site          = require('./site.json');
site.time         = new Date();

var markedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, language){
    if(language){
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlight.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlight.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    } else {
      return require('highlight.js').highlightAuto(code).value;
    }
  }
};
marked.setOptions(markedOptions);

// -----------------------------------------------------------------------------
// Clean up
// -----------------------------------------------------------------------------
gulp.task('clean', function(cb){
  var rimraf = require('rimraf');
  rimraf(outputPath, cb);
});


// -----------------------------------------------------------------------------
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


// -----------------------------------------------------------------------------
// Build markdown files in the content directory
// -----------------------------------------------------------------------------
gulp.task('markdown', function(){

  var srcDirs = ['../content/**/*.md', '../content/**/*.markdown', './html/**/*.md', './html/**/*.markdown'];
  return gulp.src(srcDirs)
    .pipe(frontMatter({property: 'metadata', remove: true}))  // Strips front matter and adds it to the metadata object
    .pipe(filename2date())                                    // Figures out data and other meta data based on file name
    .pipe(collectMetaData('<!--more-->'))                     // Finds all files with the layout "post" and adds 'summary' to metadata object. Summarize posts by adding <!--more--> to the html
    .pipe(markedGulp(markedOptions))
    .pipe(applyLayout(defaultLayout))
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


// -----------------------------------------------------------------------------
// Process html files in the content and html directories
// -----------------------------------------------------------------------------
gulp.task('html', ['markdown'], function(){

  var srcDirs = ['../content/**/*.html', '../content/**/*.html', './html/**/*.html', './html/**/*.html'];
  return gulp.src(srcDirs)
    .pipe(applyLayout(defaultLayout))
    .pipe(applyWebpack()) // Change to webpack hashed file names in release
    .pipe(!release ? util.noop() : htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(outputPath));
});


// -----------------------------------------------------------------------------
// Build pages for navigating with tags
// -----------------------------------------------------------------------------
gulp.task('tags', ['markdown'], function () {
  return tags()
    .pipe(applyLayout(defaultLayout))
    .pipe(gulp.dest(outputPath));
});


// -----------------------------------------------------------------------------
// Add paging for old posts
// -----------------------------------------------------------------------------
gulp.task('archive', ['markdown'], function () {
  return posts(10)
      .pipe(applyLayout(defaultLayout))
      .pipe(gulp.dest(outputPath));
});


// -----------------------------------------------------------------------------
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


// -----------------------------------------------------------------------------
// List of tasks involved in building html files
// -----------------------------------------------------------------------------
var htmlTasks = ['markdown', 'html', 'archive', 'tags'];


// -----------------------------------------------------------------------------
// Build the app from source code
// -----------------------------------------------------------------------------
gulp.task('build', ['clean'], function(cb){
  runSequence('javascript', htmlTasks, cb);
});


// -----------------------------------------------------------------------------
// Watch for changes to html files and rebuild as needed. Webpack watches everything else
// and serves js, css, etc from memory. Html files are served from the build directory.
// -----------------------------------------------------------------------------
gulp.task('watch', htmlTasks, function() {
  gulp.watch(['html/**/*'], htmlTasks);
});


// -----------------------------------------------------------------------------
// The default task
// -----------------------------------------------------------------------------
gulp.task('default', ['watch']);


// *****************************************************************************
// A bit hackish. This function can't be called until after the javascript task has been run
// because webpackStats is undefined until webpack has run.
// *****************************************************************************
function getHashed(entryPoint, ext){
  return _.find(webpackStats.assetsByChunkName[entryPoint], function(hashEntry){
    return path.extname(hashEntry).toLowerCase() === '.' + ext;
  });
}


// *****************************************************************************
// Changes webpack paths as needed.
// *****************************************************************************
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


// *****************************************************************************
// Apply layouts to content
// *****************************************************************************
function applyLayout(defaultLayout){
  return through2.obj(function (file, enc, cb) {

    var data = {
      site: site,
      metadata: file.metadata || {},
      moment: moment,
      "_": _
    };

    // Allow ejs code in content
    data.content = ejs.compile(String(file.contents), {
      cache: false,
      filename: file.path
    })(data);

    // If the user has specified a layout in the front matter user that.
    // Otherwise use the default
    var layoutFile = defaultLayout;

    // Home page is a special case
    if(file.path == "index.html"){
      layoutFile = "home";
    } else if(file.metadata && file.metadata.layout){
      layoutFile = file.metadata.layout;
    }

    var template = ejs.compile(loadTemplate(layoutFile));

    file.contents = new Buffer(template(data), 'utf8');
    this.push(file);
    cb();

  });
}

function safeReadLayout(file){
  try{
    return fs.readFileSync(file, 'utf8'), {
      cache: false,
      filename: file
    };
  } catch(e){
    return false;
  }
}

function firstValid(func, collection){
  _.each(collection, function(location){
    var val = func(location, arguments);
    if(val){ return val; }
  });
}

function loadTemplate(file){
  file = path.extname(file) ? file : file + '.html';
  return _(['./themes/' + settings.theme, './themes/default', './html'])
    .map(function(location){
      return path.join(__dirname, location + '/' + file);
    })
    .uniq()
    .find(safeReadLayout);
}

// *****************************************************************************
// Collects all files with layout "post" and adds the page and it's tags to arrays on the
// site object called "posts" and "tags". This can later be used to generate a home page.
// *****************************************************************************
function collectMetaData(marker) {
  var posts = [];
  var tags = {};
  return through2.obj(function(file, enc, cb) {

    // Only collect files with layout "post"
    if(file.metadata.layout && file.metadata.layout.toLowerCase() == "post"){

      file.metadata.content = file.contents.toString();
      file.metadata.tags = _.reduce(file.metadata.tags, function(acc, tag){ acc[tag] = cleanTag(tag); return acc;}, {});

      var summary;
      if(_.includes(file.metadata.content, marker)){
        summary = file.metadata.content.split(marker)[0];
      } else {
        summary = truncate(file.metadata.content, 1000);
      }

      file.metadata.summary = marked(summary);

      tags = _.merge(tags, file.metadata.tags);
      posts.push(file.metadata);
    }

    this.push(file);
    cb();
  },
  function(cb) {
    // Compare dates to sort
    function compare(a,b) {
      if(a.date.unix() > b.date.unix()) return -1;
      if(a.date.unix() < b.date.unix()) return 1;
      return 0;
    }
    site.posts = posts.sort(compare);
    site.tags = tags;
    cb();
  });
}


// *****************************************************************************
// Make tags snake case
// *****************************************************************************
function cleanTag(tag){
  return _.snakeCase(tag);
}


// *****************************************************************************
// Use the filename to build a directory of dates
// *****************************************************************************
function filename2date() {
  return through2.obj(function(file, enc, cb) {
    var basename = path.basename(file.path, '.md');
    var match = dateRegEx.exec(basename);
    if(match) {
      var year = match[1];
      var month = match[2];
      var day = match[3];
      var basename = match[4];
      file.metadata.date = moment(month + '-' + day + '-' + year, "MM-DD-YYYY");
      file.metadata.url = '/' + year + '/' + month + '/' + day + '/' + basename + '.html';
      if(!file.metadata.title){
        file.metadata.title = basename.replace(/_/g, ' ');
      }
    }

    this.push(file);
    cb();
  });
}


// *****************************************************************************
// Generate a file for every tag found. These will later have a template applied
// and their internal content evaluated by ejs.
// *****************************************************************************
function tags(){
  var stream = through2.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  });

  if(site.tags){
    _.each(site.tags, function(cleanTag, tag) {
      var data = {
        site: site,
        title: tag,
        currentTag: tag,
        cleanTag: cleanTag,
        "_": _
      };
      var file = new util.File({
        path: path.join(site.tagsPath, cleanTag) + '.html',
        contents: new Buffer(tagsTemplate(data))
      });
      file.metadata = data;
      stream.write(file);
    });
  }

  stream.end();
  stream.emit("end");

  return stream;
}


// *****************************************************************************
// Generate files for paging through all posts
// *****************************************************************************
function posts(count) {

  var stream = through2.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  });

  if(site.posts){
    var c     = 0;
    var page  = 0;
    var posts = [];
    var home  = 'index';
    var basename = 'page';

    function addPage(prevPage, nextPage){

      var data = {
        site: site,
        posts: posts,
        prevPage: prevPage,
        nextPage: nextPage,
        "_": _
      };

      var file = new util.File({
        path:  (page == 0 ? home : basename + page) + '.html',
        contents: new Buffer(archiveTemplate(data), 'utf8')
      });
      file.metadata = data;
      stream.write(file);
    }

    _.each(site.posts, function(post){
      posts.push(post);
      c++;
      if (c == count){
        var prevPage = page != 0 ? ((page-1) == 0 ? home : basename + page-1) + '.html' : null;
        var nextPage = (page+1) * count < site.posts.length ? basename + (page+1) + '.html' : null;
        addPage(prevPage, nextPage);
        c = 0;
        posts = [];
        page++;
      }
    });

    if (posts.length != 0) {
      var prevPage = page != 0 ? basename + ((page-1) == 0 ? home : basename + page) + '.html' : null;
      addPage(prevPage, null);
    }
  }

  stream.end();
  stream.emit("end");

  return stream;
}

