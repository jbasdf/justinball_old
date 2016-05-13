---
title: 'The Inflector Module &#8211; Another Reason to Love Rails'
author: Justin Ball
layout: post
permalink: /2008/01/11/the-inflector-module-another-reason-to-love-rails/
tags:
  - Programming
  - Ruby On Rails
  - Ruby On Rails
---

I love how when you need something in Rails the solution is usually already in place.  For instance in the <a href="http://apps.facebook.com/indulgences/">indulgenc.es</a> application I have the need to create a rank with 1st, 2nd, 3rd etc.  In most frameworks you would have to write this functionality yourself or if you are very lucky you might find something on the Internet.  In Rails you do this:
<pre><code class="ruby">
number.ordinalize
</pre></code>

Then 1 becomes 1st, 2 becomes 2nd, 1233 becomes 1233rd etc.

I am still smiling