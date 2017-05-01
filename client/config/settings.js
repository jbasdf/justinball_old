const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

// There is a warning if the .env file is missing
// This is fine in a production setting, where settings
// are loaded from the env and not from a file
require('dotenv').load({ path: path.join(__dirname, '../../.env') });

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
const devAssetsUrl = `${process.env.ASSETS_URL}:${hotPort}`;

const theme = process.env.THEME || 'pure';
const site = {
  title: 'Nobody Listens Anyway',
  subtitle: 'Life is an optimization issue',
  domain: 'www.justinball.com',
  author: 'Justin Ball',
  email: 'justinball@example.com',
  postsSource: '/content/posts/',
  tagsPath: 'tags',
  paginate: 10,
  google_analytics_account: 'UA-73651-1',
  github_username: 'jbasdf',
  twitter_username: 'jbasdf',
  strava_profile: 'justin_ball',
  disqus_id: 'jbasdf',
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
const themesDir = path.join(__dirname, '../themes/');

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
// Main paths for the application. Includes production and development paths.
// -----------------------------------------------------------------------------
const paths = {
  devRelativeOutput,
  prodRelativeOutput,
  devOutput,
  prodOutput,
  prodAssetsUrl,
  devAssetsUrl,
  appsDir,
};

// -----------------------------------------------------------------------------
// Helper function to generate full template paths for the given app
// -----------------------------------------------------------------------------
function templateDirs(app, dirs) {
  return _.map(dirs, templateDir => path.join(app.htmlPath, templateDir));
}

// -----------------------------------------------------------------------------
// Helper to determine if we should do a production build or not
// -----------------------------------------------------------------------------
function isProduction(stage) {
  return stage === 'production' || stage === 'staging';
}

// -----------------------------------------------------------------------------
// Generates the main paths used for output
// -----------------------------------------------------------------------------
function outputPaths(name, port, options) {

  let rootOutputPath = devOutput;
  let outputPath = options.onlyPack ? devOutput : path.join(devOutput, name);
  // Public path indicates where the assets will be served from. In dev this will likely be
  // localhost or a local domain. In production this could be a CDN. In development this will
  // point to whatever public url is serving dev assets.
  let publicPath = `${devAssetsUrl}${devRelativeOutput}`;

  if (isProduction(options.stage)) {
    rootOutputPath = prodOutput;
    outputPath = options.onlyPack ? prodOutput : path.join(prodOutput, name);
    publicPath = prodAssetsUrl + prodRelativeOutput;
  }

  return {
    rootOutputPath,
    outputPath,
    publicPath
  };
}

// -----------------------------------------------------------------------------
// Generate settings needed for webpack
// -----------------------------------------------------------------------------
function webpackSettings(name, file, appPath, port, options) {
  return {
    name,
    file,
    path: appPath,
    shouldLint: options.shouldLint,
    stage: options.stage,
    production: isProduction(options.stage),
    buildSuffix,
    port,
  };
}

// -----------------------------------------------------------------------------
// Generate all settings needed for a given application
// -----------------------------------------------------------------------------
function appSettings(name, port, options) {

  const appPath = path.join(appsDir, name);
  const htmlPath = path.join(appPath, 'html');
  const staticPath = path.join(appPath, 'static');

  const app = _.merge({
    htmlPath,
    staticPath,
    templateData: {
      site,
      time: new Date()
    }, // Object that will be passed to every page as it is rendered
    templateMap: {
      'index.html': 'home'
    }, // Used to specify specific templates on a per file basis
    htmlOptions,
  }, webpackSettings(name, 'app.jsx', appPath, port, options),
     outputPaths(name, port, options));

  app.templateDirs = _.union(templateDirs(app, ['layouts']), themeTemplateDirs);
  return {
    [name] : app
  };
}

// -----------------------------------------------------------------------------
// Generate all settings needed for a given theme
// -----------------------------------------------------------------------------
function themeSettings(themeEntryFile, appPath, name, port, options) {
  const staticPath = path.join(appPath, 'static');
  const entryName = themeEntryFile.replace('.js', '');
  const app = _.merge({
    staticPath
  }, webpackSettings(entryName, themeEntryFile, appPath, port, options),
      outputPaths(name, port, options));
  return {
    [entryName] : app
  };
}

// -----------------------------------------------------------------------------
// Generate settings for building posts
// -----------------------------------------------------------------------------
function postsApp(options) {
  const contentPath = path.join(__dirname, '../../content');
  const port = options.port;
  const name = 'posts';
  const outputPathResults = outputPaths('', port, options);
  return _.merge({
    name,
    path: contentPath,
    file: null,
    htmlPath: contentPath,
    staticPath: null,
    templateData: {
      site,
      time: new Date()
    }, // Object that will be passed to every page as it is rendered
    templateMap: {
      'index.html': 'home'
    }, // Used to specify specific templates on a per file basis
    postSource: `${contentPath}/posts/`,
    stage: options.stage,
    buildSuffix,
    port,
    production: isProduction(options.stage),
    htmlOptions,
    templateDirs: themeTemplateDirs,
  }, outputPathResults);
}

// -----------------------------------------------------------------------------
// Iterate a given directory to generate app or webpack settings
// -----------------------------------------------------------------------------
function iterateDirAndPorts(dir, options, cb) {
  let port = options.port;
  return fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
    .reduce((result, appName) => {
      const app = cb(appName, port, options);
      port = options.appPerPort ? port + 1 : options.port;
      return _.merge(result, app);
    }, {});
}

// -----------------------------------------------------------------------------
// Generates an app setting for all applications found in the client directory
// -----------------------------------------------------------------------------
function apps(options) {
  return iterateDirAndPorts(appsDir, options, appSettings);
}

// -----------------------------------------------------------------------------
// Generates an app settings for a given directory
// -----------------------------------------------------------------------------
function themesFrom(currentTheme, options) {
  const entriesPath = path.join(themesDir, currentTheme, 'entries');
  return fs.readdirSync(entriesPath)
  .reduce((result, file) =>
    _.merge(
      {},
      result,
      themeSettings(file, entriesPath, currentTheme, options.port, options)),
    {});
}

// -----------------------------------------------------------------------------
// Generates an app setting for all themes
// -----------------------------------------------------------------------------
function themes(options) {
  return _.merge(
    {},
    themesFrom('default', options),
    themesFrom(theme, options)
  );
}

module.exports = {
  paths,
  hotPort,
  outputPaths,
  apps,
  isProduction,
  themes,
  postsApp
};
