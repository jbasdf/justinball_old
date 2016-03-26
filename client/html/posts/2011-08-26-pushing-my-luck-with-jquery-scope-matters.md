---
title: Pushing my luck with jQuery. Scope matters.
author: Justin Ball
layout: post
permalink: /2011/08/26/pushing-my-luck-with-jquery-scope-matters/
categories:
  - Javascript
  - jQuery
---

<a href="http://www.oerglue.com" title="OER Glue" target="_blank">OER Glue</a> makes heavy use of jQuery. We're currently working on a proxy version of the technology that won't require installing a browser plugin. It's pretty cool.

One of the biggest challenges for us has been ensuring consistent look, feel and operation of our technology across any possible website on the Internet. That's not a small challenge. A key to making everything work is to not stomp on anything the web page is already doing. We use jQuery and so do a lot of page on the Web. That means we have to carefully load the version that we use (since lots of sites use old versions) and then put everything back. A call to noConflict make this possible:
<pre><code class="javascript">
oerglue_jquery = window.jQuery.noConflict(true);
</pre></code>

That magic doesn't come without costs. We don't use any jQuery plugins because it's not likely they will work with our scoped version of jQuery. I also ran into an interested problem with class selectors. For some reason jQuery class selectors for the oerglue_jquery object return an empty array on the MIT OCW site. However, for some reason they work fine on other sites. I found the problem a bit baffling and honestly I don't know the cause. I'm hoping someone smarter than me can expose my jQuery ignorance.

In the mean time I have a cool solution that comes with a performance boost. In the MIT OCW case selectors by id return a value. That means I can first get the OER Glue toolbar container by its id. I then pass that as the scope to the jQuery selector that uses classes and like magic everything works. The side benefit is that adding scope makes your selectors faster since jQuery won't have to traverse the entire DOM.

That brings up a good point. Always scope your jQuery selectors and use ids where possible.