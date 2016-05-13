---
title: 'to_json gives TypeError Exception: wrong argument type Hash (expected Data)'
author: Justin Ball
layout: post
permalink: /2009/08/17/to_json-gives-typeerror-exception-wrong-argument-type-hash-expected-data/
tags:
  - Ruby On Rails
  - to_json
---

Tonight for no apparent reason my tests started turning up this error whenever I tried to call to_json:
<pre><code class="ruby">
TypeError Exception: wrong argument type Hash (expected Data)
</pre></code>
Specifically, my to_json call looked like this:
<pre><code class="ruby">
respond_to do |format|
  format.js { render :json => @states.to_json(:only => [:id, :name]) }
end
</pre></code>
In the debugger .to_json worked but to_json(:only => [:id, :name]) did not.

Needless to say given that since I hadn't touch this code in a while I was not happy and spent some time describing my code with <a href="http://www.foxnews.com/story/0,2933,531977,00.html?test=latestnews">colorful metaphors</a>.  Nothing makes me crazy like code that magically stops working.

Turns out I had installed <a href="http://github.com/shvets/google_translate/tree/master">shvets-google_translate</a> that depended on json_pure. <a href="http://groups.google.com/group/rubyonrails-talk/browse_thread/thread/b70e391d53063bab">json_pure doesn't seem to play nice with activesupport</a>.

For some that works.  For me it did not.  Apparently, <a href="http://blog.swivel.com/code/2009/03/index.html">Active Support and JSON gems don't play nice</a>.


No more colorful metaphors (for now).

UPDATE Ruby on Rails 2.3.3 fixes this problem with as_json.  Thanks guys!