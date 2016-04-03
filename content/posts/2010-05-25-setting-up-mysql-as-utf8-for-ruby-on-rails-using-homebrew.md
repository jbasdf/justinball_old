---
title: Setting Up mysql as utf8 for Ruby on Rails using homebrew
author: Justin Ball
layout: post
permalink: /2010/05/25/setting-up-mysql-as-utf8-for-ruby-on-rails-using-homebrew/
categories:
  - homebrew
  - mysql
  - mysql gem
  - Ruby On Rails
  - utf8
---
It took me far to much time to get this to work right so hopefully this is helpful for someone (probably me at some point in the future).

The [hashrocket guys have a great writeup on configuring your development environment][1]. I didn't need some of their bash configuration but it's a great starting place.

 [1]: http://blog.therubymug.com/blog/2010/05/20/the-install-osx.html

Once you have mysql installed with homebrew it can still be handy to customize your mysql configuration. [Here's an article on how to configure my.cnf][2].

 [2]: http://darwinweb.net/articles/87

My configuration ended up looking like the code below which I got from this [article][3]. [Here's more info on the values you can specify][4]. I placed the code into '/etc/my.cnf'. That's probably more global than most people want, but it works great for me.

 [3]: http://hugofrappier.wordpress.com/2010/01/01/rails-1-2-x-ruby-1-8-6-snow-leopard-the-missing-link/
 [4]: http://dev.mysql.com/doc/refman/5.0/en/server-system-variables.html

    [mysqld]
    #Max packetlength to send/receive from to server.
    max_allowed_packet=64M
    #socket = /var/mysql/mysql.sock
    character-set-server = utf8
    default-character-set = utf8

    #This option makes InnoDB to store each created table into its own .ibd file.
    innodb_file_per_table

    [mysql]
    default-character-set = utf8

    [client]
    #socket = /var/mysql/mysql.sock
    default-character-set=utf8


Here's how I ended up installing the mysql gem. (Always a pain to get this right).

    sudo env ARCHFLAGS="-arch x86_64" gem install mysql --no-rdoc --no-ri -- --with-mysql-config=/usr/local/bin/mysql_config