const _ = require('lodash');

const apps = require('./apps');
const themes = require('./themes');
const posts = require('./posts');

// -----------------------------------------------------------------------------
// Build site
// -----------------------------------------------------------------------------
function buildSite(options) {

  // Build apps
  const appResults = apps.buildApps(options);

  // Build themes
  const themeResults = themes.buildThemes(options);

  const buildResults = _.union(themeResults, appResults);
  const buildPromises = _.map(buildResults, result => result.buildPromise);

  Promise.all(buildPromises).then((results) => {

    // Combine all built assets into a single object that can be used to resolve
    // paths inside buildPosts
    const webpackAssets = _.reduce(results,
      (collection, result) => _.merge(collection, result.webpackAssets),
    {});

    // Build posts
    posts.buildPosts(options, webpackAssets);
    console.log('Finished building posts');
  });

  return buildResults;
}

module.exports = {
  buildSite
};
