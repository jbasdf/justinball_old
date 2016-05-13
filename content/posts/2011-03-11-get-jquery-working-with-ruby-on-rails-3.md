---
title: Get jQuery Working With Ruby on Rails 3
author: Justin Ball
layout: post
permalink: /2011/03/11/get-jquery-working-with-ruby-on-rails-3/
tags:
  - jQuery
  - Ruby On Rails
  - jQuery
  - Ruby On Rails
---

I thought I had fixed everything and made ready for Rails 3 in my applications. Turns out I was wrong. My wife tells me I'm wrong all the time so I didn't feel to bad. The first sign was that something bad had happened was that all my delete links stopped working. I found a <a href="http://www.cowboycoded.com/2010/10/28/rails-3-rails-js-document-on-is-not-a-function/">couple of articles</a> talking about the <a href="http://www.themodestrubyist.com/2010/02/24/rails-3-ujs-and-csrf-meta-tags/">new unobtrusive javascript in Rails</a>. 

I have bits of code that look like this:

<pre><code class="ruby">
<%= link_to 'Delete Thing', @thing, :confirm => 'Are you sure?', :method => :delete %>
</pre></code>

I know the argument that you shouldn't use links for delete. In this case the generated anchor tag won't cause you problems so I don't want to hear any whining:

<pre><code class="html">
<a href="/courses/algebra" data-confirm="Are you sure?" data-method="delete" rel="nofollow">Delete Course</a>
</pre></code>

I included rails.js which will turn those links into DELETE requests for the server. However, I started seeing this error in Firebug on Firefox:
<pre><code class="ruby">
document.on is not a function
</pre></code>

I also got this in Google Chrome:

<pre><code class="ruby">
Uncaught TypeError: Object #<HTMLDocument> has no method 'on'
</pre></code>

Turns out that since I use jQuery I needed to get the rails.js file for jQuery. There's a gem that wraps it up:
https://github.com/rails/jquery-ujs

You can also just get the javascript and dump it in rails.js:
<a href="https://github.com/rails/jquery-ujs/raw/master/src/rails.js">https://github.com/rails/jquery-ujs/raw/master/src/rails.js</a>

Now I can be happy again.