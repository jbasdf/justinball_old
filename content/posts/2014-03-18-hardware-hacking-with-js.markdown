---
layout: post
author: Justin Ball
title: "Hardware Hacking with JS"
date: 2014-03-18 10:46:29 -0600
tags:
  - Mountain West Javascript
  - mwjs
  - Javascript
---
With the Cache Maker club we're always looking for ways to make it easier for kids to interact with hardware. Traditionally, interacting with hardware meant learning assembly or if you picked the right platform you could write embedded C. Today things are different.

With Arduino we have an open source hardware platform with libraries in your favorite language. Javascript is an approachable language. Put the two together and kids can program hardware.

That's why "Hardware Hacking with JS" with <a href="http://jamisondance.com/">Jamison Dance</a> (<a href="https://twitter.com/jergason">@jergason</a>) was so awesome.

<a href="https://hackpad.com/Hardware-Hacking-for-JS-Developers-enBfwkN103s">Here's the hackpad notes</a>

- <a href="https://github.com/rwaldron/johnny-five">Johnny Five</a> - node library to communicate via usb port to hardware device
- Arduino boards have a bunch of pins you can read from or write to - get a 1 or a 0
- You can set up callbacks for every time a pin is on
- <a href="https://github.com/andrew/node-xbox-controller">Node Xbox Controller</a> - let's you bind to events coming from an xbox controller
- <a href="https://github.com/jergason/hardware-hacking-mwjs-2014">Slides and code from the presentation.</a>

Here's Jamison flying a parrot drone using an xbox controller via node.js:

<iframe width="560" height="315" src="//www.youtube.com/embed/kWVEjbvx6Tg" frameborder="0" allowfullscreen="true"></iframe>
