const moment        = require('moment');
const _             = require('lodash');

// *****************************************************************************
// Generate files for paging through all posts
// *****************************************************************************
module.exports = function(posts, postsPerPage) {

  if (posts.length === 0) {
    const msg = 'No posts yet. Start posting by adding markdown files to the /content directory';
    posts = [{
      content: msg,
      summary: msg,
      layout: 'post',
      date: moment()
    }];
  }

  const c     = 0;
  const page  = 0;
  const posts = [];
  const home  = 'index';
  const basename = 'page';

  function addPage(prevPage, nextPage){

    const data = {
      site,
      posts,
      prevPage,
      nextPage,
      _
    };

    const file = new util.File({
      path:  (page == 0 ? home : basename + page) + '.html',
      contents: new Buffer(archiveTemplate(data), 'utf8')
    });

    file.metadata = data;
    stream.write(file);
  }

  _.each(posts, function(post){
    posts.push(post);
    c++;
    if (c == postsPerPage){
      var prevPage = page != 0 ? ((page-1) == 0 ? home : basename + page-1) + '.html' : null;
      var nextPage = (page+1) * postsPerPage < posts.length ? basename + (page+1) + '.html' : null;
      addPage(prevPage, nextPage);
      c = 0;
      posts = [];
      page++;
    }
  });

  if (posts.length != 0) {
    var prevPage = page != 0 ? basename + ((page-1) == 0 ? home : basename + page) + '.html' : null;
    addPage(prevPage, null);
  }

}
