var path          = require("path");
var _             = require("lodash");
var fs            = require("fs");
var webpack       = require("webpack");
var nodeWatch     = require("node-watch");
var del           = require("del");

var file          = require("./file");
var buildContent  = require("./content");
var templates     = require("./templates");
var utils         = require("./utils");

// Settings
var webpackConfigBuilder = require("../../config/webpack.config");
var settings             = require("../../config/settings");
var argv                 = require("minimist")(process.argv.slice(2));
var release              = argv.release;
var stage                = release ? "production" : "development";

var site                 = require("../../site.json");
var inputPath            = path.join(__dirname, "../../../content");
var templateDirs         = [path.join(inputPath, "layouts")];
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
          if(page.destination && page.destination.length > 0){
            if(_.endsWith(page.destination, "/")){
              outPath = path.join(outPath, page.destination);
              outFile = "index.html";
            } else {
              outFile = page.destination;
            }
          }
          // Use .html for file extension
          var ext = path.extname(outFile);
          if(ext != ".html"){
            outFile = outFile.replace(ext, ".html");
          }
          page.outputFilePath = file.write(inputPath, outPath, outFile, page.html, options);
          results.push(page);
        } else {
          file.copy(inputPath, outputPath, fileName, options);
        }
      }
    }
  });
  return results;
}

// -----------------------------------------------------------------------------
// Build pages based on tags
// -----------------------------------------------------------------------------
function buildTagPages(results, options){

  var tagsTemplate = templates.loadTemplate("partials/_tag.html", options.templateDirs);

  var tags = _.reduce(results, function(tags, page){
    _.each(page.metadata.tags, function(tag){
      (tags[tag] || (tags[tag] = [])).push(page);
    });
    return tags;
  }, {});

  _.each(tags, function(tag, posts){
    var data = {
      site       : options.site,
      title      : tag,
      currentTag : tag,
      cleanTag   : utils.cleanTag(tag),
      posts      : posts,
      "_"        : _
    };
    var content = tagsTemplate(data);
    file.write("", site.tagsPath, cleanTag + ".html", content, options);
  });
}

// -----------------------------------------------------------------------------
// Build blog archive pages
// -----------------------------------------------------------------------------
function buildPostPages(results, options){
  var archiveTemplate = templates.loadTemplate("partials/_posts.html", options.templateDirs);
}

// -----------------------------------------------------------------------------
// main build
// -----------------------------------------------------------------------------
function build(isHot){
  return new Promise(function(resolve, reject){
    console.log("Building files in: " + inputPath);
    del(outputPath, {force: true}).then(function(){ // Delete everything in the output path
      buildWebpackEntries(isHot).then(function(packResults){
        var pages = buildContents(inputPath, outputPath, packResults.webpackConfig, packResults.webpackStats, stage, options);

        // Sort results by date
        function compare(a,b) {
          if(a.date.unix() > b.date.unix()) return -1;
          if(a.date.unix() < b.date.unix()) return 1;
          return 0;
        }

        results = results.sort(compare);
        buildTagPages(results, options);
        //buildPostPages(results, options);

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
      nodeWatch(buildResults.inputPath, function(filePath){
        var page = buildContent(filePath, buildResults.webpackConfig, buildResults.webpackStats, buildResults.stage, buildResults.options);
        page.outputFilePath = file.write(buildResults.inputPath, buildResults.outputPath, path.basename(filePath), page.html, buildResults.options);
      });
      resolve();
    });
  });
}

module.exports = {
  watch               : watch,
  build               : build
};













