const _    = require('lodash');

// -----------------------------------------------------------------------------
// Changes webpack paths as needed.
// -----------------------------------------------------------------------------
function apply(html, webpackAssets, buildSuffix) {
  let result = html;
  if (!webpackAssets) {
    throw new Error('Invalid webpack assets. Unable to build production.');
  }
  _.each(webpackAssets, (assets, name) => {
    _.each(assets, (hashedName, ext) => {
      if (ext === 'js') {
        result = result.replace(`${name}${buildSuffix}`, hashedName);
      } else {
        result = result.replace(`${name}.${ext}`, hashedName);
      }
    });
  });
  return result;
}

module.exports = {
  apply
};
