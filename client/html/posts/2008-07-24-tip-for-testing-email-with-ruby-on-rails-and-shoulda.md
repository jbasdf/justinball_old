---
title: Tip for Testing Email with Ruby on Rails and Shoulda
author: Justin Ball
layout: post
permalink: /2008/07/24/tip-for-testing-email-with-ruby-on-rails-and-shoulda/
categories:
  - Ruby On Rails
tags:
  - assert_sent_email
  - email
  - Ruby On Rails
  - shoulda
---

Shoulda comes with a great method for testing email called 'assert_sent_email'.  (If you try it and get a method missing error update Shoulda.  Not that anyone wouldn't know to just do that).  No matter what you use to test email as long as you are in test mode your emails will be placed into an array accessible using:
{% highlight ruby %}
ActionMailer::Base.deliveries
{% endhighlight %}

This is due to this line in test.rb found in the environments folder:
{% highlight ruby %}
config.action_mailer.delivery_method = :test
{% endhighlight %}

Now here's the tip.  You might think you are really smart if you take advantage of the fact that Rails has a very handy initializers folder and put a file in there called mail.rb that contains all your email settings.

DON'T do it.  That initializer will override your test settings and the email specific tests will always fail.