---
layout: post
author: Justin Ball
title: "Bringing the Web Back to the Blind with Ryan Florence"
date: 2014-03-17 15:49:58 -0600
categories:
  - Mountain West Javascript
  - mwjs
  - Programming
  - accessibility
---
<a href="http://ryanflorence.com/">Ryan Florence</a> presenting "Bringing the Web Back to the Blind".

Probably the biggest accessiblity resource on the web: <a href="http://webaim.org/">webaim.org</a>.

<h2>Accessiblity</h2>
Accessiblity is more than just alt tags. You still want alt tags but there's more.

Use your headers for organization of content rather than for visual display. It helps blind users navigation through
the content based on its importance.

<h2>Landmarks</h2>
Use the role tag on elements. For example:
<pre><code class="html">
<div role="main"></div>
</pre></code>

Adding 'role="main"' provides a 'landmark' in the page that a screen reader can find. A blind user can use these landmarks
to quickly navigate to specific sections of the page.

Html 5 includes a 'main' tag as well as others like 'article' that screen readers can use as landmarks.

<h2>Screen Reader Specific Content</h2>
Use css to hide text that is important for screen readers. Create a 'visually-hidden' css class then include
additional information to to describe the element. For example, developers frequently use an 'x' to close a modal
or other window. The screen reader will read this as 'times'. We can add additional information indicating that the
link/button will close the window.

Screen readers will execute Javascript!

<h2>ARIA</h2>
Add screen reader specific text with an attribute:
<blockquote>
aria-label="A close button"
</blockquote>

Tell the screen reader to ignore an element with:
<blockquote>
aria-hidden="true"
</blockquote>

<a href="http://www.w3.org/WAI/intro/aria">WAI ARIA</a> is a specification that defines how to make your website more accessible.

Aria attributes that can be used with tabs:

 - aria-selected
 - aria-controls
 - aria-expanded

However, if you don't know how to use 'aria' then don't. You'll probably make things worse.

We frequently think of Visual Interaction Design. Consider "Audible Interaction Design". Try out a screen reader and
see what it's like to use your website without the visual UI.



