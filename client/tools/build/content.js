var path          = require("path");
var _             = require("lodash");
var fs            = require("fs");
var frontMatter   = require("front-matter");
var truncate      = require("html-truncate");
var moment        = require("moment");
var ejs           = require("ejs");

var utils           = require("./utils");
var marked          = require("./markdown");
var templates       = require("./templates");
var applyProduction = require("./production");

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
  var destination = metadata.permalink || pathResult.url || "/";
  var data        = _.merge({
    "_"      : _,
    date     : date,
    title    : title,
    moment   : moment,
    metadata : metadata,
    url      : path.join(options.templateData.site.domain, destination)
  }, options.templateData);

  var html = parsed.body;

  // Parse any markdown in the resulting html
  html = marked(html);

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

  // Generate summary of content
  var summary  = _.includes(html, options.summaryMarker) ?
    html.split(options.summaryMarker)[0] :
    truncate(html, options.truncateSummaryAt, { keepImageTag: true });

  // Apply template
  data.content = html; // Pass in generated html
  html = templates.apply(data, fullPath, options.templateMap, options.templateDirs);
  html = applyProduction(html, stage, webpackConfig, webpackStats, options);

  return {
    title       : title,
    date        : date,
    metadata    : metadata,
    summary     : summary,
    source      : fullPath,
    destination : destination,
    html        : html,
    url         : destination
  };

};
