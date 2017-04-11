const moment = require('moment');
const _ = require('lodash');
const path = require('path');
const build = require('./build');
const settings = require('../../config/settings');
const templates = require('./templates');
const applyProduction = require('./production');
const file = require('./file');
const utils = require('./utils');

// *****************************************************************************
// Generate files for paging through all posts
// *****************************************************************************
// function buildPagingPages(posts, postsPerPage) {

//   if (posts.length === 0) {
//     const msg = 'No posts yet. Start posting by adding markdown files to the /content directory';
//     posts = [{
//       content: msg,
//       summary: msg,
//       layout: 'post',
//       date: moment()
//     }];
//   }

//   const c     = 0;
//   const page  = 0;
//   const home  = 'index';
//   const basename = 'page';

//   function addPage(prevPage, nextPage) {

//     const data = {
//       posts,
//       prevPage,
//       nextPage,
//       _
//     };

//     const file = new utils.File({
//       path: (page === 0 ? home : basename + page) + '.html',
//       contents: new Buffer(archiveTemplate(data), 'utf8')
//     });

//     file.metadata = data;
//     stream.write(file);
//   }

//   _.each(posts, (post) => {
//     posts.push(post);
//     c++;
//     if (c == postsPerPage){
//       var prevPage = page != 0 ? ((page-1) == 0 ? home : basename + page-1) + '.html' : null;
//       var nextPage = (page+1) * postsPerPage < posts.length ? basename + (page+1) + '.html' : null;
//       addPage(prevPage, nextPage);
//       c = 0;
//       posts = [];
//       page++;
//     }
//   });

//   if (posts.length != 0) {
//     var prevPage = page != 0 ? basename + ((page-1) == 0 ? home : basename + page) + '.html' : null;
//     addPage(prevPage, null);
//   }

// }

// -----------------------------------------------------------------------------
// Build pages based on tags
// @param {array} results, this is all of the blog posts, with all of their stuff
// @param {object} options, info being passed between functions. Declared at top of file
// -----------------------------------------------------------------------------
function buildTagPages(posts, postsApp) {

  const tagsTemplate = templates.loadTemplate('partials/_tag.html', postsApp.templateDirs);

  const tags = _.reduce(pages, (collect, page) => {
    _.each(page.metadata.tags, (tag) => {
      (collect[tag] || (collect[tag] = [])).push(page);
    });
    return collect;
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
function buildArchive(pages, postsApp, webpackAssets) {
  const archiveTemplate = templates.loadTemplate('partials/_posts.html', postsApp.app.templateDirs);
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
      site: postsApp.app.templateData.site,
      metadata: { },
      cleanTag: utils.cleanTag,
      url: postsApp.app.templateData.site.domain,
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
      postsApp.app.templateMap,
      postsApp.app.templateDirs);
    html = applyProduction(html, postsApp.stage, webpackAssets, postsApp.buildSuffix);
    file.write(path.join(postsApp.outputPath, fileName), html);
  });
}

function buildPosts(options, webpackAssets) {
  const postsApp = settings.postsApp(options);
  const posts = build.buildHtml(postsApp, webpackAssets).sort((a, b) => {
    // Sort pages by date
    if (a.date.unix() > b.date.unix()) return -1;
    if (a.date.unix() < b.date.unix()) return 1;
    return 0;
  });

  buildArchive(posts, postsApp, webpackAssets);
  // buildTagposts(pages, stage, outputPath, webpackConfig, webpackStats, htmlOptions);
}

module.exports = {
  buildPosts
};
