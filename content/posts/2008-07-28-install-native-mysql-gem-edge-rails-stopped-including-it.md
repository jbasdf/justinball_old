---
title: 'Install Native MySQL Gem &#8211; Edge Rails Stopped Including It'
author: Justin Ball
layout: post
permalink: /2008/07/28/install-native-mysql-gem-edge-rails-stopped-including-it/
tags:
  - Ruby On Rails
  - gems
  - mysql
  - Ruby On Rails
---

I decided to try out the latest edge Rails and I started getting this error:
<pre><code class="ruby">
!!! The bundled mysql.rb driver has been removed from Rails 2.2. Please install the mysql gem and try again: gem install mysql.
/!\ FAILSAFE /!\  Mon Jul 28 22:58:38 -0600 2008
  Status: 500 Internal Server Error
  dlopen(/Library/Ruby/Gems/1.8/gems/mysql-2.7/lib/mysql.bundle, 9): Library not loaded: /usr/local/mysql/lib/mysql/libmysqlclient.15.dylib
  Referenced from: /Library/Ruby/Gems/1.8/gems/mysql-2.7/lib/mysql.bundle
  Reason: image not found - /Library/Ruby/Gems/1.8/gems/mysql-2.7/lib/mysql.bundle
</pre></code>

At first I tried:
<pre><code class="ruby">
 sudo gem install mysql
</pre></code>

which of course didn't work because it never works.  You have to tell the complier where to find stuff.  Do this:

<pre><code class="ruby">
sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
</pre></code>