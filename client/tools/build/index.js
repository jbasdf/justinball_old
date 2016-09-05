var path          = require("path");
var _             = require("lodash");
var fs            = require("fs-extra");
var webpack       = require("webpack");
var nodeWatch     = require("node-watch");
var del           = require("del");
var moment        = require("moment");

var file            = require("./file");
var buildContent    = require("./content");
var templates       = require("./templates");
var utils           = require("./utils");
var applyProduction = require("./production");

// Settings
var webpackConfigBuilder = require("../../config/webpack.config");
var settings             = require("../../config/settings");
var argv                 = require("minimist")(process.argv.slice(2));
var release              = argv.release;
var stage                = release ? "production" : "development";

var site                 = require("../../site.json");
var inputPath            = path.join(__dirname, "../../../content");
var outputPath           = stage == "production" ? settings.prodOutput : settings.devOutput;

var ignoreFiles          = [".DS_Store"];

var themePath            = path.join(__dirname, "../../themes");
var templateDirs = [
  path.join(themePath, site.theme),
  path.join(themePath, "default")
];

var options              = {
  truncateSummaryAt : 1000,
  buildExtensions   : ['.html', '.htm', '.md', '.markdown'], // file types to build (others will just be copied)
  rootInputPath:   inputPath,            // Original input path
  entries:         settings.entries,     // Webpack entry points
  cssEntries:      settings.cssEntries,  // Webpack css entry points
  buildSuffix:     settings.buildSuffix, // Webpack build suffix. ie _bundle.js
  templateData:    {                     // Object that will be passed to every page as it is rendered
    site: site,
    time: new Date()
  },
  templateMap:     {                     // Used to specify specific templates on a per file basis
    "index.html": "home"
  },
  templateDirs:    templateDirs,          // Directories to look in for template
  summaryMarker:   "<!--more-->"
};

// -----------------------------------------------------------------------------
// run webpack to build entry points
// -----------------------------------------------------------------------------
function buildWebpackEntries(isHot){
  return new Promise(function(resolve, reject){
    var webpackConfig = webpackConfigBuilder(stage);
    if(!isHot){
      var bundler = webpack(webpackConfig);
      function bundle(err, stats){
        if(err){
          console.log("webpack error", err);
          reject(err);
        }
        //console.log("webpack", stats.toString({colors: true}));
        resolve({
          webpackConfig: webpackConfig,
          webpackStats: stats.toJson()
        });
      }
      bundler.run(bundle);
    } else {
      resolve(webpackConfig, null);
    }
  });
}

// -----------------------------------------------------------------------------
// build html and markdown files in a given directory
// -----------------------------------------------------------------------------
function buildContents(inputPath, outputPath, webpackConfig, webpackStats, stage, options){
  var results = [];
  var files = fs.readdirSync(inputPath);
  files.forEach(function(fileName){
    var fullInputPath = path.join(inputPath, fileName);
    var doOutput = options.templateDirs.indexOf(fullInputPath) < 0 && // Ignore template dirs
                  !_.includes(ignoreFiles, fileName);
    if(doOutput){
      if(fs.statSync(fullInputPath).isDirectory()){
        results = _.concat(results, buildContents(fullInputPath, outputPath, webpackConfig, webpackStats, stage, options));
      } else {
        var ext = path.extname(fullInputPath);
        if(_.includes(options.buildExtensions, ext)){
          var page = buildContent(fullInputPath, webpackConfig, webpackStats, stage, options);
          var outFile = fileName;
          var outPath = outputPath;
          var inPath = inputPath;
          if(page.destination && page.destination.length > 0){
            if(_.endsWith(page.destination, "/")){
              outPath = path.join(outPath, page.destination);
              outFile = "index.html";
            } else {
              outFile = page.destination;
            }
            inPath = "";
          }
          page.outputFilePath = file.write(inPath, outPath, outFile, page.html, options);
          results.push(page);
        } else {
          file.copy(inputPath, outputPath, fileName, options);
        }
      }
    }
  });
  return results;
}

/** -----------------------------------------------------------------------------
 * Build pages based on tags
 * @param {array} results, this is all of the blog posts, with all of their stuff
 * @param {object} options, info being passed between functions. Declared at top of file
 *  -----------------------------------------------------------------------------
 */
function buildTagPages(pages, stage, outputPath, webpackConfig, webpackStats, options){

  var tagsTemplate = templates.loadTemplate("partials/_tag.html", options.templateDirs);

  var tags = _.reduce(pages, function(tags, page){
    _.each(page.metadata.tags, function(tag){
      (tags[tag] || (tags[tag] = [])).push(page);
    });
    return tags;
  }, {});

  _.each(tags, function(posts, tag){
    var data = {
      site       : options.templateData.site,
      metadata   : { },
      title      : tag,
      currentTag : tag,
      cleanTag   : utils.cleanTag,
      posts      : posts,
      "_"        : _
    };

    // Build the tag content
    data.content = tagsTemplate(data);

    // Apply template
    var fileName = utils.cleanTag(tag) + ".html";
    var html = templates.apply(data, fileName, options.templateMap, options.templateDirs);
    html = applyProduction(html, stage, webpackConfig, webpackStats, options);
    file.write("", path.join(outputPath, site.tagsPath), fileName, html, options);
  });
}

// -----------------------------------------------------------------------------
// Build blog archive pages
// -----------------------------------------------------------------------------
function buildPostPages(pages, stage, outputPath, webpackConfig, webpackStats, options){
  var archiveTemplate = templates.loadTemplate("partials/_posts.html", options.templateDirs);
  var perPage = options.templateData.site.paginate;
  var max = _.floor(pages.length/perPage);
  _(pages)
  .filter(function(page){ // Only build archive pages for posts
    return _.includes(page.source, options.templateData.site.postsSource);
  })
  .chunk(perPage)
  .each(function(posts, index){
    var prevPage = (index > 1 ? index-1 : "index") + ".html";
    var nextPage = index < max ? index+1 + ".html" : "#";
    var fileName = (index == 0 ? "index" : index) + ".html";
    var title    = index == 0 ? "Recent Posts" : "";

    var data = {
      site       : options.templateData.site,
      metadata   : { },
      posts      : posts,
      title      : title,
      cleanTag   : utils.cleanTag,
      "_"        : _,
      prevPage   : prevPage,
      nextPage   : nextPage
    };

    // Build the content
    data.content = archiveTemplate(data);

    // Apply template
    var html = templates.apply(data, fileName, options.templateMap, options.templateDirs);
    html = applyProduction(html, stage, webpackConfig, webpackStats, options);
    file.write("", outputPath, fileName, html, options);
  });
}

// -----------------------------------------------------------------------------
// main build
// -----------------------------------------------------------------------------
function build(isHot){
  return new Promise(function(resolve, reject){
	var start = moment();
	
    // Delete everything in the output path
    del(outputPath, {force: true}).then(function(){

      // Copy static files to build directory
      try {
        var stats = fs.statSync(settings.staticDir);
        console.log("Copying static files in " + settings.staticDir);
        fs.copySync(settings.staticDir, outputPath);
      }
      catch(err) {
        // No static dir. Do nothing
      }

      // Build files
      console.log("Building files in: " + inputPath);
      buildWebpackEntries(isHot).then(function(packResults){
        var pages = buildContents(inputPath, outputPath, packResults.webpackConfig, packResults.webpackStats, stage, options);

        // Sort pages by date
        function compare(a,b) {
          if(a.date.unix() > b.date.unix()) return -1;
          if(a.date.unix() < b.date.unix()) return 1;
          return 0;
        }

        pages = pages.sort(compare);

        buildPostPages(pages, stage, outputPath, packResults.webpackConfig, packResults.webpackStats, options);
        buildTagPages(pages, stage, outputPath, packResults.webpackConfig, packResults.webpackStats, options);

        var duration = moment() - start;
        console.log("Done building files in: " + duration/1000 + " seconds");

        resolve({
          pages         : pages,
          inputPath     : inputPath,
          outputPath    : outputPath,
          webpackConfig : packResults.webpackConfig,
          webpackStats  : packResults.webpackStats,
          stage         : stage,
          options       : options
        });
      });
    });
  });
};

// -----------------------------------------------------------------------------
// watch
// -----------------------------------------------------------------------------
function watch(){
  return new Promise(function(resolve, reject){
    build(true).then(function(buildResults){

      // Watch content
      nodeWatch(buildResults.inputPath, function(filePath){
        // Build the page
        var page = buildContent(filePath, buildResults.webpackConfig, buildResults.webpackStats, buildResults.stage, buildResults.options);
        page.outputFilePath = file.write(buildResults.inputPath, buildResults.outputPath, path.basename(filePath), page.html, buildResults.options);

        // Rebuild archive and tag pages
        build(true);
      });

      // Watch themes
      nodeWatch(themePath, function(filePath){

        // Template has changed. Rebuild the site
        build(true);
      });
      resolve();
    });
  });
}

module.exports = {
  watch               : watch,
  build               : build
};













