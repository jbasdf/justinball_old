---
title: Updating Genlighten from Rails 2.2.2 to Rails 2.3.2
author: Justin Ball
layout: post
permalink: /2009/08/17/updating-genlighten-from-rails-2-2-2-to-rails-2-3-2/
categories:
  - Ruby On Rails
tags:
  - Ruby On Rails
---
I can't resist new stuff so I'm updating Genlighten to Rails 2.3.2.  This release comes with some pretty sweet additions like Rack.  Here's what I had to do:

<ol>
	<li>Set RAILS_GEM_VERSION = '2.3.2' (easy)</li>
	<li>Removed stuff like this from my code:
          {% highlight ruby %}
            protect_from_forgery :except => :swfupload
            session :cookie_only => false, :only => :swfupload
          {% endhighlight %}
          -- 'The :digest and :secret options to protect_from_forgery are deprecated and have no effect.' and sessions are lazy loaded now.</li>
	<li>I updated shoulda to the latest version.  This resulted in a number of deprecation warnings which took me a while to fix.</li>

</ol>
<a href="http://guides.rubyonrails.org/2_3_release_notes.html">The release notes are worth a read</a>.