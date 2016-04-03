---
title: 'Quick Note: use rake to install Rails 2.0'
author: Justin Ball
layout: post
permalink: /2007/12/09/quick-note-use-rake-to-install-rails-20/
categories:
  - Ruby On Rails
tags:
  - rails 2.0
  - rake
  - Ruby On Rails
---

I am adding this so I don't forget. You can install Rails 2.0 using this:

rake rails:freeze:edge TAG=rel_2-0-1

Then if you want to keep up the with the latest edge version you can just do the standard:
rake rails:freeze:edge