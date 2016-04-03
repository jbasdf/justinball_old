---
title: Ruby fs-api
author: Justin Ball
layout: post
permalink: /2008/03/12/ruby-fs-api/
categories:
  - genealogy
tags:
  - API
  - family search
  - genealogy
  - ruby
  - Ruby On Rails
---

I am in the <a href="http://code.google.com/p/ruby-fs-api/">Ruby-fs API</a> presentation now.  Funding for the library came from USFamilyTree.com.

It is REST based.

Data model is:
Person
Person has many Assertions
Assertion has one Contributor, Citation(not yet implemented), Note

Each person has a lot of data associated with them so you don't want to be parsing xml data on the fly.

Include the library with this:
require 'family_tree_api/client'

The library will handle turning all the data into objects for you.  This makes access to the API slick.  I love ruby.
ie
<pre><code class="ruby">
person = client.summary_person 'KW3B-2L7', descendants => 2
mother = person.mother
grandmother = person.mother.mother
</pre></code>

<pre><code class="ruby">
search_params = {:givenName => 'Parker', :familyName => 'Flech'}
results = client.search search_params
</pre></code>

As with all things Ruby this API makes it very easy to talk to FamilySearch.  If you are in the genealogy space and know Ruby give it a try.

The good news is that they are open to patches.  The project is in active development.  They will be creating a plugin for Rails.  Right now he just checks out the code to his lib directory.

