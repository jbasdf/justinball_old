---
title: Disguise your Rails Application
author: Justin Ball
layout: post
permalink: /2009/06/12/disguise-your-rails-application/
categories:
  - Ruby On Rails
tags:
  - disguise
  - gem
  - Ruby On Rails
  - theming skin
---

I spent quite a while trying to figure out how to theme my Ruby on Rails applications.  Turns out after you build a piece of software people want to use it to do other stuff.  Go figure.

I really like how simple it is to skin a Wordpress site so I <del datetime="2009-06-07T05:49:50+00:00">stole</del> borrowed some ideas.

From all of my research and effort and late night I give you disguise the ruby gem that makes it simple to skin your Rails application and impress everyone (ok maybe your mom).

Disguise makes it possible to generate a theme for your Rails website, set the current 'theme' using an admin interface or change the theme based on the current url.

Install the gem:
{% highlight ruby %}
  sudo gem install disguise
{% endhighlight %}

or get the source code at:
<a href="http://github.com/jbasdf/disguise/tree/master">http://github.com/jbasdf/disguise/tree/master</a>