---
title: More Ruby Conference
author: Justin Ball
layout: post
permalink: /2008/03/29/more-ruby-conference/
tags:
  - mtnwestrubyconf
  - Ruby On Rails
  - engineyard
  - mtnwestrubyconf
  - ruby
  - Ruby On Rails
  - test-spec
---

We missed the first talk this morning (sorry Devlin we suck). I slept till 9:30, but mainly because we were up till 4am. [Dave South][1] gave me some great info on using TestSpec. RSpec seems to be the hot thing right now, but I like how TestSpec is lightweight:

 [1]: http://appeddesign.com/apropos

Install the gem:
sudo gem install test-spec

Install the plugin:
./script/plugins install http://svn.techno-weenie.net/projects/plugins/test\_spec\_on_rails/

Require in test_helper:
require 'test/spec/rails'

I spent a good part of last night rewriting some tests to use TestSpec. I also eavesdropped on a conversation the guys from EngineYard were having. They are showing their leadership in the Ruby community by sponsoring Rubinius, merb, and Datamapper, but when you listen to how knowledgeable their team you realize that they are going to play a large leadership role in the Ruby community going forward. They are awesome.