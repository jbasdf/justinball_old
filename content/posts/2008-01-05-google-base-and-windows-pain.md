---
title: Google Base and Windows Pain
author: Justin Ball
layout: post
permalink: /2008/01/05/google-base-and-windows-pain/
tags:
  - Programming
  - Programming
  - The Plan Collection
  - windows
---

So I have been trying to figure out Google Base for the last week so that I can send all the <a href="http://www.theplancollection.com" title="The Plan Collection">house plans from The Plan Collection</a> into the Google product feed.

Getting your products into their feed isn't that hard, but being a programmer and a masochist (they are the same thing you know) I couldn't just generate a feed that had to be submitted by hand.  No one will remember to keep submitting it anyway and since your entries in the products section of Google Base can expire it is important that you continually resubmit your products.

So I wrote a class to handle the Google Base stuff and then I put it into a Windows Service.  I figured as long as I was at it I would also write a service that can write out our site maps at the same time.

The site maps service starts fine.  The Google Base service starts then dies and drops this in the logs:

<pre><code class="ruby">
EventType clr20r3, P1 r3b0434webwhcosy0o40t3c1xyqmvmpy, P2 1.0.0.0, P3 47803796, P4
theplancollectionbackgroundservices, P5 1.0.0.0, P6 47803796, P7 16, P8 3e, P9 system.io.filenotfoundexception, P10 NIL.

For more information, see Help and Support Center at http://go.microsoft.com/fwlink/events.asp.
</pre></code>

Since that message is so very helpful the problem is miserable to solve.  A Google search reveals that <a href="http://blogs.msdn.com/elton/archive/2006/03/06/545090.aspx">I am not the only one with this problem</a>.  <a href="http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=328111&SiteID=1&mode=1">Here is thread where others are feeling the M$ pain.</a>

It appears that this error shows up for a great many reasons.  In my case I first ran the Windows Update to ensure I had the latest .Net framework.  I read that that helped others.  It didn't seem to make a difference.  I am using the Google Base .Net api.  I figured that I had spent enough of the day trying new vulgarities so I ran the SDK installer on the server.  Like magic my service now works.  I don't usually like to run SDK installers on servers so I then removed it and figured that I might need to install the one dll that I am using into the Global Assembly Cache (GAC).  I didn't.  The service still runs just fine.  The installer must leave something behind that keeps let's the service run.  I am betting there is some registry configuration somewhere that was changed and not reverted.

This is one of the most frustrating parts of development.  I would say it is because Windows is terrible or something, but all OSs share this same problem.  On Windows it is the registry on Linux it is dependency hell and on the Mac they pretend to be *nix so a lot of stuff works, but then right when you think you have that latest package ready to compile you find out that the smart boys at Apple decided to change the way something functions or they decided it would be OK to move things around.

Computers are painful.  I am just glad that mine works now.
