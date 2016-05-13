---
title: jqXHR Returning Readystate 0 and Status 0?
author: Justin Ball
layout: post
permalink: /2013/02/25/jqxhr-returning-readystate-0-and-status-0/
tags:
  - Programming
  - Javascript
---

I've seen this error a couple of times and I always forget what causes it so for my own sanity I post it here.

If you make an Ajax request and the response comes back with:

  statusText: "error"
  status: 0
  readyState: 0

then you likely have one of two problems:
1. You are making a cross domain request and the browser is shutting you down. Check to see if you can turn on CORS or try using JSONP.

2. Your Ajax request was triggered via a form submit or clicking on a link and you didn't call e.preventDefault() inside of your event handler. The browser will go ahead and submit the form or follow the link and execute your Ajax code. The form submit or the link follow will win and the browser will immediately terminate your request and give you back a readyState 0.

I ran into the second issue with some Backbone code this evening. In my code the user clicks a button (really a link) and that link saves the model back to the server before traversing to the url specified in the anchor. I know you usually want to protect posts with a form POST but in this case I really do want to follow the url in the link but I need to make sure that the resource existed first and create it if it doesn't. (It's complicated).