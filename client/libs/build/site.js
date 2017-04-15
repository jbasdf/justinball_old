const _ = require('lodash');

const apps = require('./apps');
const posts = require('./posts');

// -----------------------------------------------------------------------------
// Build site
// -----------------------------------------------------------------------------
function buildSite(options) {
  const buildResults = apps.buildApps(options);
  const buildPromises = _.map(buildResults, result => result.buildPromise);

  Promise.all(buildPromises).then((results) => {
    const webpackAssets = _.reduce(results,
      (collection, result) => _.merge(collection, result.webpackAssets),
    {});
    posts.buildPosts(options, webpackAssets);
    console.log('Finished building posts');
  });

  return buildResults;
}

module.exports = {
  buildSite
};
