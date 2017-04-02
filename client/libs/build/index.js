const path = require('path');
const fs = require('fs-extra');
const _  = require('lodash');
const webpack = require('webpack');
const nodeWatch = require('node-watch');
const moment = require('moment');

const file = require('./file');
const content = require('./content');
const templates = require('./templates');
const utils = require('./utils');
const applyProduction = require('./production');
const site = require('../../../site.json');

const themePath = path.join(__dirname, '../../../themes');
const templateDirs = [
  path.join(themePath, site.theme),
  path.join(themePath, 'default')
];

// Settings
const webpackConfigBuilder = require('../../config/webpack.config');

// -----------------------------------------------------------------------------
// run webpack to build entries
// -----------------------------------------------------------------------------
function buildWebpackEntries(webpackOptions) {
  return new Promise((resolve, reject) => {
    const webpackConfig = webpackConfigBuilder(webpackOptions);
    if (webpackOptions.stage !== 'hot') {
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
      resolve({
        webpackConfig,
        webpackStats: null
      });
    }
  });
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
// copy over static files to build directory
// -----------------------------------------------------------------------------
function buildStatic(rootBuildPath, appPath) {
  try {
    const staticDir = `${appPath}/static`;
    console.log(`Copying static files in ${staticDir}`);
    fs.copySync(staticDir, rootBuildPath);
  } catch (err) {
    // No static dir. Do nothing
  }
}

// -----------------------------------------------------------------------------
// main build
// -----------------------------------------------------------------------------
function build(rootBuildPath, webpackOptions, htmlOptions) {

  return new Promise((resolve) => {

    // Copy static files to build directory
    buildStatic(rootBuildPath, webpackOptions.appPath);

    // Webpack build
    console.log(`Webpacking ${webpackOptions.appName}`);

    buildWebpackEntries(webpackOptions).then((packResults) => {
      let webpackAssets = null;
      const webpackAssetsFilePath = `${packResults.webpackConfig.output.path}/${webpackOptions.appName}-webpack-assets.json`;
      if (fs.existsSync(webpackAssetsFilePath)) {
        webpackAssets = fs.readJsonSync(webpackAssetsFilePath);
      }

      // Build html
      console.log(`Building html for ${webpackOptions.appName}`);
      const inputPath = path.join(webpackOptions.appPath, 'html');
      const templateDirs = _.map(htmlOptions.templateDirs,
        templateDir => path.join(inputPath, templateDir)
      );

      const pages = content.buildContents(
        inputPath,
        inputPath,
        path.join(rootBuildPath, webpackOptions.appName),
        webpackAssets,
        webpackOptions.stage,
        webpackOptions.buildSuffix,
        templateDirs,
        htmlOptions
      ).sort((a, b) => {
        // Sort pages by date
        if (a.date.unix() > b.date.unix()) return -1;
        if (a.date.unix() < b.date.unix()) return 1;
        return 0;
      });

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
        webpackConfig : packResults.webpackConfig,
        webpackAssets,
        pages,
      });
    });

  });
}

// -----------------------------------------------------------------------------
// watch
// -----------------------------------------------------------------------------
function appWatch(rootBuildPath, webpackOptions, htmlOptions, buildResults) {

  // Watch for content to change
  nodeWatch(webpackOptions.appPath, { recursive: true }, (evt, filePath) => {

    const templateDirs = _.map(htmlOptions.templateDirs,
      templateDir => path.join(webpackOptions.appPath, 'html', templateDir)
    );

    const outputPath = path.join(rootBuildPath, webpackOptions.appName);
    const originalInputPath = path.join(webpackOptions.appPath, 'html');

    // Build the page
    const page = content.buildContent(
      filePath,
      templateDirs,
      buildResults.webpackAssets,
      webpackOptions.stage,
      htmlOptions
    );

    page.outputFilePath = file.write(
      content.outFilePath(page, outputPath, filePath, originalInputPath),
      page.html
    );

  });

  // Watch themes
  nodeWatch(themePath, (filePath) => {
    // Template has changed. Rebuild the site
    build(true);
  });

}

function watch(rootBuildPath, webpackOptions, htmlOptions) {
  return new Promise((resolve) => {
    build(rootBuildPath, webpackOptions, htmlOptions).then((buildResults) => {
      appWatch(rootBuildPath, webpackOptions, htmlOptions, buildResults);
      resolve();
    });
  });
}

module.exports = {
  watch,
  build,
  buildWebpackEntries
};
