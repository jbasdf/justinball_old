---
title: Delete button != Back button
author: Justin Ball
layout: post
permalink: /2013/02/21/delete-button-back-button/
categories:
  - Internet
---

I'm not sure who decided that the delete button would make a great back button in a web browser but they need to have their keyboard license revoked. 

After filling out a lengthy online form today I messed up some text and thinking that the text field had focus I pressed delete since that's how you delete text. The text field didn't have focus, the browser went back a screen an everything I had entered was lost to digital oblivion.

After finishing a lengthy list of adjectives for the guy who made this UI choice I decided to take control of my life/browser and now my delete button does what it is supposed to - delete stuff.

Should you feel the same here's a five step process for preserving your sanity and the innocence of any ears within twenty feet:

1.  Open a new Firefox window
2.  Enter about:config into the location bar. Press Enter. The about:config page will open. It's a huge list of Firefox configuration properties.
3.  Enter browser.backspace into the filter. This will bring the 'Browser.backspace_action' preference into view.
4.  Contrl-click the 'Browser.backspace_action' Value column, and choose Modify from the pop-up menu, then enter a new value of 2.
5.  Press OK.

[Extracted from a forum post on MacOS Hints.][1]

 [1]: http://hints.macworld.com/article.php?story=20070511123925218