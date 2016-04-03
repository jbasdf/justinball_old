---
title: 'acts_as_state_machine &#8211; state is always nil'
author: Justin Ball
layout: post
permalink: /2008/07/26/acts_as_state_machine-state-is-always-nil/
categories:
  - Ruby On Rails
tags:
  - acts_as_state_machine
  - bugs
  - Ruby On Rails
---

If you are using the acts_as_state_machine plugin to manage the state of your object keep this in mind:
If you are going to have an object like an order or something similar that likely has a field state_id to relate in a geographic state then you need to be sure to rename the column that acts_as_state_machine plugin uses thus:

<pre><code class="ruby">
acts_as_state_machine :initial => :new, :column => :mode
</pre></code>

Then you can get your object's state thus:

<pre><code class="ruby">
obj.mode
</pre></code>

If you don't follow these steps ActiveRecord will override acts_as_state_machine and try to give you the geographic state (Utah, Idaho, etc) instead of the object state (new, edit, tired, etc).  (In my case the value was always nil no matter how many times I tried to obj.next! to transition the states of my object.  You will cry and scream and be in a very bad mood for a long time if you forget this fact.

Here's more info on the <a href="http://rails.aizatto.com/2007/05/24/ruby-on-rails-finite-state-machine-plugin-acts_as_state_machine/">acts_as_state_machine plugin</a>.
