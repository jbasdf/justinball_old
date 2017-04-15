const _ = require('lodash');

const apps = require('./apps');
const posts = require('./posts');

// -----------------------------------------------------------------------------
// Build site
// -----------------------------------------------------------------------------
function buildSite(options) {

  // Build apps
  const buildResults = apps.buildApps(options);
  const buildPromises = _.map(buildResults, result => result.buildPromise);

  // Build themes
  const themePromises = ;

  Promise.all(_.union(buildPromises, themePromises)).then((results) => {

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
