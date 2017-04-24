const _ = require('lodash');

const apps = require('./apps');
const themes = require('./themes');
const posts = require('./posts');
const webpackUtils = require('./webpack_utils');

// -----------------------------------------------------------------------------
// Build site
// -----------------------------------------------------------------------------
function buildSite(options) {

  // Build apps
  const appResults = apps.buildApps(options);

  // Build themes
  const themeResults = themes.buildThemes(options);

  const buildResults = _.union(appResults, themeResults);
  const buildPromises = _.map(buildResults, result => result.buildPromise);
  const buildApp = _.map(buildResults, result => result.app);

  Promise.all(buildPromises).then(() => {

    // Combine all built assets into a single object that can be used to resolve
    // paths inside buildPosts
    const webpackAssets = _.reduce(buildApp,
      (collection, app) => _.merge({}, collection,
        webpackUtils.loadWebpackAssets(app)),
      {}
    );

    // Build posts
    posts.buildPosts(options, webpackAssets);
    console.log('Finished building posts');
  });

  return buildResults;
}

module.exports = {
  buildSite
};
