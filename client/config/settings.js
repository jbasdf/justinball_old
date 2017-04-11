const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const deployConfig = require('../../.s3-website.json');

const hotPort = parseInt(process.env.ASSETS_PORT, 10) || 8080;

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
const devAssetsUrl = process.env.ASSETS_URL;

// There is a warning if the .env file is missing
// This is fine in a production setting, where settings
// are loaded from the env and not from a file
require('dotenv').load({ path: path.join(__dirname, '../../.env') });

const theme = process.env.THEME || 'stripy';
const site = {
  title: 'Speak Easy',
  subtitle: "What's on your mind?",
  domain: 'www.speakeasy.com',
  author: 'Speak Easy Team',
  email: 'speakeasy@example.com',
  google_analytics_account: 'UA-73651-1',
  github_username: 'speakeasy',
  twitter_username: 'speakeasy',
  disqus_id: 'speakeasy',
  postsSource: '/content/posts/',
  tagsPath: 'tags',
  theme
};

const themePath = path.join(__dirname, '../themes');
const themeTemplateDirs = [
  path.join(themePath, site.theme),
  path.join(themePath, 'default')
];

// Get a list of all directories in the apps directory.
// These will be used to generate the entries for webpack
const appsDir = path.join(__dirname, '../apps/');

const buildSuffix = '_bundle.js';

const htmlOptions = { // Options for building html files
  truncateSummaryAt: 1000,
  buildExtensions: ['.html', '.htm', '.md', '.markdown'], // file types to build (others will just be copied)
  markdownExtensions: ['.md', '.markdown'], // file types to process markdown
  summaryMarker:   '<!--more-->',
  recentPostsTitle: '',
  paginate: 10,
  theme,
  build: Date.now()
};

// -----------------------------------------------------------------------------
// Helper function to generate full template paths for the given app
// -----------------------------------------------------------------------------
function templateDirs(app, dirs) {
  return _.map(dirs, templateDir => path.join(app.htmlPath, templateDir));
}

function appSettings(name, port, options) {

  const production = options.stage === 'production' || options.stage === 'staging';
  let rootOutputPath = devOutput;
  let outputPath = options.onlyPack ?
    devOutput : path.join(devOutput, name);
  // Public path indicates where the assets will be served from. In dev this will likely be
  // localhost or a local domain. In production this could be a CDN. In developerment this will
  // point to whatever public url is serving dev assets.
  let publicPath = `${devAssetsUrl}:${port}${devRelativeOutput}`;

  if (production) {
    rootOutputPath = prodOutput;
    outputPath = options.onlyPack ?
      prodOutput : path.join(prodOutput, name);
    publicPath = prodAssetsUrl + prodRelativeOutput;
  }

  const appPath = path.join(appsDir, name);
  const htmlPath = path.join(appPath, 'html');
  const staticPath = path.join(appPath, 'static');

  const app = {
    name,
    path: appPath,
    file: 'app.jsx',
    htmlPath,
    staticPath,
    templateData: {
      site,
      time: new Date()
    }, // Object that will be passed to every page as it is rendered
    templateMap: {
      'index.html': 'home'
    }, // Used to specify specific templates on a per file basis
    stage: options.stage,
    buildSuffix,
    port,
    production,
    outputPath,
    rootOutputPath,
    publicPath,
    htmlOptions,
  };

  app.templateDirs = _.union(templateDirs(app, ['layouts']), themeTemplateDirs);
  return {
    [name] : app
  };
}

const paths = {
  devRelativeOutput,
  prodRelativeOutput,
  devOutput,
  prodOutput,
  prodAssetsUrl,
  devAssetsUrl,
  appsDir,
};

function postsApp(options) {
  const contentPath = path.join(__dirname, '../../content');
  const htmlPath = path.join(contentPath, 'posts');
  const staticPath = path.join(contentPath, 'static');
  return {
    appName: 'posts',
    app: {
      path: path.join(__dirname, '../../content'),
      file: null,
      htmlPath,
      staticPath,
      templateDirs,
      templateData: { // Object passed to every page as it is rendered
        site,
        time: new Date()
      },
    }
  };
}

function apps(options) {
  let port = options.port;
  return fs.readdirSync(appsDir)
    .filter(file => fs.statSync(path.join(appsDir, file)).isDirectory())
    .reduce((result, appName) => {
      const app = appSettings(appName, port, options);
      port = options.appPerPort ? port + 1 : options.port;
      return _.merge(result, app);
    }, {});
}

module.exports = {
  paths,
  hotPort,
  apps,
  postsApp
};
