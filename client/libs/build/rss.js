const log = require('./log');
const _  = require('lodash');
const templates = require('./templates');
const moment = require('moment');

// -----------------------------------------------------------------------------
// Build rss output
// -----------------------------------------------------------------------------
function apply(data, fullPath, templateDirs) {

  const template = templates.loadTemplate('partials/_rss.xml', templateDirs);
  let rss = '';

  try {
    rss = template(_.merge({
      _,
      moment
    }, data));
  } catch (err) {
    log.out(err);
    log.out(`Unable to build rss for file: ${fullPath} Data: ${data}`);
    log.out('Stack Trace:');
    log.out(err.trace);
  }

  return rss;
}

module.exports = {
  apply
};
