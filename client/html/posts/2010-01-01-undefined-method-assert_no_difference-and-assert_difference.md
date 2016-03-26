---
title: 'undefined method `assert_no_difference&#8217; and `assert_difference&#8217;'
author: Justin Ball
layout: post
permalink: /2010/01/01/undefined-method-assert_no_difference-and-assert_difference/
categories:
  - Ruby On Rails
  - tests
---

I've been upgrading some old code and noticed that my unit tests started spitting out a lot of errors like this:
<pre><code class="ruby">
undefined method `assert_no_difference'
</pre></code>

and

<pre><code class="ruby">
undefined method `assert_difference'
</pre></code>

It turns out that I needed to change my base classes from <strong>Test::Unit::TestCase</strong> to <strong>ActiveSupport::TestCase</strong>:

<pre><code class="ruby">
class UserTest < Test::Unit::TestCase
  # stuff
end
</pre></code>

<p>changes to:</p>

<pre><code class="ruby">
class UserTest < ActiveSupport::TestCase
  # stuff
end
</pre></code>