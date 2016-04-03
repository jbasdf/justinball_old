var path     = require('path');
var rootPath = path.join(__dirname, './');

module.exports = {

  entries: {
    application: './application.js'
  },

  cssEntries: {
    blogOldIe: rootPath + 'blog-old-ie.scss',
    blog: rootPath + 'blog.scss'
  }

};