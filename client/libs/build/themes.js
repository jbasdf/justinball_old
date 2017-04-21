const _ = require('lodash');
const fs = require('fs-extra');

const apps = require('./apps');
const settings = require('../../config/settings');

// -----------------------------------------------------------------------------
// Build all themes
// -----------------------------------------------------------------------------
function buildThemes(options) {

  return _.map(settings.themes(options), (app) => {
    fs.emptyDirSync(app.outputPath);
    return {
      app,
      buildPromise: apps.buildAppParts(app, options.onlyPack)
    };
  });
}

module.exports = {
  buildThemes
};
