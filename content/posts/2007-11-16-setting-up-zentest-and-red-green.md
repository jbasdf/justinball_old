---
title: Setting up ZenTest and Red Green
author: Justin Ball
layout: post
permalink: /2007/11/16/setting-up-zentest-and-red-green/
categories:
  - Programming
  - Ruby On Rails
tags:
  - red green
  - Ruby On Rails
  - testing
  - zentest
---
I can't take credit for any of these instructions.  Dave South from the Logan Ruby group sent these out in an email.  I am posting them so that I can find them later on.

Install ZenTest:
<pre><code class="ruby">sudo gem install ZenTest</pre></code>

Then install RedGreen
<pre><code class="ruby">sudo gem install redgreen</pre></code>

Go to your rails project directory and create a file called: .autotest
<pre><code class="ruby">mate .autotest</pre></code>

Add this to the file:
<pre><code class="ruby">
require 'redgreen/autotest'
</pre></code>

Save and exit

In your terminal, change to your rails application. Instead of typing
'rake' to run the tests, type 'autotest'. It will load the tests and
run them all the first time it loads. RedGreen will highlight the
result in green if everything passes and red if anything fails.
Autotest will continue to run, waiting for changes in the application.

Leave that terminal open and edit your rails application. Whenever
you save the app, autotest will detect the save, identify the file(s)
that changed, and run appropriate tests.

If you change a model file, for example, autotest will run the unit
tests for that model. It won't run the whole test suite.

If you hit control-c once, it WILL hit the whole test suite. Except
the version I'm running right now actually crashes with one control-
c. Hopefully it will be fixed, soon.


To quit autotest, hit control-c twice.

We like to set TextMate to "Save files when focus is lost". It's
under the advanced tab of TextMate's preferences. The nice thing
about that command is it saves every changed file in the project. So
if you do a global search and replace, all you have to do is switch
to another application and all the project files will save.

It also kicks the autotest every time you switch away from TextMate.

For those on windows here is a good resource:
<strike>http://blog.sourcecraft.net/2007/03/11/colored-autotest-with-notifications-on-windows/</strike>

Looks like the windows link is dead.  If anyone has any suggestions please let me know.