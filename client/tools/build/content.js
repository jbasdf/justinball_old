const path          = require('path');
const _             = require('lodash');
const fs            = require('fs');
const frontMatter   = require('front-matter');
const truncate      = require('html-truncate');
const moment        = require('moment');
const ejs           = require('ejs');

const marked          = require('./markdown');
const templates       = require('./templates');
const applyProduction = require('./production');
const file            = require('./file');
const utils           = require('./utils');

const ignoreFiles     = ['.DS_Store'];

// -----------------------------------------------------------------------------
// build a single file
// -----------------------------------------------------------------------------
function buildContent(fullPath, webpackConfig, webpackStats, stage, options) {
  const content     = fs.readFileSync(fullPath, 'utf8');
  const parsed      = frontMatter(content);
  const metadata    = parsed.attributes;
  const pathResult  = utils.filename2date(fullPath);
  const date        = moment(new Date(pathResult.date || fs.statSync(fullPath).ctime));
  const title       = metadata.title || pathResult.title;
  const destination = metadata.permalink || pathResult.url || '/';
  const data        = _.merge({
    _,
    date,
    title,
    moment,
    metadata,
    url      : path.join(options.templateData.site.domain, destination)
  }, options.templateData);

  let html = parsed.body;

  // Parse any markdown in the resulting html
  html = marked(html);

  try {
    // Allow ejs code in content
    html = ejs.compile(html, {
      cache    : false,
      filename : fullPath
    })(data);
  } catch (err) {
    console.log(`Unable to compile html from ${fullPath}`);
    console.log(err);
    console.log('Call stack');
    console.log(err.stack);
  }

  // Generate summary of content
  const summary  = _.includes(html, options.summaryMarker) ?
    html.split(options.summaryMarker)[0] :
    truncate(html, options.truncateSummaryAt, { keepImageTag: true });

  // Apply template
  data.content = html; // Pass in generated html
  html = templates.apply(data, fullPath, options.templateMap, options.templateDirs);
  html = applyProduction(html, stage, webpackConfig, webpackStats, options);

  return {
    title,
    date,
    metadata,
    summary,
    destination,
    html,
    source : fullPath,
    url    : destination
  };

}

// -----------------------------------------------------------------------------
// build html and markdown files in a given directory
// -----------------------------------------------------------------------------
function buildContents(inputPath, outputPath, webpackConfig, webpackStats, stage, options) {
  let results = [];
  const files = fs.readdirSync(inputPath);
  files.forEach((fileName) => {
    const fullInputPath = path.join(inputPath, fileName);
    const doOutput = options.templateDirs.indexOf(fullInputPath) < 0 && // Ignore template dirs
                  !_.includes(ignoreFiles, fileName);
    if (doOutput) {
      if (fs.statSync(fullInputPath).isDirectory()) {
        results = _.concat(results, buildContents(
          fullInputPath,
          outputPath,
          webpackConfig,
          webpackStats,
          stage,
          options
        ));
      } else {
        const ext = path.extname(fullInputPath);
        if (_.includes(options.buildExtensions, ext)) {
          const page = buildContent(fullInputPath, webpackConfig, webpackStats, stage, options);
          let outFile = fileName;
          let outPath = outputPath;
          let inPath = inputPath;
          if (page.destination && page.destination.length > 0) {
            if (_.endsWith(page.destination, '/')) {
              outPath = path.join(outPath, page.destination);
              outFile = 'index.html';
            } else {
              outFile = page.destination;
            }
            inPath = '';
          }
          page.outputFilePath = file.write(inPath, outPath, outFile, page.html, options);
          results.push(page);
        } else {
          file.copy(inputPath, outputPath, fileName, options);
        }
      }
    }
  });
  return results;
}

module.exports = {
  buildContent,
  buildContents
};
