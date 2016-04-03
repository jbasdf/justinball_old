---
title: Kill Internet Explorer With CSS
author: Justin Ball
layout: post
permalink: /2008/02/27/kill-internet-explorer-with-css/
categories:
  - House Stuff
  - internet
  - Programming
tags:
  - bugs
  - enterprise
  - Internet Explorer
---

We got a call today at The Plan Collection that was interesting. A guy was trying to print out one of our pages. Each time he tried his browser would crash. At first I thought, "that is just nuts. Html can't crash your browser." Then Jake tried it and it crashed Internet Explorer. Then I tried it and sure enough whenever you try to print a page on [ThePlanCollection.com][1] your browser will crash.

 [1]: http://www.theplancollection.com

I decide to investigate and sure enough Google comes through. [Specific tags in your html code will cause Internet Explorer to crash when you try to print][2].

 [2]: http://meyerweb.com/eric/thoughts/2005/08/26/when-printing-kills/

That same website lists a couple of other [nasty Internet][3] [Explorer bugs][4]. So yes you have to be careful when you write your html code. I would have never guessed that.

 [3]: http://meyerweb.com/eric/thoughts/2004/09/15/emreallyem-undoing-htmlcss/
 [4]: http://meyerweb.com/eric/thoughts/2004/09/16/when-browsers-attack/