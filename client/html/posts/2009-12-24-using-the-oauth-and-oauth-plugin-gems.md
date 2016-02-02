---
title: Using the OAuth and OAuth-Plugin gems
author: Justin Ball
layout: post
permalink: /2009/12/24/using-the-oauth-and-oauth-plugin-gems/
categories:
  - Oauth
  - oauth-plugin
  - Ruby On Rails
---

For quite a while I've been wanting to play with OAuth and now that I've been able to spend some time playing with it I have to say it is awesome.  Instead of asking for a user's username and password for a given service (like their GMail or LinkedIn account) you instead have the user log into their account and grant your application access.  The benefit is that your application doesn't have to figure out how to securely store a bunch of extra usernames/passwords and the user can turn off access anytime they feel like they need to reclaim their privacy.

In Rails the way to work with OAuth is the <a href="http://github.com/pelle/oauth">OAuth gem</a> and the <a href="http://github.com/pelle/oauth-plugin">OAuth-Plugin gem</a> which take almost all the pain out of implementing an OAuth solution.  A big thanks to <a href="http://stakeventures.com/">Pelle Braendgaard</a> for a great library.

I won't go into all the details on how to implement the gems in your project.  Instead checkout the README for each gem and the articles on Pelle's blog: <a href="http://stakeventures.com/articles/2008/02/23/developing-oauth-clients-in-ruby">Developing OAuth clients in Ruby</a>, <a href="http://stakeventures.com/articles/2009/07/21/major-update-to-ruby-on-rails-oauth-plugin">Major update to Ruby on Rails OAuth Plugin</a>, and <a href="http://stakeventures.com/articles/2009/07/21/consuming-oauth-intelligently-in-rails">Consuming OAuth intelligently in Rails</a>.

Once you have an OAuth solution in place the next step is to do something with the tokens.  I figured that it was my problem to figure out how to call the various service's apis using the OAuth token.  I spent a fair amount of time trying to figure out how to send the correct headers, sign the values, etc.  I turns out that the OAuth gem takes care of this for you so to save you hours of time, once you have your application setup and configured you can do stuff like this:

Google Contacts API:
{% highlight ruby %}
limit = 10000
user.google.get("http://www.google.com/m8/feeds/contacts/default/full?max-results=#{limit}")
{% endhighlight %}

The gem will handle signing the request and adding the needed values to the header.


Pretty cool.




