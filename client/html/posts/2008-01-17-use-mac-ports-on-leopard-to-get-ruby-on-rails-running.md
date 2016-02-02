---
title: Use Mac Ports on Leopard to get Ruby on Rails Running
author: Justin Ball
layout: post
permalink: /2008/01/17/use-mac-ports-on-leopard-to-get-ruby-on-rails-running/
categories:
  - Programming
  - Ruby On Rails
tags:
  - leopard
  - Mac Ports
  - Ruby On Rails
---

I am stealing this from [Dave South][1], [Logan Ruby User Group][2] Illuminati. If I don't extract it from my email I'll never find it again. So I'll ask for Dave's forgiveness for the blatant plagiarism.

 [1]: http://www.appeddesign.com/apropos
 [2]: http://groups.google.com/group/loganrb

Install MacPorts, first:

http://www.macports.org

Be sure to put /opt/local/bin and /opt/local/sbin in your path.

PORT programs to install:
sudo port install mysql5 server
sudo port install ImageMagick
sudo port install ruby
sudo port install rb-rubygems
sudo port install rb-termios
sudo port install rb-mysql

Update GEM:
sudo gem list -r
sudo gem update --system

GEMs to install:
sudo gem install rake
sudo gem install rails
sudo gem install capistrano
sudo gem install mongrel
sudo gem install redgreen
sudo gem install test-spec
sudo gem install RedCloth
sudo gem install pdf-writer
sudo gem install ZenTest
sudo gem install mini_magick
sudo gem install ruby-debug

Remember to install the mysql startup. Also, I add a mysql link in /
opt/local/bin similar to the mysql5 link.

To initialize the mysql database:
sudo mysql\_install\_db5 --user=mysql

To install the mysql5 startup:
sudo launchctl load -w /Library/LaunchDaemons/org.macports.mysql5.plist

To link mysql to the correct binary:
cd /opt/local/bin
ln -s ../lib/mysql5/bin/mysql mysql