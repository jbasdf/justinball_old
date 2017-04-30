const _ = require('lodash');
const path = require('path');
const nodeWatch = require('node-watch');

const settings = require('../../config/settings');
const templates = require('./templates');
const applyHtmlPaths = require('./html_paths');
const file = require('./file');
const utils = require('./utils');
const content = require('./content');
const log = require('./log');

// -----------------------------------------------------------------------------
// Build pages based on tags
// -----------------------------------------------------------------------------
function buildTagPages(pages, postsApp, webpackAssets) {

  const tagsTemplate = templates.loadTemplate('partials/_tag.html', postsApp.templateDirs);

  const tags = _.reduce(pages, (collect, page) => {
    _.each(page.metadata.tags, (tag) => {
      (collect[tag] || (collect[tag] = [])).push(page);
    });
    return collect;
  }, {});

  const site = postsApp.templateData.site;

  _.each(tags, (posts, tag) => {
    const data = {
      site       : postsApp.templateData.site,
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
    const fullFilePath = path.join(postsApp.outputPath, site.tagsPath, fileName);
    let html = templates.apply(data, fileName, postsApp.templateMap, postsApp.templateDirs);
    html = applyHtmlPaths(fullFilePath, html, postsApp.stage, webpackAssets, postsApp.buildSuffix);
    file.write(fullFilePath, html);
  });
}

// -----------------------------------------------------------------------------
// Build blog archive pages for paging through posts
// -----------------------------------------------------------------------------
function buildArchive(pages, postsApp, webpackAssets) {
  const archiveTemplate = templates.loadTemplate('partials/_posts.html', postsApp.templateDirs);
  const perPage = postsApp.htmlOptions.paginate;
  const max = _.floor(pages.length / perPage);
  _(pages)
  .chunk(perPage)
  .each((posts, index) => {
    const prevPage = `${(index > 1 ? index - 1 : 'index')}.html`;
    const nextPage = index < max ? `${index + 1}.html` : '#';
    const fileName = `${(index === 0 ? 'index' : index)}.html`;

    let title;
    if (_.isString(postsApp.htmlOptions.recentPostsTitle)) {
      title = postsApp.htmlOptions.recentPostsTitle;
    } else {
      title = index === 0 ? 'Recent Posts' : '';
    }

    const data = {
      site: postsApp.templateData.site,
      metadata: { },
      cleanTag: utils.cleanTag,
      url: postsApp.templateData.site.domain,
      posts,
      title,
      _,
      prevPage,
      nextPage
    };

    // Build the content
    data.content = archiveTemplate(data);

    // Apply template
    let html = templates.apply(
      data,
      fileName,
      postsApp.templateMap,
      postsApp.templateDirs);
    const fullFilePath = path.join(postsApp.outputPath, fileName);
    html = applyHtmlPaths(fullFilePath, html, postsApp.stage, webpackAssets, postsApp.buildSuffix);
    file.write(fullFilePath, html);
  });
}

// -----------------------------------------------------------------------------
// Used to rebuild html or templates if files change.
// -----------------------------------------------------------------------------
function watchHtml(webpackAssets, pages, app) {
  const watchedPages = pages;
  log.out(`Watching html files in ${app.htmlPath}`);
  nodeWatch(app.htmlPath, { recursive: true }, (evt, fullInputPath) => {
    log.out(`Change in html file ${fullInputPath}`);
    const newPage = content.writeContent(
      fullInputPath,
      webpackAssets,
      app);
    // Find the changed page and swap it out
    const changedIndex = _.findIndex(watchedPages, page => page.source === newPage.source);
    watchedPages[changedIndex] = newPage;
    buildArchive(watchedPages, app, webpackAssets);
    buildTagPages(watchedPages, app, webpackAssets);
  });
}

function buildPosts(options, webpackAssets) {
  const postsApp = settings.postsApp(options);

  const pages = content.buildContents(
    postsApp.htmlPath,
    postsApp,
    webpackAssets
  ).sort((a, b) => {
    // Sort pages by date
    if (a.date.unix() > b.date.unix()) return -1;
    if (a.date.unix() < b.date.unix()) return 1;
    return 0;
  });

  if (postsApp.stage === 'hot') {
    watchHtml(webpackAssets, pages, postsApp);
  }

  buildArchive(pages, postsApp, webpackAssets);
  buildTagPages(pages, postsApp, webpackAssets);

  return pages;
}

module.exports = {
  buildPosts
};
