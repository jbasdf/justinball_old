var info         = require('../../package.json');
var deployConfig = require('../../.s3-website.json');
var path         = require('path');

var clientAppPath = path.join(__dirname, '../');

var devRelativeOutput     = '/';
var prodRelativeOutput    = '/';

var devOutput     = path.join(__dirname, '../../build/dev', devRelativeOutput);
var prodOutput    = path.join(__dirname, '../../build/prod', prodRelativeOutput);

//const prodAssetsUrl = ''; // Set this to the url where the assets will be deployed.
                          // If you want the paths to be relative to the deploy then leave this
                          // value as an empty string. This value could also be a CDN or
                          // it could be the ssl version of your S3 bucket ie:
                          // https://s3.amazonaws.com/' + deployConfig.domain;

const prodAssetsUrl = 'https://s3.amazonaws.com/' + deployConfig.domain;

// There is a warning if the .env file is missing
// This is fine in a production setting, where settings
// are loaded from the env and not from a file
require('dotenv').load({path: path.join(__dirname, '../../.env')});

var hotPort = process.env.ASSETS_PORT || 8080;
var theme = process.env.THEME || 'stripy';
var themeSettings = require('../themes/' + theme + '/js/settings.js');

var settings = {
  title: info.title,
  author: info.author,
  version: info.versions,
  build: Date.now(),

  devRelativeOutput: devRelativeOutput,
  prodRelativeOutput: prodRelativeOutput,

  devOutput: devOutput,
  prodOutput: prodOutput,

  // Dev urls
  devAssetsUrl: process.env.ASSETS_URL || '',
  prodAssetsUrl: prodAssetsUrl,

  hotPort: hotPort,

  buildSuffix: '_bundle.js',

  theme: theme,

  staticDir: clientAppPath + 'static',

  entries: {
    app: clientAppPath + 'js/app.jsx'
  }

};

module.exports = _.merge(settings, themeSettings);
