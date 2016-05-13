---
title: Install RVM on Mac OSX Mountain Lion
author: Justin Ball
layout: post
permalink: /2012/10/22/install-rvm-on-mac-osx-mountain-lion/
tags:
  - Ruby
---
I recently moved over to a new Macbook Pro which is awesome but like every other time I've switched computers there's some serious pain. This time around various changes from Apple including the removal of the command line tools from XCode has [Ruby Version Manager (RVM)][1] a bit more difficult to use. If you aren't using RVM and you work with Ruby you know that it's indispensable and even if it's painful to get things working right it's worth it.

 [1]: https://rvm.io/

In the interest of saving time for myself and hopefully others in the future here's what I ended up doing:

1.  Install XCode and the command line tools. It's a free install from the app store but takes some time to download. After XCode is installed install the Command Line Tools via Xcode Preferences => Downloads
2.  Download and install XQuartz from: http://xquartz.macosforge.org/landing/. After installing XQuartz you'll need to log out/in or just restart.
3.  [Install Homebrew][2]. If you don't have it you should.
4.  Update Homebrew and install required packages:
        brew update
        brew tap homebrew/dupes
        brew install autoconf automake apple-gcc42 tcl libksba


5.  Default to gcc 4.2 by adding this to ~/.profile:
        export CC=/usr/local/bin/gcc-4.2

6.  Install the very latest rvm:
        curl -L https://get.rvm.io | bash


    (There are some fixes in Head that are required as of the date I'm writing this post. They'll probably make it into stable soon.)
    *   Fix ssl problems:
            rvm pkg install openssl


    *   Install Ruby:
        1.9.3:

            rvm install 1.9.3

        In case you want the debugger:

            gem install debugger-linecache -v '1.1.2' -- --with-ruby-include=$rvm_path/src/ruby-1.9.3-p286/


        1.8.7:

            rvm install ruby-1.8.7-p370 --without-tk


        ree:

            rvm install ree-1.8.7-2012.02 --without-tk --without-tcl


 [2]: http://mxcl.github.com/homebrew/