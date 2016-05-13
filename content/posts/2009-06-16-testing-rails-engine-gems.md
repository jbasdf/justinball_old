---
title: Testing Rails Engine Gems
author: Justin Ball
layout: post
permalink: /2009/06/16/testing-rails-engine-gems/
tags:
  - Ruby On Rails
  - engines testing
  - gems
  - Ruby On Rails
---

I've been working on a number of gems that are basically packaged Ruby on Rails engine plugins.  It turns out that turning gems into plugins is pretty easy to do.  However, testing them can be a pain.  Here are a few things I came up with.

After looking at how <a href="http://giantrobots.thoughtbot.com/2009/2/9/clearance-rails-authentication-for-developers-who-write-tests">Clearance</a> handles tests I've decided that it's ok to embed a basic Rails application in your test directory.

The next trick is getting the gem you are working on to load in your embedded Rails application.  The Clearance guys added a file in config/initializers that looks like this:

<pre><code class="ruby">
# This simulates loading the clearance gem, but without relying on
# vendor/gems

clearance_path = File.join(File.dirname(__FILE__), *%w(.. .. .. ..))
clearance_lib_path = File.join(clearance_path, "lib")

$LOAD_PATH.unshift(clearance_lib_path)
load File.join(clearance_path, 'rails', 'init.rb')
</pre></code>

I thought that was brilliant but it didn't work for me.  After messing around in the Rails code for a bit I found a bit of helpful documentation on 'plugin_locators':

<i>
The classes that handle finding the desired plugins that youâ€˜d like to load for your application. By default it is the Rails::Plugin::FileSystemLocator which finds plugins to load in vendor/plugins. You can hook into gem location by subclassing Rails::Plugin::Locator and adding it onto the list of plugin_locators.
</i>

That sounded like the perfect solution to my problem.  I figured I would simply add a plugin locator that pointed to the root of the gem I was building.  Turns out that works great.  In the embedded rails application inside of config/environment.rb I added this code:

<pre><code class="ruby">
class TestGemLocator < Rails::Plugin::Locator
  def plugins
    Rails::Plugin.new(File.join(File.dirname(__FILE__), *%w(.. .. ..)))
  end
end

Rails::Initializer.run do |config|
  config.time_zone = 'UTC'
  config.plugin_locators << TestGemLocator
end
</pre></code>

Now my tests load correctly and all is well.  Context is important.  If you want to have a look at the full project I put it into a gem called <a href="http://github.com/jbasdf/disguise/tree/master">disguise which you can get from github</a>.



