---
title: Mountain West Ruby Conference
author: Justin Ball
layout: post
permalink: /2008/03/28/mountain-west-ruby-conference/
categories:
  - mtnwestrubyconf
  - Ruby On Rails
tags:
  - merb
  - mtnwestrubyconf
  - Ruby On Rails
---


I'm at the Mountain West Ruby Conference for the next few days so I will be doing a bunch of blog posts that look like notes.

Up right now:
Strengthening the Ruby Ecosystem & Ezra Zygmuntowicz Evan Phoenix

Evan is talking about Rubinius.  Engine Yard pays him to work on the project full time.  Even doesn't like the notion of a 'core' team because it implies there is one group that is above all others.  The project is open source and they like to keep everyone involved.  I like that.  They try to be highly transparent.  They are trying to build community.


Ezra is up now.  I am hoping to hear something in depth about <a href="http://merbivore.com/">merb</a>.

merb principles:
great for mashups
great for building web services
grew out of frustration with Rails
<ul>
  <li>Prefers simplicity over magic
     <ul>
        <li>simple is better and scales better</li>
        <li>just because its there doesn't mean you have to use it</li>
        <li>be responsible about what you put in the libraries</li>
     </ul></li>
  <li>This is framework code, no &:foo or returning allowed</li>
  <li>When in doubt benchmark and profile
     <ul><li>Guessing is not good enough</li></ul></li>
  <li>Know your runtime and how it acts</li>
</ul>

Why build merb?  Why not.

Hosting does cost money.  Rails scales, but requires servers.

merb is stripped down to the bare minimum.

<h3>merb-core</h3>
Used to use mongrel only but they added 'Rack Webserver Abstraction Layer' which makes the framework compatible with Ebb, Evented Mongrel, FastCGI, Mongrel, Thin, Webrick.

merb app by default looks like this in config/rack.rb

{% highlight ruby %}
run Merb::Rack::Application.new
{% endhighlight %}

but because merb uses rack you can add code to intercept the request:

{% highlight ruby %}
class ApiHandler
  def inialize(app)
     @app = app
  end

  def call(env)
    request = Merb::Request.new(env)
    if request.path =~ %r{/api/(.*)}
       [200, {"Content-Type" => "text/json"}, Api.get_json($1)]
    else
       @app.call(env)
    end
  end
end

use ApiHandler
run Merb::Rack::Application.new

{% endhighlight %}

This code prevents a call into the framework making it very fast.

merb does routing like Rails, but also implements a powerful routing system that let's you use regular expressions.

Provides API

{% highlight ruby %}
Merb.add_mime_type(:yaml, :to_yml, %w[application/x-yaml text/yaml])
Merb.add_mime_type(:html, :to_html, %w[text/html application/xhtml+xml application/html])

class Posts < Application
  provides :json, :yaml, :xml

  def show(id)
    @post = Post.find id
    display @post # depending on which content type was requested post will be rendered as html, yml, etc
  end
end
{% endhighlight %}

<h3>Merb More</h3>
Can be added in one piece at a time.
Code Generators
Asset Bundling
Mailers and Parts - mailers act like controllers so you can use filters and layouts
Haml and other templating support - when the merb server starts up it parses all the templates and turns them into ruby calls which make rendering much faster.
Action Args
Caching
Other essentials


<h3>merb Plugins</h3>
merb_datamapper - his preference
merb_activerecord - you can configure your merb app to use your rails app's model directory so that you can reuse a Rails app
merb_sequel

<h3>Resources:</h3>
http://merbivore.com/
http://groups.google.com/group/merb?lnk=srg
http://merb.lighthouseapp.com/dashboard
http://github.com/wycats/merb-core/tree/master
http://git.or.cz/
http://ruby-prof.rubyforge.org/ - for profiling

Ezra Zygmuntowicz's blog
http://brainspl.at/

They are working on documentation and a book.  The IRC channel is very active (#merb ).

1.0 will be feature complete so they are going to let the .9 release gel for a while.  Merb is awesome and Ezra is a dynamic community leader.  I will be playing with this.