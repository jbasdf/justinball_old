---
title: New Uploader Gem
author: Justin Ball
layout: post
permalink: /2009/06/20/new-uploader-gem/
categories:
  - gems
  - Ruby On Rails
  - uploads
---
I just pushed out a new uploader gem. [Get the new code from github][1] or install the gem with sudo gem install uploader. This comes with a few more translations and a fix for a nasty bug. The format was not properly set for uploads via swfupload. Unfortunately, even without the format it worked on uploads from my laptop, but not really for anyone else. I really hate that. At any rate it's fixed now.

 [1]: http://github.com/jbasdf/uploader/tree/master