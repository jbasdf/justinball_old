---
layout: post
author: Justin Ball
title: "Ember Textfield ignores arrow keys. How to monitor key events in your textfield"
date: 2013-10-24 12:14:33 -0600
tags:
  - Ember.js
  - Javscript
---


<p>Ember provides a text field view that makes generating text input fields pretty simple. What's really cool is with the
  simple addition of onEvent="keyPress" and action="my_function" you can monitor changes to the field as the user types.
  It looks something like this:</p>

<script src="https://gist.github.com/jbasdf/9202528.js"></script>

<p>(On a side note you can also just add an observer to your controller for 'value' and it will be called as the user types in new content.)</p>

<p>Even with all this magic I ran into a scenerio that not handled - I needed to know if the user had pressed the arrow up or down keys. A quick
  dig into the Ember code led me to the Ember.TextSupport mixin. The Ember.TextField view mixes in Ember.TextSupport so you only need to
  create your own textfield view, extend Ember.TextField and override a couple of the methods from Ember.TextSupport. It looks like this:<p>


<script src="https://gist.github.com/jbasdf/9202561.js"></script>

<p>Using your new arrow enabled view then looks like this:</p>

<script src="https://gist.github.com/jbasdf/9202574.js"></script>