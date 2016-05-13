---
title: 'Babelphish &#8211; yml Translation Made Simple'
author: Justin Ball
layout: post
permalink: /2009/05/19/babelphish-yml-translation-made-simple/
tags:
  - Ruby On Rails
  - babelphish
  - gem
  - localization
---
You've just finished version one of your most excellent, million dollar application. You've built it the right way. All of your application' strings live in the en.yml file neatly tucked into the locales directory patiently waiting for the day when you hit it big, go international and hire a expensive fancy firm to translate your application for the next big market.

Why wait? Impress your friends, your family, and the ladies right now. Today. In just seconds.

With Google Translate and some gem magic your application can now impress your investors in 41 languages. Win friends and influence people in just three simple steps:

    sudo gem install ya2yaml

    sudo gem install babelphish

    babelphish -y ./locales/en.yml -o


Viola! Your application now has a yml file for every language Google supports. -y gives the path to your source file. Feel free to start with other languages es.yml, jp.yml, etc all work just fine. -o means overwrite the files in the directory. If you have already paid someone a lot of money to translate your application I don't recommend using that option.

[In case you think I suck as a programmer feel free to go fork it.][1]

 [1]: http://github.com/jbasdf/babelphish/tree/master