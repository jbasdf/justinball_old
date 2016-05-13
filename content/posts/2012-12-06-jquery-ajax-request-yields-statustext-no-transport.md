---
title: "jQuery ajax request yields statusText: No Transport"
author: Justin Ball
layout: post
permalink: /2012/12/06/jquery-ajax-request-yields-statustext-no-transport/
tags:
  - Javascript
  - jQuery
  - Programming
  - Ruby
  - Ruby On Rails
---

If you write code you hate Internet Explorer. You get everything just right in Chrome, Firefox, Safari - any other browser really and then everything falls apart in Internet Explorer.

We use <a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">CORS</a> in some of the work with do at <a href="http://www.opentapestry.com">Open Tapestry</a>. It works really well for letting the client figure out which service it needs to call and then call that system directly rather than routing all the requests through the main site.

At some point someone at Microsoft decided that supporting standards just wasn't for them and so they created the <a href="http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx">XDomainRequest</a> object. (I find it amusing that the top of the document states "There are no standards that apply here." That attitude permeates Internet Explorer). <a href="https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest">Lucky for us someone wrote a jQuery ajax transport that talks jQuery into kind of supporting CORS like behavior.</a> It helps but doesn't solve all problems.

When we deployed our code we found that nothing worked in Internet Explorer. No errors. No output. Just nothing.

Here's what I learned:

<ol>
<li>In Internet Explorer the scheme of your ajax request must match the scheme of the page. ie if your page is http://www.example.com then your ajax request url must be http://someotherplace.example.com. The http part has to match.</li>
<li>No custom headers.</li>
<li>Only POST or GET. Only text/plain for the Content-Type.</li>
<li>No authentication or cookies</li>
<li>IE 10 finally supports CORS</li>
</ol>

<a href="http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx">The IEInternals guys describe the restrictions in details.</a>

If you can change any of those things or don't need anything outside those parameters then the <a href="https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest">XDomainRequest plugin</a> will likely solve your problems.

In IE 8/9 failure to comply with any of the restrictions will likely result in the 'No Transport' error. It's jQuery that generates the error before the ajax request is made and your server is never called. Here's the section of code that does it:
<pre><code class="javascript">
		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
</pre></code>

The "No Transport" error means that jQuery has no idea how to contact the remote server. If you are seeing the error then be sure to grab a development version of jQuery and step down into that section of code to find out why you aren't getting a transport. It's likely something from the list above, but I've seen so many different posts that I've come to realize that the error is likely due to something specific with your project.

In our case we need custom headers so basically we were out of luck with the XDomainRequest object so we're left with two options:
<ol>
<li>Use something like <a href="http://easyxdm.net/wp/">EasyXDM</a> which is one of the better solutions for handling cross domain requests.</li>
<li>Write a proxy in the Rails app. If CORS isn't supported fall back to a proxy request through the Rails site.</li>
<li>Combine 1 and 2.</li>
</ol>

We're in the process of working on the last one. It's crazy how much extra work is required to support a piece of junk out of data browser. Special thanks to Microsoft for ensuring extra work for developers all over the world.

Update:
<a href="https://github.com/GyldendalDigital/jQuery-EasyXDM">There's a jQuery plugin for easyXDM called jQuery-EasyXDM that includes a ajax transport.</a> I've not yet implemented it in our code but in theory adding it should make cross domain possible when CORS isn't supported.

<a href="https://github.com/Octo-Labs/easyxdm-rails">Here's a gem to add easyxdm to your Rails site.</a>
