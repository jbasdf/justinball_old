---
title: Using Starling, Workling with Ruby on Rails
author: Justin Ball
layout: post
permalink: /2008/08/18/using-starling-workling-with-ruby-on-rails/
categories:
  - Programming
  - Ruby On Rails
tags:
  - asyncronous processing
  - Ruby On Rails
  - starling
  - workling
---
For the project we are working on for Teachers Without Borders we need a reliable asynchronous way to process tasks. There are a myriad of ways to do this and if you aren't careful you'll spend weeks second guessing yourself while investigate every possible option. Not that I would know that from experience.

We chose [Starling][1] and Workling as our solution. Starling is a message queue that uses memcache. It was [built by the guys at Twitter][2] and [released as open source][3]. I bet it scales.

 [1]: http://rubyforge.org/projects/starling/
 [2]: http://dev.twitter.com/2008/01/announcing-starling.html
 [3]: http://blog.twitter.com/2008/01/twitters-starling-released-as-open.html

[Workling][4] is a great plugin built by a couple of guys working on [boomloop.com][5] It makes using Starling a bit easier especially when it comes to consuming messages from the queue.

 [4]: http://playtype.net/past/2008/2/6/starling_and_asynchrous_tasks_in_ruby_on_rails/
 [5]: http://boomloop.com

There are a few blog posts around that describe how to get stuff up and running. Other than that the documentation is a bit sparse. I have to believe that will change over time. I am throwing my own links and experience into the mix so I don't forget how to do this.

First get the gems you need to run starling:
{% highlight ruby %}
sudo gem install starling
sudo gem install memcache-client
{% endhighlight %}

Get the [working plugin][6]
{% highlight ruby %}
git clone http://github.com/purzelrakete/workling/tree/master/Changes
{% endhighlight %}

 [6]: http://github.com/purzelrakete/workling/tree/master/Changes

{% highlight ruby %}
# Get starling and working going with:
#
# Fire up starling - this isn't in daemon mode. Add a -d for that.
# starling -P tmp/pids/starling.pid -q tmp/starling
#
# Next fire up the server
# script/server
#
# Get workling going
# script/workling\_starling\_client start
{% endhighlight %}

A few more resources

http://www.williambharding.com/blog/rails/starling-update-from-the-horses-mouth/

http://davedupre.com/2008/03/25/ruby-background-tasks-with-starling/