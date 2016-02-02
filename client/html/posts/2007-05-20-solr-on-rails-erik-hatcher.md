---
title: Solr on Rails Erik Hatcher
author: Justin Ball
layout: post
permalink: /2007/05/20/solr-on-rails-erik-hatcher/
categories:
  - RailsConf
  - RailsConf07
tags:
  - RailsConf07
  - Ruby On Rails
---

Ferret is fast.  He has moved around and the documentation is a bit sparse.
Solr was created by people at CNET, used by Internet Archive, Krugle, Revolution Health, his projects: Collext, Blacklight.
Findability - serendipity is great.  You should be able to browse and discover stuff you didn't intend to.
Read <strong>Ambient Findability</strong>
Lucene is fast and scalable.  Written in Java.
Solr is a layer on top of Lucene.
<a href="http://wiki.apache.org/solr/Flare">Flare</a> is a plugin he wrote that is a bit of a hack but does "faceted browsing, auto-suggest, folksonomy tagging/annotating."
Adds caching, replication, faceting, highlighting, spell checking, Http interface.
You can talk to it via Net::HTTP::Post or use solr-ruby (gem), <a href="http://acts_as_solr.railsfreaks.com/">acts_as_solr</a> (will hopefully use gem soon, Hatcher submitted a patch)
{% highlight ruby %}
  gem install solr-ruby
{% endhighlight %}

Look at the code in his slides.

Luke is a tool that lets you view your lucene index.

This is a pretty sweet tool for adding search to your site.  I plan on looking into it further.

