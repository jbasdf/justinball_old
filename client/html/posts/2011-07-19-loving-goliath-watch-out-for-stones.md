---
title: Loving Goliath. Watch Out for Stones
author: Justin Ball
layout: post
permalink: /2011/07/19/loving-goliath-watch-out-for-stones/
categories:
  - OER
  - OER Glue
  - Ruby
  - Event Machine
  - Goliath
---

We've been looking at proxy solutions to help us deliver <a href="http://www.oerglue.com/courses">OER Glue courses</a> to learners without the requirement of installing an extension. There are an insane number of proxy solutions out there that do all kinds of really incredible things.

For the delivery of courses and modification of pages we really only need something that will grab a page on a user's behalf, add some scripts and then pass it along.

I can across <a href="https://github.com/igrigorik/em-proxy">em-proxy</a> which I really liked since it was written in Ruby and I really love Ruby. <a href="http://www.igvita.com/">IIya Grigorik</a> was kind enough to answer a bunch of my noob questions and finally suggested that I look at <a href="http://postrank-labs.github.com/goliath/">Goliath</a>.

I keep seeing that Goliath is the <a href="http://nodejs.org/">node.js</a> of Ruby. Given the popularity of node.js that's an easy way to grasp the architecture. Both use an <a href="http://en.wikipedia.org/wiki/Event_loop">"event loop" architecture</a>. I think that the primary difference is the philosophy. node.js is close to the metal while <a href="http://www.igvita.com/2011/03/08/goliath-non-blocking-ruby-19-web-server/">Golaith abstracts away the callbacks to make writing code as simple as possible an feature that IIya and the team at Post Rank felt was important for maintainability</a>.

That's not to say node.js is not as good. I really love node.js and we had started investigating <a href="node-http-proxy">node-http-proxy</a> from the <a href="http://www.nodejitsu.com/">nodejitsu</a> guys. I like the code base but it wasn't quite the right fit. For performance (low memory usage) <a href="https://github.com/nodejitsu/node-http-proxy/issues/58">node-http-proxy doesn't buffer what's it's proxying and so you don't have a chance to modify the DOM</a>. It looks like there is some effort going into making that possible but after reading through the issues I've come to the conclusion that what we need is something a little more than just a proxy.

Enter Goliath.

Here's a really simple example of what we will end up doing:
<pre><code class="ruby">
require 'rubygems'
require 'goliath'
require 'em-synchrony'
require 'em-synchrony/em-http'

class OerglueProxy < Goliath::API
  use Goliath::Rack::Params

  def response(env)
    req = EM::HttpRequest.new("http://www.google.com/").get
    resp = req.response

    [200, {'X-Goliath' => 'Proxy'}, resp]
  end
end
</pre></code>

In just a few lines of code we're able to retrieve a page and return the results. All the async code that EventMachine provides and that gives us great performance is hidden away. We can focus on our logic. We can also utilize our team's Ruby development strength. I like that.

I did run into issues getting the right version of the gems I needed. Specifically, I kept getting this error:
<pre><code class="ruby">
`class_eval': undefined method `get' for module `EventMachine::HTTPMethods' (NameError)
</pre></code>

I found <a href="https://github.com/igrigorik/em-synchrony/issues/29">a solution in this thread</a>, but it didn't quite work for me.

Luckily bundler makes it easy to get the exact version of the gem you need and with a little playing around here's what I came up with:

<pre><code class="ruby">
source "http://rubygems.org"

gem 'goliath', '0.9.1'
gem 'eventmachine', '1.0.0.beta.3'
gem 'em-http-request', '1.0.0.beta.4'
gem "em-synchrony", '0.3.0.beta.1'

group :test, :development do
  gem "rspec"
end
</pre></code>

Goliath has been in use by Post Rank for over a year and serves ~500 requests per second. I'm looking forward to seeing how it works to serve up courses on <a href="http://www.oerglue.com">OER Glue</a>.

