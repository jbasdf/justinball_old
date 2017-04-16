const _ = require('lodash');
const fs = require('fs-extra');

const build = require('./build');
const settings = require('../../config/settings');

// -----------------------------------------------------------------------------
// Build all themes
// -----------------------------------------------------------------------------
function buildThemes(options) {
  return _.map(settings.themes(options), (app) => {
    fs.emptyDirSync(app.outputPath);

    const buildPromise = build.buildWebpackEntries(app);
    buildPromise.then(() => {
      console.log(`Finished Javascript for ${app.name}`);
    });

    return {
      app,
      buildPromise
    };
  });
}

module.exports = {
  buildThemes
};
