---
title: Plugin Loading for Ruby on Rails has Changed.
author: Justin Ball
layout: post
permalink: /2008/03/22/plugin-loading-for-ruby-on-rails-has-changed/
tags:
  - Programming
  - Ruby On Rails
  - Authentication
  - errors
  - OpenID
  - plugins
  - Ruby On Rails
---
I am tired of recreating the login system for Rails for each new project so using the <a href="http://www.railsforum.com/viewtopic.php?id=14216&p=1">RESTful Rails Authentication Tutorial</a> I created a template project that I can use to create new projects.  While adding in the OpenID Authentication component I started getting this error:

<blockquote>
/Library/Ruby/Gems/1.8/gems/activesupport-2.0.2/lib/active_support/dependencies.rb:376:in `new_constants_in': You have a nil object when you didn't expect it! (NoMethodError)
</blockquote>

after I installed this <a href="http://github.com/josh/open_id_authentication/tree/ruby_openid_2">OpenID plugin</a>.

The problem occurs because Rails has changed the way that plugins are loaded.  The default folder name was:
<blockquote>
josh-open_id_authentication-ruby_openid_2
</blockquote>
I renamed it to:
<blockquote>
open_id_authentication
</blockquote>
and everything started working again.