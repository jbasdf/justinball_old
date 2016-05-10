var path          = require("path");
var _             = require("lodash");
var fs            = require("fs");
var frontMatter   = require("front-matter");
var minify        = require('html-minifier').minify;
var truncate      = require("html-truncate");
var moment        = require("moment");
var ejs           = require("ejs");

var webpackUtils  = require("./webpack_utils");
var utils         = require("./utils");
var marked        = require("./markdown");
var templates     = require("./templates");

// -----------------------------------------------------------------------------
// build a single file
// -----------------------------------------------------------------------------
module.exports = function(fullPath, webpackConfig, webpackStats, stage, options){
  var content     = fs.readFileSync(fullPath, "utf8");
  var parsed      = frontMatter(content);
  var metadata    = parsed.attributes;
  var pathResult  = utils.filename2date(fullPath);
  var date        = moment(new Date(pathResult.date || fs.statSync(fullPath).ctime));
  var title       = metadata.title || pathResult.title;
  var destination = metadata.permalink || pathResult.url;
  var data        = _.merge({
    "_"      : _,
    date     : date,
    title    : title,
    moment   : moment,
    metadata : metadata
  }, options.templateData);

  var html = parsed.body;

  try{
    // Allow ejs code in content
    html = ejs.compile(html, {
      cache: false,
      filename: fullPath
    })(data);
  } catch(err){
    console.log("Unable to compile html from " + fullPath);
    console.log(err);
    console.log("Call stack");
    console.log(err.stack);
  }

  // Parse any markdown in the resulting html
  var html = marked(html);

  // Generate summary of content
  var summary  = _.includes(html, options.summaryMarker) ?
    html.split(options.summaryMarker)[0] :
    truncate(html, options.truncateSummaryAt, { keepImageTag: true });

  // Apply template
  data.content = html; // Pass in generated html
  html = templates.apply(data, fullPath, options.templateMap, options.templateDirs);

  if(stage == "production"){
    html = webpackUtils.apply(html, webpackStats, webpackConfig, options.entries, options.cssEntries, options.buildSuffix);
    html = minify(html, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    });
  }

  return {
    title:       title,
    date:        date,
    metadata:    metadata,
    summary:     summary,
    source:      fullPath,
    destination: destination,
    html:        html
  };

};
