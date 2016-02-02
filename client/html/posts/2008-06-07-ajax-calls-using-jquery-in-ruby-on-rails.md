---
title: Ajax calls using jQuery in Ruby on Rails
author: Justin Ball
layout: post
permalink: /2008/06/07/ajax-calls-using-jquery-in-ruby-on-rails/
categories:
  - Funny
  - Ruby On Rails
tags:
  - ajax
  - InvalidAuthenticityToken
  - jQuery
  - Ruby On Rails
---

jQuery is the hot javascript library and it is small and it is cooler than Prototype, the default library that comes with Ruby on Rails.  Ergo I plugged it in and pulled out everything else.  The ajax calls are very simple and look like this:


{% highlight javascript %}
$.post("function_name",{ key:value } ,function(data)
{
  // do stuff with data
});
{% endhighlight %}

The problem is that you will start seeing 'ActionController::InvalidAuthenticityToken' and your ajax calls will fail.

<a href="http://henrik.nyh.se/2008/05/rails-authenticity-token-with-jquery">Here is a very elegant solution</a>.
