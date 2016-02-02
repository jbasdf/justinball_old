---
title: 'In javascript string replace doesn&#8217;t do what you think it does'
author: Justin Ball
layout: post
permalink: /2011/01/20/in-javascript-string-replace-doesnt-do-what-you-think-it-does/
categories:
  - Javascript
  - global
  - regular expressions
  - replace
---
When doing a string replace in javascript if you try something like this:

    var str = 'test';
    str.replace('t', 's');


You'll find that the result is:

    sest


The replace method in javascript is not a global replace. Instead it does a single replace and moves on.

If you want to do a global replace try using a regular expression instead:

    var str = 'test';
    str.replace(/t/g, 's');


the result will be:

    sess


The reason for that is the 'g' hanging of the end of the expression /t/g. That tells javascript that the replace should be global.