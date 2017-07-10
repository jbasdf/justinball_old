#Justin Ball
-----------------------
My blog based on the [React Client Starter App](https://github.com/atomicjolt/react_client_starter_app), maintained by and used by [Atomic Jolt](http://www.atomicjolt.com).

#Demo:
-----------------------
[React Client Starter App Demo](http://reactclientstarterapp.com.s3-website-us-east-1.amazonaws.com)

#Getting Started:
-----------------------

Make sure to install git, npm and yarn before you start then:

1. git clone https://github.com/jbasdf/speakeasy.git my_project_name
2. Rename .env.example to .env. This file contains the port the server will use.
   The default 8080 should be fine, but you can also use a local domain or ngrok if you wish.
   Be sure that the ASSETS_URL is not commented out for the domain that you plan on using. The
   ASSETS_URL=http://0.0.0.0 or localhost is set as default.
3. Install packages with

    `yarn`

4. Start server with:

  `yarn hot`

then visit `http://localhost:8080`

Note that this will start up a server for each application, incrementing the port by one for
each new application that is started.

If you have multiple applications you can run them one at a time with the application name:

  `yarn hot hello_world`

then visit `http://localhost:8080`


# Using the React Client Starter App
-----------------------
The starter app is setup to serve multiple isolated client applications each with their own package.json. You will find
an example "hello world" application in client/apps/hello_world
Modify html and js files in that directory to build your application or copy paste that directory to build additional
applications. The build process will automatically add a new webpack entry point for each folder in that directory.

## Custom Build Settings
-----------
Default build settings can be overridden by adding the following json files to the application directory:

Change the output directory for an application by specifying "outName" which will override the default name
used when generating a path:

In output_paths.json
`
{
  "outName": "hello_world"
}
`

By default app.jsx is used as the webpack entry point. This can be overriden in webpack.json. Change the buildSuffix,
filename, chunkFilename and other settings:

In webpack.json
`
{
  "file": "app.js",         // The webpack entry. Default is app.jsx
  "buildSuffix": ".js",     // Change the build suffix. Default is _bundle.js
  "filename": "[name]",     // Change the output file name. Default is based on production/development
  "chunkFilename": "[id]",  // Change the chunkFilename. Default is based on production/development
  "codeSplittingOff": true, // Turn off code splitting
  "extractCssOff": true     // Turn off css extraction
}
`

## Posts
Add new posts to "/content/posts/". Content added to this directory will be added in typical blog fashion with the latest
10 posts showing on the home page and subsequent pages paged. The number of posts per page can be changed in site.json.


## Content
-----------
Add as many pages as you like to the "/content" directory. The build process will properly process ejs in any html files
as well as process markdown for files that end in .md. All front matter in .md files will be available to the ejs templates.
See about.md for an example. Any pages added to the content directory will be reflected in the same directory structure
in the output directory.


## Themes
-----------
Add new themes to client/themes. A great way to start is by cloning the 'default' directory.


## React.js
-----------
React code can be found in client/js. We use Redux and the React-Router.


## Html
-----------
All html files live in client/apps/[app name]/html. The build process will properly process ejs in any html files as well
as process markdown for files that end in .md. All front matter in .md files will be available to
the ejs templates and will be used when generating html. For example, you can set a custom layout for the html
file by setting `layout: custom_layout` in the front matter. See apps/hello_world/html/about.md for an example.


## Assets
-----------
Any files added to the assets directory can be used by in code and assigned to a variable. This
allows for referring to assets using dynamically generated strings. The assets will be built according to
the rules specified in your webpack configuration. Typically, this means that in production the names will
be changed to include a SHA.

First importing the assets:
  `import assets from '../libs/assets';`

Then assign the assest to a variable:
  `const img = assets("./images/atomicjolt.jpg");`

The value can then be used when rendering:
  `render(){
    const img = assets("./images/atomicjolt.jpg");
    return<div>
    <img src={img} />
    </div>;
  }`


## Static
-----------
Files added to the static directory will be copied directly into the build. These files will not be renamed.


#Tests
-----------
Karma and Jasmine are used for testing. To run tests run:

  `yarn test`


#Install packages
-----------
Ignore the engines settings as reveal.js and protractor.js are set to older versions of node:

  `yarn --ignore-engines`

#Check for updates
-----------
Inside the client directory run:

  `yarn upgrade-interactive`


#Scripts:
-----------------------
The following scripts are available for testing, building and deploying applications

Run all tests:
  `yarn test`

Generate coverage report:
  `yarn coverage`

Run webpack hot reload server:
  `yarn hot`

Run reload server for a specific application:
  `yarn hot [app name]`

Serve production assets. Must run `yarn build` first:
  `yarn live`

Build development version including html pages:
  `yarn build_dev`

Only run the webpack build without generating html pages or subdirectories. This will output all results
directly into the build/dev directory
  `yarn build_dev_pack`

Build for production:
  `yarn build`

Only run the webpack build without generating html pages or subdirectories. This will output all results
directly into the build/prod directory
  `yarn build_pack`

After setting up .s3-website.json this will create a S3 bucket and set it as a website:
  `yarn create`

Release a production build to the S3 website bucket created by `yarn create`
  `yarn release`

Run a linter over the project:
  `yarn lint`

Wipe out all node modules:
  `yarn nuke`

#Deploy to S3:
-----------------------

  1. Setup credentials. If you've already setup your Amazon credentials in ~/.aws/credentials
  you will be able to do something similar to the following where "myprofile" is one of
  the AWS profiles found in ~/.aws/credentials:

    export AWS_DEFAULT_PROFILE=myprofile
    export AWS_PROFILE=myprofile

  You can also use a .env file. See the [s3-website](https://github.com/klaemo/s3-website) documentation for more options.

  2. Edit configuration.

    Open up .s3-website.json and set the desired bucket name

  3. Configure the bucket as a website

    `yarn create`

  4. Deploy.

    `yarn release`

#Production
-----------------------
If you want to see what your application will look like in production run

  `yarn live`

This will serve files from the build/prod directory.


#Deploy:
-----------------------

  Build a development release without deploying:

  `yarn build_dev`


  Build a release without deploying:

  `yarn build`


  Build a release and deploy:

  `yarn release`


License and attribution
-----------------------
MIT
