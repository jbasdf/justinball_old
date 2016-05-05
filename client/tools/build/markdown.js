var marked    = require("marked");
var highlight = require("highlight.js");

var markedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, language){
    if(language){
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlight.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlight.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    } else {
      return require('highlight.js').highlightAuto(code).value;
    }
  }
};
marked.setOptions(markedOptions);

module.exports = marked;
