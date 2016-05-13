---
title: 'gems:unpack for gems that don&#8217;t unpack'
author: Justin Ball
layout: post
permalink: /2009/09/10/gemsunpack-for-gems-that-dont-unpack/
tags:
  - gems
  - muck
  - rake
  - Ruby On Rails
  - unpack
---
I couldn't figure out why my gems wouldn't unpack until I ran across this: <a href="http://metaclass.org/2009/4/13/rake-gems-unpack">http://metaclass.org/2009/4/13/rake-gems-unpack</a>.  My gems have rake tasks and I have to include them in the app's rakefile to make them available so Rails won't unpack them.

I did this instead:
<pre><code class="ruby">
  def muck_gems
    ['cms-lite', 'disguise', 'uploader', 'muck-solr', 'muck-raker', 'muck-engine',
    'muck-users', 'muck-activities', 'muck-comments', 'muck-profiles', 'muck-friends',
    'muck-contents', 'muck-blogs', 'muck-shares'] #'muck-invites'
  end

  # execute commands in a different directory
  def inside(dir, &block)
    FileUtils.cd(dir) { block.arity == 1 ? yield(dir) : yield }
  end

  desc "unpacks all muck gems into vendor/gems using versions installed on the local machine."
  task :unpack do
    gem_path = File.join(File.dirname(__FILE__), '..', '..', 'vendor', 'gems')
    FileUtils.mkdir_p(gem_path) unless File.exists?(gem_path)
    inside gem_path do
      muck_gems.each do |gem_name|
        system("gem unpack #{gem_name}")
        system("gem specification #{gem_name} > .specification")
      end
    end
  end

</pre></code>