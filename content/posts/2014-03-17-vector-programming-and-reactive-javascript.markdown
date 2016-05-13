---
layout: post
author: Justin Ball
title: "Vector Programming and Reactive Javascript"
date: 2014-03-17 11:09:47 -0600
tags:
  - Mountain West Javascript
  - mwjs
  - Javascript
  - Reactive
---
<h2>The Functional Part</h2>
Don't describe how to process the data using a loop instead have your code state what you want to happen.

Use functional concepts to build nice observable streams:

- Map: transform one collection into another.
- Filter: filter one collection into a smaller collection.
- Reduce: take a collection and reduce it into a single result (like inject in Ruby).
- Zip: zip two collections into a single collection.

Reactive programming requires thinking functionaly.

<h2>Observables</h2>

- Turn events into collections.
- Allow you to handle errors in the collection.
- Unsubscribe when the event is done.

<h2>Observable methods</h2>
- merge: combine collections into a collection as each item arrives.
- concatAll: combine collections into a new collection in the order in which they were created. Flatten async requests and resolve race conditions.
- takeUntil: creates a single observable of a source collection and a stop collection. When event from stop collection occurs unsubscribe from source.
- switchLatest: only use the latest collection. Throw out the rest.
- distinctUntilChanged: filters out duplicate occurrences.

<h2>Example</h2>
<p>(from <a href="https://github.com/Reactive-Extensions/RxJS">https://github.com/Reactive-Extensions/RxJS</a>)</p>
<pre><code class="javascript">
/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent($input, 'keyup')
  .map(function (e) {
      return e.target.value;
  })
  .filter(function (text) {
      return text.length > 2;
  });

/* Now throttle/debounce the input for 500ms */
var throttled = keyups
  .throttle(500 /* ms */);

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = throttled
  .distinctUntilChanged();
</pre></code>

<h3>Resources</h3>
- <a href="http://reactive-extensions.github.io/RxJS/">Reactive-Extensions for Javascript</a>
- <a href="http://jhusain.github.io/learnrx/">Learn Reactive Programming</a> by <a href="https://twitter.com/jhusain">jhusain</a>
- <a href="https://hackpad.com/Asynchronous-JavaScript-at-Netflix-j0DqUOf5fCV">Asynchronous JavaScript at Netflix</a>
- <a href="https://hackpad.com/Adding-Even-More-Fun-to-Functional-Programming-With-RXJS-W4be7aCTEjt">Adding Even More Fun to Functional Programming With RXJS</a>
