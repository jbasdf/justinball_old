---
title: 'Edge Rails, OpenID and the Dreaded Sorry, the OpenID verification failed&#8221; error'
author: Justin Ball
layout: post
permalink: /2007/09/17/edge-rails-openid-and-the-dreaded-sorry-the-openid-verification-failed-error/
categories:
  - OpenID
  - Ruby On Rails
tags:
  - edge rails
  - errors
  - OpenID
  - Ruby On Rails
---

We use Edge Rails in our projects.  Call me stupid if you like, I like living on the edge (get it?).  This desire to push our luck has bitten us a couple of times, but not in any serious way.  Not until recently anyway.  We use OpenID - another brand new cool technology.  The combination of Rails and OpenID has been great.

Then one day it all stopped working and my PPH (<a href="/2006/07/29/pph-profanity-per-hour/">Profanity Per Hour</a>) went through the roof.  We have Capistrano setup.  I had another guy deploy <a href="http://www.51weeks.com">51week</a> and OpenID stopped working and started giving me the dreaded "Sorry, the OpenID verification failed" error.  I deployed it and it started working.  "Very strange I thought to myself," but I was just glad it was working.  Then Joel starts working on <a href="http://www.igag.us">igagus</a>.  He can't login because of the dreaded "Sorry, the OpenID verification failed".  We make some changes and notice that igagus no longer works.

WTF?

So I spend some time searching and can't find anything.  I spend some time chatting with the Janrain guys, but they don't know what it is either.  Then I set igagus to use an older version of edge rails - the same version that 51weeks is running.  It magically starts running so I do some research.

<a href="http://dev.rubyonrails.org/changeset/7329">Here's the change in edge rails that breaks OpenID if you are using postgresql</a>.   In that change the postgres adapter was modified.  The 'secret' used by the OpenID authentication is stored as a bytea column in postgres.  In change 7329 the way that bytea columns are dealt with was changed and now the value that is returned from the database is incorrect.

I traced this down into consumer.rb in the ruby-openid gem.

This section of code from around line 562 is where the 'sig mismatch' comes from.
<pre><code class="ruby">
_signed, v_sig = OpenID::Util.sign_reply(args, assoc.secret, signed_list)

if v_sig != sig
  return FailureResponse.new(consumer_id, 'sig mismatch')
end
</pre></code>

To ensure that the response from the OpenID server is not tampered with the response is signed with a shared secret.  When the response is received the reply is checked using the local secret that is stored in the local db as a bytea column.  Because of the change in the postgresql adapter the bytea value returned is different than the one originally sent to the OpenID server.  The result is mismatched hash which returns the 'sig mismatch' error.

I am currently trying to find the exact problem and an solution.  If anyone has any great ideas please let me know.