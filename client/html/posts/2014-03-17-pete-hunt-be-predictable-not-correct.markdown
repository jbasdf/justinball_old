---
layout: post
author: Justin Ball
title: "Pete Hunt - Be predictable, not correct."
date: 2014-03-17 09:21:45 -0600
categories:
  - Mountain West Javascript
  - mwjs
  - Javascript
---
Mountain West Javascript starts today. <a href="https://twitter.com/floydophone">Peter Hunt</a>, Facebook developer and contributor to
<a href="http://facebook.github.io/react/">reactjs.org</a> is first up presenting "Be predictable, not correct."

Here's my notes:

Even better: <a href="https://hackpad.com/Secrets-of-the-Virtual-DOM-ULWeSrnO3cF">Notes on Hackpad</a>

<h2>Key Value Observation (KVO)</h2>
This is the pattern that Ember.js implements. Idea is to bind data to elements in the DOM.
The problem is that we have to use units of computation that the platform gives you. This results in leaky abstractions. The developer
has to hold to much information in their head and solutions become complex to implement. Can't compose using primitivies
Angular uses Dirty Checking.

NOT the simpliest way to build things.

<h2>Reactive Design</h2>
In a mythical javascript language we could use Javascript primitives and we would have a reactive DOM.
However, Javascript is not reactive. We do need to build some layer of abstraction. Reactjs built a reactive DOM.
No databinding artifacts. Takes advantage of existing Javascript.

<h3>Virtual DOM</h3>
- Whenever anything may have changed, re-render everything
- Diff the previous data previous with the next
- Only update the DOM with what changed

Avoid fighting the framework. Rerender and diffing feels expensive which is why we do data binding.

- KVO entangles app code with observables.
- Angualr style dirty chcking forces you to pass everything through $scope or $watch
- Virtual DOM needs a signal to say anything may have changed

<h3>Performance</h3>
- Memory is more important for performance on mobile than CPU usage.
- Render code is usually cheap.
- Your view is usually smaller than your model.

<p>Three words:</p>
Simple composable primitives


