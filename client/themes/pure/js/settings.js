var path     = require('path');
var rootPath = path.join(__dirname, '../');

module.exports = {

  entries: {
    application: rootPath + 'js/application.js'
  },

  cssEntries: {
    blogOldIe: rootPath + 'styles/blog-old-ie.scss',
    blog: rootPath + 'styles/blog.scss'
  }

};