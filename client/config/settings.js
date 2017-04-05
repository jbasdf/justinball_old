const fs = require('fs-extra');
const path = require('path');

const deployConfig = require('../../.s3-website.json');

const devRelativeOutput  = '/';
const prodRelativeOutput = '/';

const devOutput  = path.join(__dirname, '../../build/dev', devRelativeOutput);
const prodOutput = path.join(__dirname, '../../build/prod', prodRelativeOutput);

// const prodAssetsUrl = ''; // Set this to the url where the assets will be deployed.
                          // If you want the paths to be relative to the deploy then leave this
                          // value as an empty string. This value could also be a CDN or
                          // it could be the ssl version of your S3 bucket ie:
                          // https://s3.amazonaws.com/' + deployConfig.domain;

const prodAssetsUrl = `https://s3.amazonaws.com/${deployConfig.domain}`;

// There is a warning if the .env file is missing
// This is fine in a production setting, where settings
// are loaded from the env and not from a file
require('dotenv').load({ path: path.join(__dirname, '../../.env') });

const theme = process.env.THEME || 'stripy';
const site = {
  title: "Speak Easy",
  subtitle: "What's on your mind?",
  author: "Blog Author",
  domain: "www.speakeasy.com",
  author: "Speak Easy Team",
  email: "speakeasy@example.com",
  google_analytics_account: "UA-73651-1",
  github_username: "speakeasy",
  twitter_username: "speakeasy",
  disqus_id: "speakeasy",
  postsSource: "/content/posts/",
  tagsPath: "tags",
  theme
};

const hotPort = process.env.ASSETS_PORT || 8080;
const themePath = path.join(__dirname, '../themes');
const templateDirs = [
  path.join(themePath, site.theme),
  path.join(themePath, 'default')
];

// Get a list of all directories in the apps directory.
// These will be used to generate the entries for webpack
const appsDir = path.join(__dirname, '../apps/');

const names = fs.readdirSync(appsDir)
  .filter(file => fs.statSync(path.join(appsDir, file)).isDirectory());

const entryFile = 'app.jsx';
const apps = names.reduce(
  (result, file) => Object.assign({}, result, {
    [file] : {
      path: path.join(appsDir, file),
      file: entryFile,
    }
  })
, {});

module.exports = {
  apps,

  devRelativeOutput,
  prodRelativeOutput,

  devOutput,
  prodOutput,

  // Dev urls
  devAssetsUrl: process.env.ASSETS_URL,
  prodAssetsUrl,

  hotPort,

  buildSuffix: '_bundle.js',

  // Options for building html files
  htmlOptions: {
    truncateSummaryAt:  1000,
    buildExtensions:    ['.html', '.htm', '.md', '.markdown'], // file types to build (others will just be copied)
    markdownExtensions: ['.md', '.markdown'], // file types to process markdown
    templateDirs, // Directories to look in for template
    templateData: { // Object passed to every page as it is rendered
      site,
      time: new Date()
    },
    templateMap: { // Used to specify specific templates on a per file basis
      'index.html': 'home'
    },
    summaryMarker:   '<!--more-->',
    recentPostsTitle: '',
    paginate: 10,
    theme,
    themePath,
    build: Date.now()
  }

};
