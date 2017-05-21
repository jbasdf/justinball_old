const argv = require('minimist')(process.argv.slice(2));
const site = require('./libs/build/site');

const stage = argv.release ? 'production' : 'development';
const port = parseInt(process.env.ASSETS_PORT, 10) || 8080;
const options = { port, stage, onlyPack: argv.onlyPack, noClean: argv.noClean };

site.buildSite(options);
