const _ = require('lodash');
const path = require('path');
const build = require('./build');
const settings = require('../../config/settings');
const templates = require('./templates');
const applyProduction = require('./production');
const file = require('./file');
const utils = require('./utils');

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
    let html = templates.apply(data, fileName, postsApp.templateMap, postsApp.templateDirs);
    html = applyProduction(html, postsApp.stage, webpackAssets, postsApp.buildSuffix);
    file.write(path.join(postsApp.outputPath, site.tagsPath, fileName), html);
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
    html = applyProduction(html, postsApp.stage, webpackAssets, postsApp.buildSuffix);
    file.write(path.join(postsApp.outputPath, fileName), html);
  });
}

function buildPosts(options, webpackAssets) {
  const postsApp = settings.postsApp(options);
  const pages = build.buildHtml(postsApp, webpackAssets).sort((a, b) => {
    // Sort pages by date
    if (a.date.unix() > b.date.unix()) return -1;
    if (a.date.unix() < b.date.unix()) return 1;
    return 0;
  });

  buildArchive(pages, postsApp, webpackAssets);
  buildTagPages(pages, postsApp, webpackAssets);
}

module.exports = {
  buildPosts
};
