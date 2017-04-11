const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));

const apps = require('./libs/build/apps');
const posts = require('./libs/build/posts');

const stage = argv.release ? 'production' : 'development';
const port = parseInt(process.env.ASSETS_PORT, 10) || 8080;
const options = { port, stage, onlyPack: argv.onlyPack };

const buildPromises = _.map(apps.buildApps(options), result => result.buildPromise);

Promise.all(buildPromises).then((results) => {
  const webpackAssets = _.reduce(results,
    (collection, result) => _.merge(collection, result.webpackAssets),
  {});
  posts.buildPosts(options, webpackAssets);
  console.log('Finished building posts');
});
