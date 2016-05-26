var minify        = require('html-minifier').minify;
var webpackUtils  = require("./webpack_utils");

module.exports = function(html, stage, webpackConfig, webpackStats, options){
  if(stage == "production"){
    html = webpackUtils.apply(html, webpackConfig, webpackStats, options.entries, options.cssEntries, options.buildSuffix);
    try{
      return minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    } catch(err){
      console.log("Error while minifying html: " + err);
      debugger;
    }
  }
  return html;
};