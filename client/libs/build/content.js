const path          = require('path');
const _             = require('lodash');
const fs            = require('fs');
const frontMatter   = require('front-matter');
const ejs           = require('ejs');

const marked          = require('./markdown');
const templates       = require('./templates');
const applyProduction = require('./production');
const file            = require('./file');

const ignoreFiles     = ['.DS_Store'];

// -----------------------------------------------------------------------------
// Generate the output file name and path
// -----------------------------------------------------------------------------
function outFilePath(page, outputPath, fullInputPath, originalInputPath) {
  let out = path.join(outputPath, fullInputPath.replace(originalInputPath, ''));
  if (page && page.destination && page.destination.length > 0) {
    if (_.endsWith(page.destination, '/')) {
      out = path.join(outputPath, page.destination, 'index.html');
    } else {
      out = page.destination;
    }
  }
  return out;
}

// -----------------------------------------------------------------------------
// build a single file
// -----------------------------------------------------------------------------
function buildContent(fullPath, templateDirs, webpackAssets, stage, buildSuffix, ext, options) {
  const content     = fs.readFileSync(fullPath, 'utf8');
  const parsed      = frontMatter(content);
  const metadata    = parsed.attributes;
  const title       = metadata.title;
  const destination = metadata.permalink;
  const data        = _.merge({
    _,
    title,
    metadata,
    url: destination
  }, options.templateData);

  let html = parsed.body;

  try {
    // Allow ejs code in content
    html = ejs.compile(html, {
      cache    : false,
      filename : fullPath
    })(data);

    // Parse any markdown in the resulting html
    if (_.includes(options.markdownExtensions, ext)) {
      html = marked(html);
    }
  } catch (err) {
    console.log(`Unable to compile html from ${fullPath}`);
    console.log(err);
    console.log('Call stack');
    console.log(err.stack);
  }

  // Apply template
  data.content = html; // Pass in generated html
  html = templates.apply(data, fullPath, options.templateMap, templateDirs);
  html = applyProduction(html, stage, webpackAssets, buildSuffix);

  return {
    title,
    metadata,
    destination,
    html,
    source : fullPath,
    url    : destination
  };

}

// -----------------------------------------------------------------------------
// build html and markdown files in a given directory
// -----------------------------------------------------------------------------
function buildContents(
  originalInputPath,
  inputPath,
  outputPath,
  webpackAssets,
  stage,
  buildSuffix,
  templateDirs,
  options) {

  let results = [];
  const files = fs.readdirSync(inputPath);

  files.forEach((fileName) => {
    const fullInputPath = path.join(inputPath, fileName);
    const doOutput = templateDirs.indexOf(fullInputPath) < 0 && // Ignore template dirs
                  !_.includes(ignoreFiles, fileName);
    if (doOutput) {
      if (fs.statSync(fullInputPath).isDirectory()) {
        results = _.concat(results, buildContents(
          originalInputPath,
          fullInputPath,
          outputPath,
          webpackAssets,
          stage,
          buildSuffix,
          templateDirs,
          options
        ));
      } else {

        const ext = path.extname(fullInputPath);
        if (_.includes(options.buildExtensions, ext)) {
          const page = buildContent(
            fullInputPath,
            templateDirs,
            webpackAssets,
            stage,
            buildSuffix,
            ext,
            options);
          page.outputFilePath = file.write(
            outFilePath(page, outputPath, fullInputPath, originalInputPath), page.html, options);
          results.push(page);
        } else {
          file.copy(fullInputPath, outFilePath(null, outputPath, fullInputPath, originalInputPath));
        }
      }
    }
  });
  return results;
}

module.exports = {
  buildContent,
  buildContents,
  outFilePath
};
