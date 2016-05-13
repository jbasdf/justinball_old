---
title: 'Upgrade to MySQL 5.5.12 and now MySQL won&#8217;t start'
author: Justin Ball
layout: post
permalink: /2011/07/05/upgrade-to-mysql-5-5-12-and-now-mysql-wont-start/
tags:
  - Programming
  - mysql
---
I messed up my local install of MySQL (it's a long story that involves me almost throwing a punch to my 30" monitor). I finally gave up, deleted everything MySQL related according to [these notes][1] and then I used homebrew to do a clean install.

 [1]: http://akrabat.com/computing/uninstalling-mysql-on-mac-os-x-leopard/

After the install I started getting this error:

    ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)


I couldn't figure out what was going on so I checked my logs in /usr/local/var/mysql (in that directory find a file that ends in .err). Here's what I kept seeing over and over again:

    110705 14:33:20 [ERROR] /usr/local/Cellar/mysql/5.5.12/bin/mysqld: unknown variable 'default-character-set=utf8'
    110705 14:33:20 [ERROR] Aborting


Turns out if you upgrade MySQL you'll want to modify /etc/my.cnf. This line causes problems:

    default-character-set = utf8


Remove that and you should be good. For reference here's what my '/etc/my.cnf' file looks like:

    [mysqld]
    max_allowed_packet=64M
    collation-server = utf8_unicode_ci
    init-connect='SET NAMES utf8'
    character-set-server = utf8


As a side note be sure to change max\_allowed\_packet to something like 64M. I was trying to restore a large database and MySQL kept barfing with this error:
ERROR 2006 (HY000) at line 682: MySQL server has gone away

Turns out the default packet size is to small to restore all but the smallest databases.