---
layout: post
author: Justin Ball
title: "Canvas install error"
date: 2016-08-30 17:40:00 -0700
tags:
  - Canvas
  - Instructure
  - Programming
---


<h3>If you get an error that looks like this when you try to setup Instructure Canvas:</h3>

<pre><code class="ruby">
  API Documentation successfully generated in public/doc/api
  See public/doc/api/index.html
  --> Finished: 'Generate documentation [yardoc]' in 57.496207991000006
  --> Compiling React JSX finished in 46.748775163999994
  rake aborted!
  Undumpable Exception -- #<EOFError: end of file reached>
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:63:in `work'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:280:in `block (4 levels) in work_in_processes'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:447:in `with_instrumentation'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:279:in `block (3 levels) in work_in_processes'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:273:in `loop'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:273:in `block (2 levels) in work_in_processes'
  /Users/jbasdf/.rvm/gems/ruby-2.3.1/gems/parallel-1.4.1/lib/parallel.rb:138:in `block (2 levels) in in_threads'
</pre></code>

<h3>You might also see:</h3>

<pre><code class="ruby">
  --> Generating plugin extensions finished in 0.009236606999991182
  --> Pre-compiling ember handlebars templates
  --> Creating ember app bundles finished in 0.025332288000001313ll_resources.html......
  module.js:338
      throw err;
</pre></code>

<h3>Fix it:</h3>

cd into

  `canvas-lms/gems/canvas_i18nliner`

  `rm -rf node_modules`

  `npm install`

