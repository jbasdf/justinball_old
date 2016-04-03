var rootPath = path.join(__dirname, '../../');

module.exports = {

  entries: {
    application: './application.js',
    reveal: rootPath + 'js/reveal.js'
  },

  cssEntries: {
    styles: rootPath + 'styles/styles.js',
    blogOldIe: rootPath + 'styles/blog-old-ie.scss',
    blog: rootPath + 'styles/blog.scss'
  }

};