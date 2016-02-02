---
layout: post
author: Justin Ball
title: "Firefox, Vimeo and Froogaloop Have a Little Problem"
date: 2014-03-09 11:21:56 -0600
categories:
  - Programming
  - Javascript
  - Ruby
---

On one of our latest projects we're integrating with <a href="http://www.vimeo.com">Vimeo</a>. They provide a great <a href="http://developer.vimeo.com/player/js-api/">Video player API</a> that makes it pretty simple to interact with videos.
Vimeo even provides the <a href="https://github.com/vimeo/player-api/tree/master/javascript">Froogaloop library</a> that wraps up all the communication between the iframe where the video lives and your page.

<h3>What We Need</h3>
The requirement was to show other content once the video finished playing. That seems easy enough and really it is:

{% highlight javascript %}
var VimeoStuff = {

  init: function(){
    $.each($('iframe.vimeo'), function(i, iframe){
      this.setupEvents(iframe)
    }.bind(this));
  }

  setupEvents: function(iframe){
    var player = $f(iframe);

    player.addEvent('ready', function(player_id){
      player.addEvent('finish', onFinish);
    });

    function onFinish(id){
      // Show other content
    }

  }

};

$(document).ready(function(){
  VimeoStuff.init();
});
{% endhighlight %}

<h3>The Problem</h3>
We do most of our development using Chrome and so everything worked great until someone tried to use the application with Firefox. I know, most people will tell you that
Internet Explorer is pure evil and a total piece of junk. I hate to say it but Firefox has its rough spots as well. For some reason in Firefox the events from the Vimeo player
iframe never fired. After some digging we found this semi-related bug <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=548397">indicating if an iframe isn't visible then
window.getComputedStyle() would return null</a>. It turns out that if an iframe isn't visible when a page loads and you attempt to use the Froogaloop library to monitor
events coming from that window you are out of luck - the 'ready' event will never fire and you won't be able to monitor any other events coming from the iframe.

The solution was something we needed anyway. Orginally, we were loading iframes for a bunch of videos on the page. That's a bad idea anyway since loading 20 or 30 hidden videos on a page
isn't especially performant.

 <h3>A Fix</h3>
The fix was pretty simple. Instead of setting the 'src' tag on every iframe and loading the video at startup we set a 'data-src' on every iframe and left the src tag empty. We have a helper that looks like this:

{% highlight ruby %}
def video_embed(video)
  %Q{<iframe id="#{dom_id(video)}"
          data-modal="moda_#{dom_id(video)}"
          class="vimeo"
          data-src="//player.vimeo.com/video/#{video.vimeo_id}?api=1&player_id=#{video.id}"
          width="500"
          height="281"
          frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>}
end
{% endhighlight %}

Then in our javascript we only set the iframe src when we display the modal. After that we watch for the 'ready' event from Froogaloop and everything works like magic again:
{% highlight javascript %}
var VimeoStuff = {

  init: function(){

    $.each($('.modal'), function(i, modal){
      modal = $(modal);

      modal.on('show.bs.modal', function(){
        var iframe = $('iframe.vimeo', modal);
        iframe.attr('src', iframe.data('src'));
        this.setupEvents(iframe[0]);
      }.bind(this));

    }.bind(this));
  },

  setupEvents: function(iframe){
    var player = $f(iframe);

    player.addEvent('ready', function(player_id){
      player.addEvent('finish', onFinish);
    });

    function onFinish(id){
      // Show other content
    }

  }

};

$(document).ready(function(){
  PikkitUserAds.init();
});

{% endhighlight %}
