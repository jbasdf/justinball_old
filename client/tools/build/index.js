var path          = require("path");
var _             = require("lodash");
var fs            = require("fs");
var webpack       = require("webpack");
var nodeWatch     = require("node-watch");

var buildContent  = require("./content");
var templates     = require("./templates");

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
// Delete everything
// -----------------------------------------------------------------------------
function clean(outputPath, cb){
  var rimraf = require("rimraf");
  rimraf(outputPath, cb);
}

// -----------------------------------------------------------------------------
// run webpack to build entry points
// -----------------------------------------------------------------------------
function buildWebpackEntries(webpackConfig, cb){
  var bundler = webpack(webpackConfig);
  function bundle(err, stats){
    if (err){
      throw new util.PluginError("webpack", err);
    }
    //console.log("[webpack]", stats.toString({colors: true}));
    cb(webpackConfig, stats.toJson());
  }
  bundler.run(bundle);
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
        results = _.concat(results, buildContents(inputPath, fullInputPath, webpackConfig, webpackStats, stage, options));
      } else {
        var page = buildContent(fullInputPath, webpackConfig, webpackStats, stage, options);
        page.outputFilePath = write(options.rootInputPath, outputPath, fileName, page.html, options);
        results.push(page);
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

  _(results)
    .map(function(page){
      return page.metadata.tags;
    })
    .flatten()
    .uniq()
    .each(function(tag){
      var data = {
        site: options.site,
        title: tag,
        currentTag: tag,
        cleanTag: utils.cleanTag(tag),
        "_": _
      };
      var content = tagsTemplate(data);
      write("", site.tagsPath, cleanTag + ".html", content, options);
    });
}

// -----------------------------------------------------------------------------
// Build blog archive pages
// -----------------------------------------------------------------------------
function buildPostPages(results, options){
  var archiveTemplate = templates.loadTemplate("partials/_posts.html", options.templateDirs);
}

// -----------------------------------------------------------------------------
// write file
// -----------------------------------------------------------------------------
function write(inputPath, outputPath, fileName, content, options){
  var relPath = inputPath.replace(options.rootInputPath, ""); // build relative path for output file
  var out = path.join(outputPath, relPath, fileName);
  fs.writeFile(out, content, function(err){
    if(err){ return console.log(err); }
  });
  return out;
}

// -----------------------------------------------------------------------------
// main build
// -----------------------------------------------------------------------------
function build(cb){
  console.log("Building files in: " + inputPath);
  clean(outputPath, function(){
    buildWebpackEntries(webpackConfigBuilder(stage), function(webpackConfig, webpackStats){
      results = buildContents(inputPath, outputPath, webpackConfig, webpackStats, stage, options);
      buildTagPages(results, options);
      buildPostPages(results, options);
      if(cb){
        cb(results, inputPath, outputPath, webpackConfig, webpackStats, stage, options);
      }
    });
  });
};

// -----------------------------------------------------------------------------
// watch
// -----------------------------------------------------------------------------
function watch(cb){
  build(function(results, inputPath, outputPath, webpackConfig, webpackStats, stage, options){
    nodeWatch(inputPath, function(filePath){
      var page = buildContent(filePath, webpackConfig, webpackStats, stage, options);
      page.outputFilePath = write(inputPath, outputPath, path.basename(filePath), page.html, options);
    });
    if(cb){ cb(); }
  });
}

module.exports = {
  watch               : watch,
  build               : build
};













