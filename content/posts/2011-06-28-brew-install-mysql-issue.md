---
title: Brew Install MySQL Issue
author: Justin Ball
layout: post
permalink: /2011/06/28/brew-install-mysql-issue/
tags:
  - homebrew
  - mysql
  - ruby
---
I ran into a problem while trying to install mysql using homebrew:

    ~/projects/oerglue (master)$ brew install mysql
    ==> Downloading http://downloads.mysql.com/archives/mysql-5.5/mysql-5.5.12.tar.gz
    curl: (7) couldn't connect to host
    Error: Failure while executing: /usr/bin/curl -f#LA Homebrew 0.8 (Ruby 1.8.7-174; Mac OS X 10.6.8) http://downloads.mysql.com/archives/mysql-5.5/mysql-5.5.12.tar.gz -o /Users/jbasdf/Library/Caches/Homebrew/mysql-5.5.12.tar.gz


Basically, the script couldn't find the mysql source code.

Luckily homebrew uses ruby. So fixing the problem was really easy. Just edit the mysql.rb homebrew formula found here:

/usr/local/Library/Formula/mysql.rb

I just changed the url and md5 like so:

    url 'http://mirror.services.wisc.edu/mysql/Downloads/MySQL-5.5/mysql-5.5.13.tar.gz'
    md5 'f0e519e90ee7c00fceb0730edf859d7b'


Then everything worked great. One note, if you want to change the version or use a different mirror for mysql be sure to get the 'Source Code' version of mysql not the Mac version. You can select the platform using the dropdown on the downloads page -