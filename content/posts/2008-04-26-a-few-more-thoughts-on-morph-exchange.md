---
title: A Few More Thoughts On Morph Exchange
author: Justin Ball
layout: post
permalink: /2008/04/26/a-few-more-thoughts-on-morph-exchange/
tags:
  - hosting
  - internet
  - deployment
  - hosting
  - morphexchange
---

I am working on a quick Facebook application for a company called Flat World Knowledge. Basically I have 4 days to build the application - it has to be done by Tuesday.
Because of the simplicity of deployment on Morph Exchange I decided to deploy the application on their platform. I don't have time to setup a full Rails deployment environment.

One problem. Facebook applications require access to the Facebook API. I used [rfacebook][1] because that is the library I have used in the past and could quickly get the application done.
([Facebooker][2] is another library worth looking at if you are building a Facebok Application). I deployed the application but it wouldn't start. I did some checking and finally found their deployment log.
Turns out the Facebook gems are not installed. [There is a way to package up your gems into your project][3]. ([This site will help as well][4].)
With the popularity of Facebook applications growing and the need for scalability on demand I would think that having the Facebook gems already in place would be a must for a platform like MorphExchange.
I submitted a ticket yesterday and haven't heard back yet. Hopefully they are responsive. I deployed on Morph for the speed of deployment. The clock is ticking for me.

 [1]: http://rfacebook.rubyforge.org/
 [2]: http://facebooker.rubyforge.org/
 [3]: http://errtheblog.com/posts/50-vendor-everything
 [4]: http://gemsonrails.rubyforge.org/