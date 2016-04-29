// *****************************************************************************
// Generate files for paging through all posts
// *****************************************************************************
module.exports = function(posts, postsPerPage) {

  if(posts.length == 0){
    var msg = "No posts yet. Start posting by adding markdown files to the /content directory";
    posts = [{
      content: msg,
      summary: msg,
      layout: "post",
      date: moment()
    }];
  }

  var c     = 0;
  var page  = 0;
  var posts = [];
  var home  = 'index';
  var basename = 'page';

  function addPage(prevPage, nextPage){

    var data = {
      site: site,
      posts: posts,
      prevPage: prevPage,
      nextPage: nextPage,
      "_": _
    };

    var file = new util.File({
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