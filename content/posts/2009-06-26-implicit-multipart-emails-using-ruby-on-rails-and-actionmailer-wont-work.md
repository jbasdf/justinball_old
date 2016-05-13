---
title: 'Implicit multipart emails using Ruby on Rails and ActionMailer won&#8217;t work'
author: Justin Ball
layout: post
permalink: /2009/06/26/implicit-multipart-emails-using-ruby-on-rails-and-actionmailer-wont-work/
tags:
  - Funny
  - email
  - Ruby On Rails
---
I've been beating my head against the wall trying to figure out why html emails from my Rails Engine are sent out as plain text ie the email shows up with all the html tags visible.  Turns out there is an issue in Rails 2.3.2:

<a href="https://rails.lighthouseapp.com/projects/8994/tickets/2263-rails-232-breaks-implicit-multipart-actionmailer-tests">https://rails.lighthouseapp.com/projects/8994/tickets/2263-rails-232-breaks-implicit-multipart-actionmailer-tests</a>.
For now I'm just setting my emails to html, but I'm hoping to find either a monkey patch or a Rails update that fixes the issue
