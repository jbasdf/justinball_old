var path     = require('path');
var rootPath = path.join(__dirname, '../');

module.exports = {

  entries: {
    application: rootPath + 'js/application.js',
    reveal: rootPath + 'js/reveal.js'
  },

  cssEntries: {
    blog: rootPath + 'styles/blog.scss',
    reveal: rootPath + 'styles/reveal.scss'
  }

};