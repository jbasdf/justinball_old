var info      = require('../package.json');
var path      = require('path');
var _         = require('lodash');

var clientAppPath = path.join(__dirname, '../');

var devRelativeOutput     = '/';
var prodRelativeOutput    = '/';

var devOutput     = path.join(__dirname, '../../build/dev', devRelativeOutput);
var prodOutput    = path.join(__dirname, '../../build/prod', prodRelativeOutput);

// There is a warning if the .env file is missing
// This is fine in a production setting, where settings
// are loaded from the env and not from a file
require('dotenv').load({path: path.join(__dirname, '../../.env')});

var hotPort = process.env.ASSETS_PORT || 8080;
var theme = process.env.THEME || 'default';
var themeSettings = require('../themes/' + theme + '/settings.js');

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
  devAssetsUrl: process.env.ASSETS_URL || 'http://localhost:' + hotPort,

  hotPort: hotPort,

  buildSuffix: '_bundle.js',

  theme: theme,

  entries: {
    app: clientAppPath + 'js/app.jsx',
    reveal: clientAppPath + 'js/reveal.js'
  },

  cssEntries: {
    styles: clientAppPath + theme + '/styles.js'
  }

};

module.exports = _.merge(settings, themeSettings);
