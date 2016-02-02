---
title: 'Exception Handling in Ruby &#8211; a Little Surprise'
author: Justin Ball
layout: post
permalink: /2010/11/30/exception-handling-in-ruby-a-little-surprise/
categories:
  - Programming
  - Ruby On Rails
---

I've got a rake task that includes a section where I do something like this:

{% highlight ruby %}
begin
  # Do some things
rescue => ex
   puts "Error: #{ex}"
end
{% endhighlight %}

I know that typically you want to be specific about the errors that you catch, but in this case I just want to move on. The things that didn't happen on this pass will get caught the next time around. It turns out that this code block won't always catch every error. It took some <a href="http://www.justinball.com/2006/07/29/pph-profanity-per-hour/">serious thinking</a> to figure out why.  <a href="http://lindsaar.net/2007/12/9/rbuf_filltimeout-error">Network time out errors are not a subclass of StandardError and thus will not be caught in the block above.</a> Instead you have to put together a block like this:

{% highlight ruby %}
begin
  # Do some things
rescue => ex
   puts "Error: #{ex}"
rescue Timeout::Error => e
  puts "Timeout Error: #{e}"
end
{% endhighlight %}

That will catch the Timeout error and allow you to deal with it appropriately.