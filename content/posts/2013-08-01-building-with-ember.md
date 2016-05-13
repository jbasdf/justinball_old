---
title: Building with Ember
author: Justin Ball
layout: post
tags:
  - Javscript
  - Ember.js
---

<p>We're currently building a couple of projects for a group at MIT and for a current Techstars company in the Kaplan program which has given us a chance to try out ember.js on real projects.
  Ember is an incredible framework started by two really smart guys Yehuda Katz Tom Dale. It's new and it's hot which also means that it's still a bit rough around the edges. However,
once you get past a few of the gotchas it's an amazing framework that saves you a lot of time.</p>
<p>So far programming with ember.js has been a great experience. Here's a few notes/issues that I've run into in case this helps someone else:</p>

<h3>Be careful what event names you chose inside of your actions.</h3>
<p>This one drove me crazy for quite a while. I had the following action setup in a view:</p>
  <pre><code class="html">
    &lt;a href=&quot;#&quot; {{action &#039;destroy&#039;}} class=&quot;btn&quot;&gt;Delete&lt;/a&gt;
  </pre></code>
<p>I wanted the action to bubble up to the route. However, when I clicked on the link nothing happened. That was confusing so I added a 'destroy' method to my controller.
  I really wanted to handle the event in the route not the controller so I spent way to much time trying to hack around things to no avail. The really
  strange thing was that ember.js will complain if you don't handle your events. Deleting my event handler from the controller and from the route didn't yield an error. That's when
  I realized the route handles the 'destroy' event. I changed my code to the following and it all worked:
</p>
  <pre><code class="html">
    &lt;a href=&quot;#&quot; {{action &#039;destroy_node&#039;}} class=&quot;btn&quot;&gt;Delete&lt;/a&gt;
  </pre></code>
<p>Now I have a destroy_node event handler in my route and everything is happy.</p>
<p>I remember going through the same struggle years again when I first learned Ruby on Rails. 'destroy' is a great name for an event which is probably why Ember uses it. With any framework
  you have to be careful about naming your events, methods and variables. There might be some documentation on reserved words but I've not come across it. This is one of the gray areas
  where time and experience will give you a "feel" for the framework.</p>

<h3>Set an explicit controller inside your ember routes.</h3>
<p>Here's another one that should be easy to do, but as it turns out I couldn't find any documentation. Ember does a lot of magical things for you which is great.
  However, sometimes you need to work around the magic. You will feel some pain when that time comes. I ended up reading the code to figure out that you can
  explicity set the controller for your route. This should be simple and it is but it should also be spelled out in the documentation. Here you go:</p>
<pre><code class="javascript">
var ThingEditRoute = Ember.Route.extend({
  controllerName: 'thing',
  renderTemplate: function(controller, model){
    // You have to pass the controller to render or it will generate a new controller
    this.render({ controller: controller, into: 'application', outlet: 'modal' });
  }
});
</pre></code>
<p>Now you'd think that just setting the controllerName would be enough, but you'd be wrong. If you also call renderTemplate you MUST pass in the controller or else
ember will build you a new one. Why I don't know, but event handlers my 'thing' controller were never called by actions in the view.</p>

<a id="select_doesnt_work"></a>
<h3>Ember Select doesn't work</h3>
<p>
  Well it sort of doesn't work. We're using ember-tools which uses an older version of handlebars. <a href="https://github.com/wycats/handlebars.js/issues/547">Unless you are using handlebars 1.0.0 you will get
  'Uncaught TypeError: Object #&amp;lt;Object&amp;gt; has no method 'merge'</a>. We're using <a href="https://github.com/rpflorence/ember-tools">Ember Tools</a> in the MIT projects and it turns out that Ember Tools is
  stuck on an older version of handlebars. I did try to update but ran into some issues. For that reason we switched over to the <a href="https://github.com/emberjs/ember-rails">ember-rails gem</a> for
  our latest project. I really like the default application structure that Ember Tools generates, but it was more important that we were able to get the latest working code without having to dig into the
  tools and make a bunch of changes.
</p>


<h3>That super awesome ember.js tutorial is probably out of date.</h3>
<p>Ember is moving fast which is great, but it also means that everything is subject to change. Just be careful to check the date on any Ember.js tutorial you come across. If it's not from the past few
months then you might want to keep looking since things have likely changed.</p>

<a id="error_messages"></a>
<h3>Error messages and debugging are painful.</h3>
<p>The magic that powers ember.js is awesome while it is working. When it fails though you will have a lot of 'fun' debugging it.</p>

<p>We have a number of transitions in the application. At one point we do this:<p>
<pre><code class="javascript">
var map = MapModel.createRecord({
  title: 'New Map'
});
map.save().then(function(){
  this.transitionTo('map', map);
}.bind(this));
</pre></code>

That code looks like it should just work but the console would fill with errors like this:

<blockquote>
Assertion failed: Cannot call get with 'id' on an undefined object. application.js?body=1:16925
Uncaught TypeError: Cannot read property '__ember1375726885234_meta' of undefined
</blockquote>

<p>I debugged down into the code. I put console.log all over. I got no where. Then I realized that in the past and in other routes when I call transitionTo I was relying on the fact that
the current transition would automatically abort. However, in the case of the code above the transitionTo wasn't called until the promise completed. The result was the completion of an invalid transition followed
almost immediately by a second transition that totally confused the router. Calling "transition.abort();" before the code above solved the problem. This was a total newb mistake, but it illustrates how debugging
in the world of Ember.js can be painful.</p>

<a id="error_messages_too"></a>
<p>In another instance I started seeing an error that looked pretty much like the error above:</p>

<blockquote>
Assertion failed: Cannot call get with 'id' on an undefined object. application.js?body=1:17079
Uncaught TypeError: Cannot read property '__ember1375989556474_meta' of undefined application.js?body=1:18391
Trying to get configured shortcut getDocumentSelection.js:51
Assertion failed: Emptying a view in the inBuffer state is not allowed and should not happen under normal circumstances. Most likely there is a bug in your application. This may be due to excessive property change notifications.
</blockquote>

<p>This time I thought I was prepared having seen the error before. Turns out that in this case previous knowledge was a hinderance rather than a help. In desperation I started deleting code from my templates since
I had read that others had run into problems with their handlebars code. I lucked out and that was the solution. I had a link in my main code that looks like this:</p>

<pre><code class="html">
  <li>{{#linkTo 'map.destroy' title="Delete the current map"}}<i class="icon-trash"></i> Delete{{/linkTo}}</li>

</pre></code>

<p>That code looks innocent but 'map' isn't always defined which causes the assertion failure above. I realize that I ember isn't to blame for my stupid mistake, but when you are learning a new framework
errors like the one above are extremely confusing. They don't really point to a specific piece of code so they are difficult to debug. Try asking a question on Stackoverflow or IRC to resolve the problem.
Generating a jsbin is almost impossible since the error can live anywhere in your code. You are on your own in these cases. Basically try deleting some code and see if it goes away. If you are lucky you can
narrow down the problem that way until you locate the real culrpit.</p>

<a id="error_messages_again"></a>
<p>And yet again in a totally different situation I get a similar error:</p>

<blockquote>
Assertion failed: Cannot call get with 'id' on an undefined object. ember.js?body=1:364
Uncaught TypeError: Cannot read property '__ember1377186615643_meta' of undefined ember.js?body=1:1676
Assertion failed: Emptying a view in the inBuffer state is not allowed and should not happen under normal circumstances. Most likely there is a bug in your application. This may be due to excessive property change notifications. ember.js?body=1:364
Uncaught Error: You cannot modify child views while in the inBuffer state ember.js?body=1:18835
</blockquote>

<p>My favorite part is "Most likely there is a bug in your application". In case the fact that nothing was rendered on the page didn't clue me in I also need ember to tell me I'm an idiot. I'd be OK with that if it gave
me some hints as to how/where I was being stupid, but it doesn't. I get an error that basically says go look through your code and figure it out.</p>
<p>This time around here's the problem (again newb mistake, but give us new guys some hints/helps).</p>
<p>Had previously built a loop in my handlebars like this and it worked fine:</p>

<pre><code class="html">
  {{#each user.posts}}
    <li>{{#linkTo 'posts.show' title="View post"}}{{name}}{{/linkTo}}</li>
  {{/each}}

</pre></code>

<p>I then tried this in a different bit of code and got the error:</p>

<pre><code class="html">
  {{#each post in Posts}}
    {{#linkTo 'posts.show' title="View post"}}{{post.name}}{{/linkTo}}
  {{/each}}

</pre></code>

<p>If you've spent much time with ember/handlebars the error isn't hard to spot but it threw me. It would be awesome if the error messages would direct you to the point of stupidity. The only difference in the
working code below is the addition of 'post' after 'posts.show'. In the first loop above the context is the post. In the second loop the context remains the parent context. In the first case we just link to 'this' since
we've changed contexts. In the second loop we have to tell the linkTo the correct thing to link to:</p>

<pre><code class="html">
  {{#each post in Posts}}
    {{#linkTo 'posts.show' post title="View post"}}{{post.name}}{{/linkTo}}
  {{/each}}

</pre></code>

<p>There's a lot of whine in the list above along with a lot of newbie mistakes. Ember is still pre-release, but don't let that scare you off. If you can work through the intial learning
curve it's going to save you a lot of time.</p>

<h3>Other Stuff</h3>
<a href="http://blog.embed.ly/post/56537323314/building-apps-with-ember-a-postmortem?utm_source=javascriptweekly&utm_medium=email">Here's another post Mortem blog post for ember.js</a>

<p>The guys in the emberjs irc room on freenode are awesome. If you have questions they will make you believe in the goodness of programmers everywhere.</p>

