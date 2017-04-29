const minify = require('html-minifier').minify;
const webpackUtils = require('./webpack_utils');
const log = require('./log');

module.exports = function applyHtmlPaths(html, production, webpackAssets, buildSuffix) {

  const updatedHtml = webpackUtils.apply(
    html,
    webpackAssets,
    buildSuffix
  );

  if (production) {
    try {
      return minify(updatedHtml, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    } catch (err) {
      log.out(`Unable to minify html. Error: ${err}`);
      return updatedHtml;
    }
  }

  return updatedHtml;

};
