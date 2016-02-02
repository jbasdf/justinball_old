---
title: 'Shoulda Doesn&#8217;t like &#8216;Status&#8217;'
author: Justin Ball
layout: post
permalink: /2008/07/25/shoulda-doesnt-like-status/
categories:
  - Ruby On Rails
tags:
  - bugs
  - Ruby On Rails
  - shoulda
---

One of the models in a project I am working on right now ends in 'status'.  Rails handles that just find but in my tests I started noticing an odd error:

{% highlight ruby %}
test: Lookup should belong_to lookup_status. (LookupTest):
NameError: uninitialized constant LookupStatu
{% endhighlight %}

The Shoulda test looks like this:
{% highlight ruby %}
   should_belong_to :lookup_status
{% endhighlight %}

Nothing to complicated there.  Should recognizes the relationship just find but when it tries to find a class it goes looking for LookupStatu.  I fixed this by adding the the class name to the relationship thus:

{% highlight ruby %}
belongs_to :lookup_status, :class_name => 'LookupStatus'
{% endhighlight %}