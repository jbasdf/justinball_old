---
layout: post
author: Justin Ball
title: "Nasty React React-Router initialization bug"
date: 2015-09-16 17:46:24 -0600
categories:
  - Programming
  - React
---

<p>Over the past few days I've been tracking down a nasty bug in a <a href="https://facebook.github.io/react/">React</a> application. It's the kind of bug that manifests rarely in development
but shows up enough on production that users hate you for it. At first we couldn't reproduce it which means we couldn't fix it. Then by luck and frustration I was typing
as quickly as I could to run the 400th test and found that typing a new url really fast caused the browser to reload new content before it was finished loading previous content
and boom everything broke. Specifically in this application the login is not handled by React. I would log in and before the browser had a chance to render the resulting page I typed in
the url of the React application. This combination was enough to result in a console filled with these errors:</p>

<p>This error shows up once:</p>
<blockquote>
Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.
</blockquote>

<p>This error shows up many, many, many times:</p>
<blockquote>
Warning: ReactMount: Root element has been removed from its original container. New container:
</blockquote>

<p>You get a couple of these:</p>
<blockquote>
Uncaught Error: Invariant Violation: findComponentRoot(..., .0.2.0.0.0.0.1.0.0): Unable to find element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to 
forgetting a &lt;tbody&gt; when using tables, nesting tags like &lt;form&gt;, &lt;p&gt;, or &lt;a&gt;, or using non-SVG elements 
in an &lt;svg&gt; parent. Try inspecting the child nodes of the element with React ID ``.
</blockquote>

<p>
I see errors like these frequently as we build React applications. They aren't particularly helpful at pointing to the exact code where the problem lives. However, the combination of the errors
points to the problem - if not the cause of the problem:
<ol>
  <li>There was a node in the DOM. React put it there.</li>
  <li>Something terrible happened.</li>
  <li>React can no longer find a parent DOM element, in our case that's the root element, and so everything is broken.</li>
</ol>
</p>

<p>The big clue is "Root element has been removed". The root element looks like this:
{% highlight html %}
  <div id="thing" data-reactid=".1">
{% endhighlight %}
React was expecting "data-reactid" to be .0. You know that because of the "Invariant Violation" error. React is looking for ".0.2.0.0.0.0.1.0.0". The .0 at the beginning says the root
element should have "data-reactid=.0" but it equals .1.
</p>

<p>
The application has a bit of code like this that renders directly into document.body:
{% highlight javascript %}
Router.run(Routes, (Handler, state) => {
  React.render(<Handler />, document.body);
});
{% endhighlight %}
I've seen that in plenty of examples so it seems harmless. The body is empty except for a couple of script tags for loading the React application.
<p>

<h3>The Fix</h3>
<p>
We added a root div element and tucked it in after some of init scripts but before the react code:
{% highlight html %}
  <script type="text/javascript">
  // Some initialization stuff
  </script>
  <div id="main-app"></div>
  <script src="web_pack_bundle.js" type="text/javascript"></script>
{% endhighlight %}

Change the router initialization:
{% highlight javascript %}
Router.run(Routes, (Handler, state) => {
  React.render(<Handler />, document.getElementById("main-app"));
});
{% endhighlight %}

Now things work.
</p>

<p>A couple of other people of run into the same problem:
  <ul>
    <li><a href="https://github.com/cvan/taro/issues/28">https://github.com/cvan/taro/issues/28</a></li>
    <li><a href="https://github.com/yuanzong/fluxer/issues/1">https://github.com/yuanzong/fluxer/issues/1</a></li>
  </ul>
</p>





