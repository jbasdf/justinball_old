---
title: CMS Lite Gem
author: Justin Ball
layout: post
permalink: /2009/05/08/cms-lite-gem/
categories:
  - Ruby On Rails
tags:
  - cms
  - gem
  - Ruby On Rails
---
A pretty common problem when developing a Rails application or any web application for that matter is how to deal with content. I've often run into situations where the content development team is familiar with html and can produce reasonable content markup. Since you are going to go to all the effort and spend all the money search engine optimization (SEO) in the form of reasonable urls would be nice as well.

Enter CMS Lite.

I've just finished up a gem that makes it simple to keep the content out of the app directory and thus ensure your content developers don't have to worry about messing up code. (You can however use Ruby code in the content pages).

CMS Lite is a gem built specifically for a Rails application. You can find the code and instructions on usage here:
 or install the gem:
sudo gem install jbasdf-cms-lite

I'm hoping to have a rubyforge project soon which will mean you will be able to install the gem this way:
sudo gem install cms-lite

Just give me a few days and I'll update the post when that happens.