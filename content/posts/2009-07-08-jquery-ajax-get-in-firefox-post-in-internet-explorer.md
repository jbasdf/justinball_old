---
title: 'jQuery.ajax &#8211; Get in Firefox, Post in Internet Explorer'
author: Justin Ball
layout: post
permalink: /2009/07/08/jquery-ajax-get-in-firefox-post-in-internet-explorer/
tags:
  - Programming
  - Ruby On Rails
  - ajax
  - jQuery
  - Ruby On Rails
---

<a href="http://docs.jquery.com/Ajax/jQuery.ajax#options">The docs for jQuery.ajax indicate that by default the request is made using 'GET'</a>.  <del datetime="2009-07-09T05:35:38+00:00">I would still recommend setting the type to 'GET'.  We just deployed a site and found that for some reason some versions of Internet Explorer were doing a POST instead of a GET.  This is problematic with a Ruby on Rails site since the same url routes to different locations based on the HTTP verbs.  We couldn't figure out why we were getting a bunch of incorrect create requests until we realized the before stated issue.</del>

I suck and I am a liar.  I _thought_ that adding GET to the ajax request fixed it but in fact it did not.  I spent most of the night going WTF without any LOL while my <a href="http://www.justinball.com/2006/07/29/pph-profanity-per-hour/">PPH</a> started going through the roof.  The air started to stink from the foul language.  No wonders I am losing all my hair.

I finally chose to <a href="http://www.answers.com/topic/gird-one-s-loins">gird up my loins</a>, turn my back on the Mac, and use my PC.  I fired up Visual Studio 2008 attached it to Internet Explorer and prepared a full barrage of colorful metaphors.

Actually Visual Studio does a nice job of debugging Javascript.  If your problems come from Internet Explorer (and what problems don't) then the standard debug protocol is to use alert('save me');.  Knock it off and get Visual Studio.  I'll come out of the closet and admin I really like Visual Studio.  Combine it with <a href="http://www.jetbrains.com/resharper/download/">Resharper</a> and you have an incredible tool for writing C# code (if you're into that sort of thing).  If you don't have a copy (I get mine free by attending the Visual Studio Launch events) then you might try <a href="http://www.microsoft.com/express/vwd/">Visual Studio Express edition</a>.

To <strong>debug javascript using Visual Studio</strong> simply create a web project and then put the following into default.aspx.  Remember to change 'http://192.168.100.101:3000/' to the url of your application.  'http://192.168.100.101:3000/' just happens to point to a Ruby on Rails application running on my Mac.

<pre><code class="csharp">

<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <meta http-equiv="refresh" content="0;url=http://192.168.100.102:3000/">
</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    </form>
</body>
</html>

</pre></code>

Hit the run button in Visual Studio.  It should fire up Internet Explorer.  You'll notice a bunch of Javascript files magically show up in the Solution Explorer.  Just click on the desired file and add a breakpoint.  When you hit that code you'll have all of Visual Studio's debugging tools available to you.  Pretty cool.

One other thing.  If you are debugging into jQuery.js like I was doing you'll also want to <a href="http://jquery.com/">get the development version</a> that is not compressed.

Back to our story.

As I stated above Internet Explorer was sending 'POST' requests instead of 'GET' requests.  This is naughty when a Ruby on Rails application lives on the other end since the request is then routed to 'create' instead of 'show' or 'index'.  The result is lots of errors and unhappy programmers and lots of WTFs.

At first I was sure there was something wrong with jQuery.  Forgive me my heresy.  It is the one true Javascript library.  I repent.

Turns out I had the following code in one of my Javascript files:
<pre><code class="javascript">
jQuery(document).ajaxSend(function(event, request, settings) {
  if (typeof(AUTH_TOKEN) == "undefined") return;
  settings.data = settings.data || "";
  settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN);
});
</pre></code>
I pulled this code off the net.  It looked and worked like magic.  Turns out there something dark hidden within.

I found a line in jQuery.js that does this:
<pre><code class="javascript">
  // If data is available, append data to url for get requests
  if ( s.data && type == "GET" ) {
    s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

    // IE likes to send both get and post data, prevent this
    s.data = null;
  }
</pre></code>

The IE comment is key here.  Later on jQuery gives you a chance to say your piece by doing this:
<pre><code class="javascript">
  if ( s.global )
    jQuery.event.trigger("ajaxSend", [xhr, s]);
</pre></code>
Since that code is called after 's.data = null;' it has a chance to put stuff into 's.data' which is exactly what my code did.

Stupid WTF !#@$!@#$ code.  There is a lesson here.  Something about being careful about what you pull off the net.  Be careful about global code.  I'm sure I should learn it but it's late so maybe tomorrow.

Here's the fix to all my effort:
<pre><code class="javascript">
jQuery(document).ajaxSend(function(event, request, settings) {
  if (typeof(AUTH_TOKEN) == "undefined") return;
  // This next line is the key!
  if (settings.type == 'GET') return; // Don't add anything to a get request let IE turn it into a POST.
  settings.data = settings.data || "";
  settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN);
});
</pre></code>

You don't want to be adding anything to settings.data at this point or Internet Explorer will automatically turn your request into a POST regardless of anything else you have set.

To pay homage to Visual Studio and express my joy at finding this one line of code that fixed my problems I wrote half this post on my PC (in Firefox) while I was waiting for my Mac to reboot.  Happy Joy.
