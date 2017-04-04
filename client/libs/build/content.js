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
function buildContent(fullPath, templateDirs, webpackAssets, stage, buildSuffix, ext, htmlOptions) {
  const content     = fs.readFileSync(fullPath, 'utf8');
  const parsed      = frontMatter(content);
  const metadata    = parsed.attributes;
  const pathResult  = utils.filename2date(fullPath);
  const date        = moment(new Date(pathResult.date || fs.statSync(fullPath).ctime));
  const title       = metadata.title || pathResult.title;
  const destination = metadata.permalink || pathResult.url || '/';

  const data = _.merge({
    _,
    date,
    title,
    moment,
    metadata,
    url: path.join(options.templateData.site.domain, destination)
  }, htmlOptions.templateData);

  let html = parsed.body;

  try {
    // Allow ejs code in content
    html = ejs.compile(html, {
      cache    : false,
      filename : fullPath
    })(data);

    // Parse any markdown in the resulting html
    if (_.includes(htmlOptions.markdownExtensions, ext)) {
      html = marked(html);
    }
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
  html = templates.apply(data, fullPath, htmlOptions.templateMap, templateDirs);
  html = applyProduction(html, stage, webpackAssets, buildSuffix);

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
function buildContents(
  originalInputPath,
  inputPath,
  outputPath,
  webpackAssets,
  stage,
  buildSuffix,
  templateDirs,
  htmlOptions) {

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
          htmlOptions
        ));
      } else {

        const ext = path.extname(fullInputPath);
        if (_.includes(htmlOptions.buildExtensions, ext)) {
          const page = buildContent(
            fullInputPath,
            templateDirs,
            webpackAssets,
            stage,
            buildSuffix,
            ext,
            htmlOptions);
          page.outputFilePath = file.write(
            outFilePath(page, outputPath, fullInputPath, originalInputPath), page.html, htmlOptions);
          results.push(page);
        } else {
          file.copy(fullInputPath, outFilePath(null, outputPath, fullInputPath, originalInputPath));
        }
      }
    }
  });
  return results;
}

// -----------------------------------------------------------------------------
// Build pages based on tags
// @param {array} results, this is all of the blog posts, with all of their stuff
// @param {object} options, info being passed between functions. Declared at top of file
// -----------------------------------------------------------------------------
function buildTagPages(pages, stage, outputPath, webpackConfig, webpackStats, options){

  const tagsTemplate = templates.loadTemplate('partials/_tag.html', options.templateDirs);

  const tags = _.reduce(pages, (tags, page) => {
    _.each(page.metadata.tags, (tag) => {
      (tags[tag] || (tags[tag] = [])).push(page);
    });
    return tags;
  }, {});

  const site = options.templateData.site;

  _.each(tags, (posts, tag) => {
    const data = {
      site       : options.templateData.site,
      metadata   : { },
      title      : tag,
      currentTag : tag,
      cleanTag   : utils.cleanTag,
      url        : path.join(site.domain, site.tagsPath),
      posts,
      _
    };

    // Build the tag content
    data.content = tagsTemplate(data);

    // Apply template
    const fileName = `${utils.cleanTag(tag)}.html`;
    let html = templates.apply(data, fileName, options.templateMap, options.templateDirs);
    html = applyProduction(html, stage, webpackConfig, webpackStats, options);
    file.write('', path.join(outputPath, site.tagsPath), fileName, html, options);
  });
}

// -----------------------------------------------------------------------------
// Build blog archive pages
// -----------------------------------------------------------------------------
function buildPostPages(pages, stage, outputPath, webpackConfig, webpackStats, options) {
  const archiveTemplate = templates.loadTemplate('partials/_posts.html', options.templateDirs);
  const perPage = options.templateData.site.paginate;
  const max = _.floor(pages.length / perPage);
  _(pages)
  .filter(page => // Only build archive pages for posts
    _.includes(page.source, options.templateData.site.postsSource)
  )
  .chunk(perPage)
  .each((posts, index) => {
    const prevPage = ( index > 1 ? index - 1 : 'index') + '.html';
    const nextPage = index < max ? index + 1 + '.html' : '#';
    const fileName = ( index === 0 ? 'index' : index) + '.html';

    let title;
    if (_.isString(options.recentPostsTitle)) {
      title = options.recentPostsTitle;
    } else {
      title = index === 0 ? 'Recent Posts' : '';
    }

    const data = {
      site       : options.templateData.site,
      metadata   : { },
      cleanTag   : utils.cleanTag,
      url        : options.templateData.site.domain,
      posts,
      title,
      _,
      prevPage,
      nextPage
    };

    // Build the content
    data.content = archiveTemplate(data);

    // Apply template
    let html = templates.apply(data, fileName, options.templateMap, options.templateDirs);
    html = applyProduction(html, stage, webpackConfig, webpackStats, options);
    file.write('', outputPath, fileName, html, options);
  });
}

module.exports = {
  buildContent,
  buildContents,
  outFilePath,
  buildTagPages,
  buildPostPages
};
