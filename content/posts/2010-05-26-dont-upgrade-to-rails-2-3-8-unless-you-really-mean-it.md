---
title: 'Don&#8217;t Upgrade to Rails 2.3.8 Unless You Really Mean It'
author: Justin Ball
layout: post
permalink: /2010/05/26/dont-upgrade-to-rails-2-3-8-unless-you-really-mean-it/
categories:
  - ruby
  - Ruby On Rails
---
I just got a new laptop which means re-installing everything. This included Rails and I ended up with 2.3.8. Most of my projects use 2.3.5. I figured no big deal since various Rails versions have always played together in the past. I installed 2.3.5 with gem install rails -v=2.3.5 and figured all would be well.

I would be wrong in that assumption.

Instead of just working anytime I try to run a 2.3.5 app (most of my apps at the moment). I get this:

Missing the Rails 2.3.5 gem. Please \`gem install -v=2.3.5 rails\`, update your RAILS\_GEM\_VERSION setting in config/environment.rb for the Rails version you do have installed, or comment out RAILS\_GEM\_VERSION to use the latest version installed.

So my next step was to uninstall 2.3.8. I still get the error. I uninstalled and then reinstalled Rails and things seem to be working.

Heroku has the answer: .

This is why it's usually a good idea to wait a little while after a Rails update. I have to keep reminding myself of that.