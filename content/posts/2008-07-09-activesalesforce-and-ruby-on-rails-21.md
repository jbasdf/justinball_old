---
title: 'ActiveSalesforce and Ruby on Rails > 2.1'
author: Justin Ball
layout: post
permalink: /2008/07/09/activesalesforce-and-ruby-on-rails-21/
tags:
  - Ruby On Rails
  - activesalesforce
  - bugs
  - helps
  - Ruby On Rails
  - Salesforce
  - tips
---

We have to do an integration with Saleforce for a Rails project we are working on. I keep getting this error:

The :dependent option expects either :destroy or :delete (:nullify)

I [posted to the Salesforce forums][1] and didn't get any response so I did some more investigation. Turns out there is a bug and a patch:

 [1]: http://forums.sforce.com/sforce/board/message?board.id=PerlDevelopment&message.id=3279

http://rubyforge.org/tracker/index.php?func=detail&aid=19960&group_id=1201&atid=4729

Lucky for me the latest version of Rails has a feature that unpacks all of your gems into your vendor directory. I unpacked activesalesforce, made the code changes by applying the patch (which just removes :dependent => :nullify) and viola.