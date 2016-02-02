---
title: 'jQuery Ajax requests are &#8216;html&#8217; not &#8216;js&#8217;'
author: Justin Ball
layout: post
permalink: /2010/08/09/jquery-ajax-requests-are-html-not-js/
categories:
  - jQuery
  - ajax
  - jQuery
  - Ruby On Rails
---

I like jQuery. I use it in all my Rails projects these days. One thing I've struggled with for the longest time is that for some reason all my jQuery ajax requests come through as html not as js.

I thought adding something like this to application.js would fix the problem:
{% highlight javascript %}
// In application.js
jQuery.ajaxSetup({
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})
{% endhighlight %}

That won't save you. This change to Rails prevents the Accept header from being used:
http://github.com/rails/rails/commit/2f4aaed7b3feb3be787a316fab3144c06bb21a27

The trick to fixing this problem comes from a comment in that commit:

{% highlight ruby %}
# Returns true if the request's "X-Requested-With" header contains
# "XMLHttpRequest". (The Prototype Javascript library sends this header with
# every Ajax request.)
{% endhighlight %}

jQuery doesn't send that parameter with each request.  I've written before about modifying the request.
<a href="http://www.justinball.com/2009/07/08/jquery-ajax-get-in-firefox-post-in-internet-explorer/">http://www.justinball.com/2009/07/08/jquery-ajax-get-in-firefox-post-in-internet-explorer/</a>

Taking the code from that post I just add a bit more information. Specifically include this line:
{% highlight ruby %}
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
{% endhighlight %}

Your setup ends up looking something like this.  Drop this code into application.js and the ajax requests made via JQuery should start showing up as javascript format.
{% highlight ruby %}
  jQuery(document).ajaxSend(function(event, request, settings) {
    request.setRequestHeader("Accept", "text/javascript");
  	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (settings.type.toUpperCase() == 'GET' || typeof(AUTH_TOKEN) == "undefined") return;
    // settings.data is a serialized string like "foo=bar&baz=boink" (or null)
    settings.data = settings.data || "";
   	if (typeof(AUTH_TOKEN) != "undefined")
    	settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN);
  });
{% endhighlight %}

I'm using the jquery.form plugin so my code ends up looking like this:

function apply_ajax_forms() {
  jQuery('form.ajax').ajaxForm({
    dataType: 'script',
    beforeSend: add_headers
  });
	jQuery('form.ajax').append('<input type="hidden" name="format" value="js" />');
}

Passing the format as a hidden field to Rails ensures that the proper format handler is called.  It isn't the cleanest, but it works reliably and to make a normal form into an ajax form all I need to do is add 'ajax' as a css class.