---
title: 'ERROR:  While executing gem (ArgumentError)  Illformed requirement'
author: Justin Ball
layout: post
permalink: /2008/10/04/error-while-executing-gem-argumenterror-illformed-requirement/
tags:
  - Ruby On Rails
  - bugs
  - errors
  - gems
  - morph
  - morph exchange
  - Ruby On Railst
---
I like to use  to deploy my applications because of its simplicity. The other nice thing is that they give you free developer space so
if you are just getting an application up and running or just need to show it to a client you can do so without having to pay a bunch of
money and spend a bunch of time setting up a VPS.

There are a few issues now and then. Morph has a large number of gems installed by default but occasionally I use one that they don't have.
Today I ran into this problem. At first I thought no big deal I can just do a **rake gems:unpack** and drop the gems into the project and
then deploy again.

No go.

Instead I get the following error:

<blockquote>
    **ERROR:  While executing gem ... (ArgumentError)
        Illformed requirement [""= 2.2.2""]**
</blockquote>

Turns out there is current a bug in Rails 2.1.0 and 2.2.0 that causes the unpack to barf if you specify a version number. Here's the link:


Since I am using the latest version of all the gems, my solution was to temporarily remove the version numbers from environment.rb.

So this
**config.gem 'ruby-openid', :lib => 'openid', :version => '2.1.2'**
becomes this
**config.gem 'ruby-openid', :lib => 'openid'**

Then I did:
**rake gems:unpack**
and everything worked fine.

Do remember to put the version numbers back when you are done.