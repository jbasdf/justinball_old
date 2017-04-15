const _ = require('lodash');

const settings = require('../../config/settings');
const build = require('./build');

// -----------------------------------------------------------------------------
// Build all themes
// -----------------------------------------------------------------------------
function buildThemes(options) {
  return _.map(settings.themes(options), (theme) => {

    const buildPromise = build.buildWebpackEntries(theme);
    buildPromise.then(() => {
      console.log(`Finished Javascript for ${theme.name}`);
    });

    return {
      theme,
      buildPromise
    };
  });
}

module.exports = {
  buildThemes
};
