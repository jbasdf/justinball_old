---
layout: post
author: Justin Ball
title: "Rails on Heroku Notes - some Asset Pipeline and a Frame issue"
date: 2013-10-23 08:36:56 -0600
tags:
  - Rails
  - Heroku
---

<h2>A tiny Rails asset pipeline thing if you are into bookmarklets</h2>
<p>This is more a general Rails issue rather than a Heroku issue, but I ran into the problem while deploying to heroku so I'm including it.
Rails 3 generated digest as well as undigested version of your assets. Rails 4 no longer does that. For many applications that
doesn't matter but if you need to access your assets directly via file name it becomes a big problem. In my case I need
to be able to access a javascript file for a bookmarklet. The proposed solution is that you put those kinds of files directly
into the public directly. However, I needed to make use of the asset pipeline to take advantage of Rails JST capabilities.
If you run into the same problem take a look at
<a href="https://github.com/alexspeller/non-stupid-digest-assets">Non-stupid non-digest assets in Rails 4 by Alex Speller.</a> It saved
me a ton of time and fixed a major headache.</p>


<h2>Just in case you want to be framed</h2>
<p><a href="http://www.seanbehan.com/how-to-enable-iframe-support-on-heroku-with-ruby-on-rails-and-sinatra">
  It turns out that X-Frame-Options is set to 'SAMEORIGIN' by default in Rails 4. If you want your content to be framed then you'll need to set the headers:</a></p>

<pre><code class="ruby">
  config.action_dispatch.default_headers = {
    'X-Frame-Options' => 'ALLOWALL'
  }
</pre></code>

