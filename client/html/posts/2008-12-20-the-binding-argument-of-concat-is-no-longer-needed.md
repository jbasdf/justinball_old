---
title: 'The binding argument of #concat is no longer needed'
author: Justin Ball
layout: post
permalink: /2008/12/20/the-binding-argument-of-concat-is-no-longer-needed/
categories:
  - Funny
  - Ruby On Rails
  - upgrades
---

If you upgrade to Rails 2.2.2 and start getting "The binding argument of #concat is no longer needed"  then wherever you do something like this:
{% highlight ruby %}
concat(content, block.binding)
{% endhighlight %}

change it to this:
{% highlight ruby %}
concat(content)
{% endhighlight %}

The 'block.binding' argument is no longer needed which is nice because who really wanted to type that over and over again anyway.
