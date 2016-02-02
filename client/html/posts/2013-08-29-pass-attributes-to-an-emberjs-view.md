---
title: Passing a value to ember.js view from handlebars template
author: Justin Ball
layout: post
categories:
  - Javscript
  - Ember.js
---


<p>This is one of those things that should be easy and it's probably obvious to most people but it threw me for a while.
I wanted to pass a value into my ember.js view at the moment that I declare the view. It's a static value, just a css class
name, so it doesn't need to be bound to anything. Turns out it's really not that hard:</p>

<p>Add a property to your view:</p>
{% highlight javascript %}
App.ModalView = Ember.View.extend({
  aClassName: 'modal'
});
{% endhighlight %}

<p>When you use the view just set the property:</p>
{% highlight html %}
{% raw %}
{{#view App.ModalView aClassName="wide_modal"}}
  Some great content goes here
{{/view}}
{% endraw %}
{% endhighlight %}

<p>Use the value in your template:</p>
{% highlight html %}
{% raw %}
  <div {{bindAttr class="view.aClassName"}}>
    More stuff here
  </div>
{% endraw %}
{% endhighlight %}