const path          = require('path');
const _             = require('lodash');
const fs            = require('fs-extra');
const webpack       = require('webpack');
const nodeWatch     = require('node-watch');
const moment        = require('moment');

const file            = require('./file');
const content         = require('./content');
const templates       = require('./templates');
const utils           = require('./utils');
const applyProduction = require('./production');
const site            = require('../../site.json');

// Settings
const webpackConfigBuilder = require('../../config/webpack.config');
const settings             = require('../../config/settings');
const argv                 = require('minimist')(process.argv.slice(2));

const release              = argv.release;
const stage                = release ? 'production' : 'development';

const inputPath            = path.join(__dirname, '../../../content');
const outputPath           = stage === 'production' ? settings.prodOutput : settings.devOutput;

const themePath            = path.join(__dirname, '../../themes');
const templateDirs = [
  path.join(themePath, site.theme),
  path.join(themePath, 'default')
];

const options              = {
  truncateSummaryAt : 1000,
  buildExtensions   : ['.html', '.htm', '.md', '.markdown'], // file types to build (others will just be copied)
  rootInputPath:   inputPath,            // Original input path
  entries:         settings.entries,     // Webpack entry points
  cssEntries:      settings.cssEntries,  // Webpack css entry points
  buildSuffix:     settings.buildSuffix, // Webpack build suffix. ie _bundle.js
  templateData: {                        // Object passed to every page as it is rendered
    site,
    time: new Date()
  },
  templateMap: {                   // Used to specify specific templates on a per file basis
    'index.html': 'home'
  },
  templateDirs,                    // Directories to look in for template
  summaryMarker:   '<!--more-->',
  recentPostsTitle: ''
};

// -----------------------------------------------------------------------------
// run webpack to build entry points
// -----------------------------------------------------------------------------
function buildWebpackEntries(isHot) {
  return new Promise((resolve, reject) => {
    const webpackConfig = webpackConfigBuilder(stage);
    if (!isHot) {
      const bundler = webpack(webpackConfig);
      const bundle = (err, stats) => {
        if (err) {
          console.log('webpack error', err);
          reject(err);
        }
        // console.log('webpack', stats.toString({ colors: true }));
        resolve({
          webpackConfig,
          webpackStats: stats.toJson()
        });
      };
      bundler.run(bundle);
    } else {
      resolve(webpackConfig, null);
    }
  });
}


/** -----------------------------------------------------------------------------
 * Build pages based on tags
 * @param {array} results, this is all of the blog posts, with all of their stuff
 * @param {object} options, info being passed between functions. Declared at top of file
 *  -----------------------------------------------------------------------------
 */
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
      url        : site.domain,
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

// -----------------------------------------------------------------------------
// main build
// -----------------------------------------------------------------------------
function build(isHot) {
  return new Promise((resolve, reject) => {
    const start = moment();

    // Delete everything in the output path
    fs.emptydir(outputPath, () => {

      // Copy static files to build directory
      try {
        // const stats = fs.statSync(settings.staticDir);
        console.log(`Copying static files in ${settings.staticDir}`);
        fs.copySync(settings.staticDir, outputPath);
      } catch (err) {
        // No static dir. Do nothing
      }

      // Build files
      console.log(`Building files in: ${inputPath}`);
      buildWebpackEntries(isHot).then((packResults) => {

        // Sort pages by date
        function compare(a, b) {
          if (a.date.unix() > b.date.unix()) return -1;
          if (a.date.unix() < b.date.unix()) return 1;
          return 0;
        }

        const pages = content.buildContents(
          inputPath,
          outputPath,
          packResults.webpackConfig,
          packResults.webpackStats,
          stage,
          options
        ).sort(compare);

        buildPostPages(
          pages,
          stage,
          outputPath,
          packResults.webpackConfig,
          packResults.webpackStats,
          options
        );

        buildTagPages(
          pages,
          stage,
          outputPath,
          packResults.webpackConfig,
          packResults.webpackStats,
          options
        );

        const duration = moment() - start;
        console.log(`Done building files in: ${duration / 1000} seconds`);

        resolve({
          pages,
          inputPath,
          outputPath,
          webpackConfig : packResults.webpackConfig,
          webpackStats  : packResults.webpackStats,
          stage,
          options
        });
      });
    });
  });
}

// -----------------------------------------------------------------------------
// watch
// -----------------------------------------------------------------------------
function watch() {
  return new Promise((resolve) => {
    build(true).then((buildResults) => {

      // Watch content
      nodeWatch(buildResults.inputPath, (filePath) => {
        // Build the page
        const page = content.buildContent(
          filePath,
          buildResults.webpackConfig,
          buildResults.webpackStats,
          buildResults.stage,
          buildResults.options
        );
        page.outputFilePath = file.write(
          buildResults.inputPath,
          buildResults.outputPath,
          path.basename(filePath),
          page.html,
          buildResults.options
        );
      });

      // Watch themes
      nodeWatch(themePath, (filePath) => {

        // Template has changed. Rebuild the site
        build(true);
      });
      resolve();
    });
  });
}

module.exports = {
  watch,
  build,
  buildWebpackEntries
};
