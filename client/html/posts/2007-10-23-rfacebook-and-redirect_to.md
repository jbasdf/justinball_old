---
title: rFacebook and redirect_to
author: Justin Ball
layout: post
permalink: /2007/10/23/rfacebook-and-redirect_to/
categories:
  - Ruby On Rails
tags:
  - redirect_to
  - rFacebook
  - ruby_on_rails
---


I have been working with rFacebook to try to get a Facebook application up and running.  Right now we are trying to integrate our conference application - <a href="http://www.51weeks.com">51weeks.com</a> with Facebook so that our users can take advantage of existing social networks instead of having to create yet another network at he conference they are attending.

In working on the application I kept getting an exception related to redirect_to:
{% highlight ruby %}wrong number of arguments (2 for 1) {% endhighlight %}

The stack trace points to this file:
{% highlight ruby %}controller_extensions.rb:463:in `url_for__ALIASED'{% endhighlight %}

So I did what any good developer would do I went to Google and <a href="http://okwithfailure.com/2007/10/21/a-fix-for-this-rfacebook-bug">came up with this post</a>.

The poster replaced this line in the gem:
{% highlight ruby %}
  path = url_for__ALIASED(options, *parameters)
{% endhighlight %}

with this:
{% highlight ruby %}
  path = options
{% endhighlight %}

I am not brave enough to mess around with the gem - it makes deployment a bit of a headache so I sat back and thought about this for a bit.  This always helps me.  I checked my facebook.yml file.  I have been using '/' as the callback_path.  I switched that to 'http://www.myserver.com/facebook/'.  Then I set the callback path inside of Facebook to 'http://www.myserver.com/facebook/'.  I made sure my canvas page url was setup correctly - 'indulgences' in my case.

Next I ran the application inside of Facebook.  Like magic everything worked.  Now even if I change my facebook.yml file back to '/' everything still seems to work.  Morale of the story is to check your configuration when building a Facebook application.  Everything has to be just right and it is easy to forget to setup any one of a number of configuration items which can cause you a lot of pain.
