---
title: 'Mozy.com&#8217;s Backup Software is Shit'
author: Justin Ball
layout: post
permalink: /2008/02/22/mozycom-and-their-backup-software-is-shit/
categories:
  - Computers
  - Programming
tags:
  - backup software
  - mozy
  - servers
  - windows
---

Yes you read that right. I used to love this company. The concept is great - backup your data online for dirt cheap. Install the software and away you go. They backup everything and even encrypt your data for security. You get cheap backups and they get a little bit of money. I thought this was the total bomb so I installed in on my server. My live server. My live Windows server. I am such a moron.

The first problem I ran into was a full temp directory on my main drive. Windows servers don't like that at all so I get in touch with their tech support and they tell me to change my environment variables and point the temp drive somewhere else. I figure that is an OK solution so I point the temp folder to a dedicated drive with 20 Gigs of free space. A few days later I start getting warnings that the disk is low on space. "That is odd," I think, but I am busy and kind of lazy and I will get to it later. Why worry? My data is backed up.

I deploy a new copy of my website ([ThePlanCollection.com][1]) with all kinds of new features. Luckily it is 1 am so the only one surfing the site are hackers in Czechoslovakia. The site dies and gives all kinds of strange errors. I stare at the errors for a minute and then realize that the .Net framework can't do its just in time compiling thing.

 [1]: http://www.theplancollection.com/ "Website that sells house plans"

What could possibly cause that?

I look at my dedicated 20Gig temp directory. Mozy HAS FILLED THE ENTIRE THING WITH TEMP CRAP. All I can figure is that they make backups cheap by using your drive to backup somebody else's stuff. For a few moments I imagine my server's hard drive filling up with some kid's porn. Why on earth do I need 20Gig of space on my drive to backup 20 Gig worth of stuff? If I wanted to use 20Gig of my own space I could just save the money and backup my stuff to my own damn drive.

Who the hell wrote this code?

What's worse is that you can't just delete some of the junk in your temp directory. You have to uninstall their software then reboot - yes reboot your live server.

Once the scourge know as Mozy was off my box everything worked fine. My website came right up.

Thank you Mozy for taking down my server.