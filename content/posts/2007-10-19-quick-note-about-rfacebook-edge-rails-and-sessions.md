---
title: Quick Note About rFacebook, Edge Rails, and Sessions.
author: Justin Ball
layout: post
permalink: /2007/10/19/quick-note-about-rfacebook-edge-rails-and-sessions/
tags:
  - Ruby On Rails
  - acts_as_facebook_user
  - rFacebook
  - ruby_on_rails
---

This problem may not be specific to rFacebook, but when I added acts_as_facebook_user to my user model and then made a call like:

<pre><code class="ruby">
my_user.first_name
</pre></code>

I would get an 500 internal server error.  I checked the log and saw this:
<i>CGI::Session::CookieStore::CookieOverflow</i>

I found that if I changed the app so that it uses db sessions everything started working.

Uncomment this line in environment.rb:
<pre><code class="ruby">
config.action_controller.session_store = :active_record_store
</pre></code>

Make sure to add the session tables to your db by using the rake task and you should be good to go.  Note that I am running edge rails so keep that in mind if you use this advice.