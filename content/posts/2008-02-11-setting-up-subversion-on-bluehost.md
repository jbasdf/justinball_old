---
title: Setting up Subversion on Bluehost
author: Justin Ball
layout: post
permalink: /2008/02/11/setting-up-subversion-on-bluehost/
tags:
  - Programming
  - 64bit
  - bluehost
  - subversion
---

I love subversion.  It is handy for all kinds of development.  I needed an easier way to update Wordpress on my Bluehost account.  I tried the standard compile methods but kept running into errors.  The problem I ran into was that the server my account runs on is a 64bit machine.

I gave up until <a href="http://joemaller.com/2008/01/29/how-to-install-subversion-on-a-shared-host/">I found this article on how to fix the 64 bit compile problem</a>.

The key is compiling each library that is part of the subversion-deps download and then telling the compiler where to find them:
<pre><code class="ruby">
cd apr
./configure --enable-shared --prefix=$HOME
make && make install

cd ../apr-util
./configure --enable-shared --prefix=$HOME \
     --with-expat=builtin --with-apr=$HOME \
     --without-berlekey-db
make && make install

cd ../neon
./configure --enable-shared --prefix=$HOME \
     --with-libs=$HOME --with-ssl
make && make install
</pre></code>

then do this:
<pre><code class="ruby">
./configure --prefix=$HOME --without-berlekey-db \
     --with-editor=/usr/bin/vim --with-apr=$HOME \
     --with-apr-util=$HOME --with-neon=$HOME \
     --without-apxs --without-apache
make && make install
</pre></code>