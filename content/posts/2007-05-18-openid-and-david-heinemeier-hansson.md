---
title: OpenID and David Heinemeier Hansson
author: Justin Ball
layout: post
permalink: /2007/05/18/openid-and-david-heinemeier-hansson/
categories:
  - RailsConf
  - RailsConf07
tags:
  - OpenID
  - RailsConf07
  - Ruby On Rails
---

After the Two Revolutions session I had a few minutes to talk to DHH. First I must say he is just a very nice guy. Programmer envy over. I had a discussion about OpenID. It is going to be a critical component of the next rev of our apps. OpenID hasn’t reached a level where it has the same blessing as REST or Atom. David feels that these protocols have one and the Rails team is willing to throw their weight behind them. OpenID will likely remain a plugin for now. After spending some time with the guys developing OpenID it was interesting to get DHH’s perspective. OpenID 2.0 is coming. It has more stuff. More features etc. DHH worries that it will detract from the simplicity.

I also had a conversation about releasing code on edge Rails. 37signals has no problem with it at all. DHH told me to freeze a version, test that and then release. This is a bit of a mind shift from the big frameworks like .net or java. If you release on a beta of either of those you will get fired and maybe sued. Microsoft doesn’t let you release on their framework until they ship unless you are willing to accept a ‘go live’ license.

The other thing we talked to him about was machine to machine authentication. They use basic http authentication over ssl (something DHH talked about in his keynote this morning). This is good to hear. We are working on a service that uses a REST API which will handle machine to machine authentication for all of our apps and which we plan to share with the world.

Anyway if you see DHH he is a great guy, but then most everyone at this conference is. I reiterate that I disagree with Chad Fowler. The Rails community isn’t a bunch of arrogant jerks. This is a friendly open community that loves to share the Ruby love.