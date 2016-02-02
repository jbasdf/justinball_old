---
title: jeweler and the empty gemspec
author: Justin Ball
layout: post
permalink: /2009/06/24/jeweler-and-the-empty-gemspec/
categories:
  - gems
  - jeweler
  - Ruby On Rails
---

I've been racking my brain trying to figure out why my gemspec for a new gem had no files in it.  I'm using jeweler to build the gem and it's worked great in the past.  Then I read in the docs that jeweler will include any files in the gemspec that are not in .gitignore and it occurs to me that jeweler is getting the list of files from git.  That means you have to do 'git init' and 'git add .' in order to have any files in your project.

So the next time you are building a gem and you do this:
{% highlight ruby %}
    gemspec.files.include %w(
                            tasks/*
                            db/migrate/*.rb
                            app/**/**/**/*
                            config/*
                            locales/*
                            rails/*
                            test/*
                            lib/**/*
                            public/**/* )
{% endhighlight %}

and you get this:

{% highlight ruby %}
undefined method `include' for []:Array
{% endhighlight %}

Just know that your gemspec doesn't contain any files and you don't actually need the include listed above in your Rakefile.  Instead you just need to add all your files to git.