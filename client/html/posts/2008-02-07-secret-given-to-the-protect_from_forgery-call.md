---
title: 'secret given to the #protect_from_forgery call'
author: Justin Ball
layout: post
permalink: /2008/02/07/secret-given-to-the-protect_from_forgery-call/
categories:
  - Programming
  - Ruby On Rails
tags:
  - protect_from_forgery
  - Ruby On Rails
  - sessions
---

My code was running fine under Rails 2.0.2.  Then I enabled the db based session store by uncommenting this:
{% highlight ruby %}
  config.action_controller.session_store = :active_record_store
{% endhighlight %}
in environment.rb.

Anything that used the session after that gave me this error:
{% highlight ruby %}
No :secret given to the #protect_from_forgery call.  Set that or use a session store capable of generating its own keys (Cookie Session Store).
{% endhighlight %}

If you have the same problem.  Go to application.rb and uncomment the secret then restart.

All better.