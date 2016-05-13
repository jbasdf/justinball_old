---
title: 'Ruby gems and &#8220;Couldn&#8217;t get release_id, upload failed?&#8221;'
author: Justin Ball
layout: post
permalink: /2009/05/30/ruby-gems-and-couldnt-get-release_id-upload-failed/
tags:
  - Funny
  - gem
  - jeweler
---
I've been experimenting with Ruby gems over the past few weeks. I use a couple of other gems to make the process easier including [rubyforge][1], [jeweler][2] and [newgem][3].

 [1]: http://rubyforge.org/projects/codeforpeople
 [2]: http://github.com/technicalpickles/jeweler/tree/master
 [3]: http://newgem.rubyforge.org/

Jeweler has a rake task 'rubyforge:release' that uploads your gem for you. The problem was that it would timeout and give me "Couldn't get release_id, upload failed?". I assumed that I had configured something wrong so I tried to upload the file directly to rubyforge. That didn't work either so I assumed (wrongly) that my project had something wrong with it. I was about to give up when I decided to check my gem size. It was 100MB!

Somehow I was packaging the gem inside itself on each release and it had grown into a beast. So if your release is timing out check your gem size and make sure it isn't going nuts.