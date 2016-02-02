---
title: Interesting DRAC 4 problem
author: Justin Ball
layout: post
permalink: /2006/07/25/interesting-drac-4-problem/
categories:
  - The Plan Collection
---

I keep track of a couple of servers that we use for The Plan Collection. We have three Dell servers and each one of them has a DRAC 4 card which is usually a very helpful piece of hardware that let's me manage the machine remotely. All of a sudden one of the cards quit responding to commands. I could see what was going on, but I couldn't control the machine - which defeats the purpose of having the card. After spending forever on the phone with Dell's tech support on three different occasions they finally agreed to replace it. (Dell's server support is usually pretty good, but this time it took way to long for them to just replace the stupid card.) Anyway, something interesting I found out after flashing the firmware on the old card is [a problem I found described here][1]. You must clear out your browser's cache of Java applets when you flash the card or else you run the risk of using an applet that is out of sync with the card. I couldn't even get the applet to load until I read that page and cleared out my cache. Unfortunately, that didn't fix the main problem which was that the card wouldn't respond. The applet did finally load though. Today a tech from Dell replaced the old DRAC card. It took about five minutes which I was happy about and now we are back up and running.

 [1]: http://lists.us.dell.com/pipermail/linux-poweredge/2005-December/023718.html