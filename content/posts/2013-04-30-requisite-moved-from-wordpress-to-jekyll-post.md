---
title: Requisite Moved From Wordpress to Jekyll Post
author: Justin Ball
layout: post
permalink: /2013/04/30/requisite-moved-from-wordpress-to-jekyll-post/
categories:
  - Software Development
---

I'm not the <a href="http://weedygarden.net/2012/12/hello-jekyll/">first one</a> <a href="https://github.com/davidsonfellipe/fellipe.com/blob/master/_posts/2013-04-01-moving-wordpress-to-jekyll.md">to make the move</a>
from <a href="http://wordpress.org/">Wordpress</a> to <a href="https://github.com/mojombo/jekyll">Jekyll</a>. While <a href="/2008/02/11/wordpress-makes-me-happy/">I have been a proponent of Wordpress in the past</a> I finally
grew tired of writing my posts in a tiny little box. I grew tired of a slow website (arguably that's Bluehost's fault not Wordpress). Wordpress has all kinds of plugins and more features than I could ever name. It's a great
platform, but there are a couple of little things that festered over the years that finally pushed me to switch. The biggest complaint I had was dealing with source control. I want to be able to make changes to my blog and
<a href="https://github.com/jbasdf/justinball">keep those changes safe in version control</a>. With Wordpress my keeping my code cleanly separated from the Wordpress code is a trick that requires some pain every time I need to
upgrade. It's more cognitive stress than I want to deal with anymore. I like to throw a few photos on up now and then and the upload functionality in Wordpress drives me crazy. I guess some people must like it. Maybe every just deals with it. I hate it.
A cheap host running Wordpress is all kinds of suck. It's slow. You have to remember to patch it or risk being vulnerable to all kinds of security issues. I grew tired of waiting 5 minutes for my edit screen to load.
I'm sure any visitor to this site grew tired of waiting for a page to load. Again, I blame Bluehost. It was cheap. It was junk but when you run Wordpress you need a server and all the cheap hosting solutions are about the same.

Jekyll solves most of my issues. Jekyll is static. It's a back to basics. I almost feel like it's 1999 again. No features. No online editor. Nothing but text and a little bit of markup. It's not for everyone but I write code for a living
and it fits me. Not more media manager. With Jekyll I can just drop files in a folder and link them into the page. Jekyll doesn't process the images, but I don't have to deal with a terrible upload experience.
Hosting is super cheap. In fact my new expenditures make Bluehost look positively expensive. I can drop my pages on S3 for pennies per month. I'm guessing hosting this site on Amazon for the next 10 years will cost less than one month at Bluehost.
It's fast now because it's static html. It's secure more or less because there's nothing to hack. No plugins with vulernabilities. I get to view my posts locally before
sending them up to the server. The process in many ways mimics a very simple development process and as a developer that makes me happy.
