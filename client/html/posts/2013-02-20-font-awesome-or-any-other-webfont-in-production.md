---
title: Font Awesome (or any other webfont in production)
author: Justin Ball
layout: post
permalink: /2013/02/20/font-awesome-or-any-other-webfont-in-production/
categories:
  - Programming
---

If you are using [Twitter Bootstrap][1] then it's likely you're also using [Font Awesome][2]. If not you need to check it out.

 [1]: http://twitter.github.com/bootstrap/
 [2]: http://fortawesome.github.com/Font-Awesome/

We ran into a problem after deploying to production that we didn't observe in development - namely that none of the Font Awesome icons would show up under Firefox. [Turns you you need to configure your server to send the proper headers and allow cross domain requests][3]. Also check out [Firefox doesn't allow cross domain fonts][4].

 [3]: http://serverfault.com/questions/186965/how-can-i-make-nginx-support-font-face-formats-and-allow-access-control-allow-o
 [4]: http://www.red-team-design.com/firefox-doesnt-allow-cross-domain-fonts-by-default