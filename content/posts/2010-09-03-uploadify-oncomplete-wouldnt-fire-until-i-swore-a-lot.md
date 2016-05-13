---
title: 'Uploadify onComplete Wouldn&#8217;t Fire Until I Swore &#8211; A Lot'
author: Justin Ball
layout: post
permalink: /2010/09/03/uploadify-oncomplete-wouldnt-fire-until-i-swore-a-lot/
tags:
  - jQuery
  - Ruby On Rails
---

I've been trying to get <a href="http://www.uploadify.com/">Uploadify</a> to work inside my <a href="http://github.com/jbasdf/uploader"Uploadify>uploader gem</a>. Things went pretty well until I combined that with the <a href="http://github.com/tatemae/muck-contents">muck-contents gem</a> and tried to do multiple file uploads from within a plugin I'd written for the <a href="http://tinymce.moxiecode.com/">TinyMCE editor</a>. At that point things got ugly.

If you do much research on Uploadify you'll find that it's pretty common to hear someone complain that the <a href="http://www.uploadify.com/forum/viewtopic.php?f=7&t=2593">OnComplete event does not fire</a>. There's a number of solutions that people have come up with, but mostly they sound like voodoo - Be sure to only return a '1', make sure to use an id instead of a css class, etc. I tried everything I read about and finally got mad enough to debug the fla file. 

If you are that desperate make sure to get <a href="http://www.actionscript-flash-guru.com/blog/21-fireflash-firebug-console-for-flash">FireFlash</a>. It will let you write to the Firebug console from within your swf file. It's very handy when you need to see what's going on inside your Actionscript while running inside the browser. I created a debug version of the fla that output the events that the swf file was attempting to fire on the client.  If you want to try it out in hopes it will help you debug <a href='http://www.justinball.com/wp-content/uploads/2010/09/Uploadify.zip'>download a zip file with the swf and fla</a>.

OK so now to the point. What's going wrong? Why doesn't 'onComplete' fire? The answer is that Uploadify binds events to the DOM item you specify via jQuery('#my-upload-container').uploadify(); These events include 'uploadifySelect', 'uploadifyOpen', 'uploadifyProgress', 'uploadifyComplete', etc. What I found is that the swf makes a call that looks like this:

<pre><code class="javascript">
ExternalInterface.call(['jQuery'+p(q('#'+param.uploadifyID)), p(list.join(','))].join('.trigger'));
</pre></code>

That call does it's job - I can watch it make the ExternalInterface calls using FireFlash. The swf file attempts to trigger the events I listed above that have been bound to the element identified by id="my-upload-container". However, something goes wrong and somehow the 
'my-upload-container' element loses it's bindings and nothing is fired.

I found I can get things to work if I change 'jquery.uploadify.js' to bind the events above to the document instead of to the DOM element and then change the fla to do this:
<pre><code class="javascript">
ExternalInterface.call(['jQuery(document)', p(list.join(','))].join('.trigger'));
</pre></code>

That means that the events do fire however it's a hack so I kept digging (and swearing) and I bummed some help off Joel.....

It turns out that the problem wasn't Flash. It wasn't uploadify. It wasn't jQuery although all of those components seemed like they might be the source of the problem.  The problem as it turns out was TinyMCE. (As it turns out TinyMCE is the source of a lot of my problems but I still like it).

In our specific case we've built a plugin to TinyMCE that let's you upload files to the server. (You can find it in the <a href="http://github.com/tatemae/muck-contents">muck-contents gem</a>). We use the TinyMCE scripts to build our popups which means using 'tiny_mce/tiny_mce_popup.js'. If you look in that code very deeply you will discover this code around line 320:

<pre><code class="javascript">
  if ((nv = t.editor.translate(h)) && nv != h)
    document.body.innerHTML = nv;
</pre></code>

Notice that the way the popup handles translations is to replace the entire document with new html. If you use jQuery and your bindings have already been setup you realize this is very bad because everything you've setup using the standard methods just vanished. (This goes for all methods - click, bind, etc. They will all go away).

ie This won't work:
<pre><code class="javascript">
jQuery(document).ready(function(){
   jQuery('#mce_uploader_upload').uploadify(mce_uploader_options);
});
</pre></code>

The solution is simple and probably obvious to a seasoned TinyMCE dev (which I'm not). Put your code into a different initialization block:
<pre><code class="javascript">
tinyMCEPopup.onInit.add(function(ed) {
   jQuery('#mce_uploader_upload').uploadify(mce_uploader_options);
});
</pre></code>




As an aside I should mention that if you need help getting uploadify running in your Rails application there's already a couple of great tutorials. One by J<a href="http://railstips.org/blog/archives/2009/07/21/uploadify-and-rails23/">ohn Nunemaker</a> and an update to get it working with Rails 3 <a href="http://metautonomo.us/2010/07/09/uploadify-and-rails-3/">updated version</a>.
