---
title: Sending email with Ruby on Rails 2.3.2 and gmail
author: Justin Ball
layout: post
permalink: /2009/06/25/sending-email-with-ruby-on-rails-2-3-2-and-gmail/
categories:
  - 2.3.2
  - configuration
  - email
  - gmail
  - Ruby On Rails
---

If you need an easy way to setup email for your company or for a client it's hard to not love Google Apps.  (<a href="http://www.google.com/apps/intl/en/group/index.html">The 'standard' ie free version is here</a>).

It is very likely that at some point you will need to send out emails from your application.  Don't cry.  Gmail can do this for you.  Rails 2.3.2 makes it easier than ever with the addition of 'enable_starttls_auto'.  Put the following code in production.rb, development.rb or environment.rb and you 'should' be able to send out emails:

<pre><code class="ruby">
  ActionMailer::Base.smtp_settings = {
    :enable_starttls_auto => true,
    :address        => 'smtp.gmail.com',
    :port           => 587,
    :domain         => 'your.domain.com',
    :authentication => :plain,
    :user_name      => 'login@your.domain.com',
    :password       => 'some_password'
  }
</pre></code>

If you are one of the lucky ones this will actually work.  It didn't work for me but since I still needed to get email working here's what I did:

First be sure to activate the email account that you are using.  To do that you only need to login.  Google will walk you through entering a captcha etc.

You might get this error:
<strong>Net::SMTPAuthenticationError: 530 5.7.0 Must issue a STARTTLS command first.</strong>

If you do then check your Ruby version.  <a href="https://rails.lighthouseapp.com/projects/8994/tickets/1336-starttls-for-smtp-makes-gmail-go">Ruby 1.8.7 has this built in but Ruby 1.8.6 does not</a>.

I'm currently running my apps on <a href="http://www.engineyard.com/solo">EngineYard's Solo product <</a>a href="https://cloud-support.engineyard.com/discussions/problems/203-engineyard-cloud-support-for-ruby-187-p73">which is currently using Ruby 1.8.6</a> so changing versions isn't an option (not an easy option anyway).

The next best thing is to <strong>get action_mailer_tls</strong>.  Most of the links you will find in forum and blog posts are broken.  The code is on github and neatly packaged as a gem: <a href="http://github.com/openrain/action_mailer_tls/tree/master">http://github.com/openrain/action_mailer_tls/tree/master</a>.  Follow the directions to install and configure the plugin there and you should be able to send email.

Here's a couple of handy conversations for reference:
<a href="http://www.railsforum.com/viewtopic.php?id=28480">http://www.railsforum.com/viewtopic.php?id=28480</a>
<a href="http://www.ruby-forum.com/topic/184137">http://www.ruby-forum.com/topic/184137</a>