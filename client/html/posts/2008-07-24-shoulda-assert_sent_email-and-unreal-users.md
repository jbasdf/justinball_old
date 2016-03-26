---
title: Shoulda, assert_sent_email and Unreal Users
author: Justin Ball
layout: post
permalink: /2008/07/24/shoulda-assert_sent_email-and-unreal-users/
categories:
  - Ruby On Rails
tags:
  - assert_sent_email
  - Ruby On Rails
  - shoulda
---

I have been banging my head against a problem in my testing.  Using the UI everything worked as expected, but my tests were failing when I tried to see if emails were being sent in a specific case.

Here's the test I was trying to run using Shoulda:
<pre><code class="ruby">
context "reset password for user that has not been activated" do
    setup do
        @email = users(:not_activated_user).email
        @emails.clear
        # this code should send out a reset password email after setting up a password reset code.
        post :create, :reset_password => {:email => users(:not_activated_user).email}
    end

    should "send reset notification email" do
        assert_sent_email do |email|
            email.subject =~ /You have requested to change your/ &&
            email.to.include?(@email) &&
            email.body.include?("You requested that your #{GlobalConfig.application_name} password be reset, but your account is not yet active.")
        end
    end

    should_set_the_flash_to(/A password reset link has been sent to your email address/i)
    should_redirect_to "login_path"

end
</pre></code>

Here's the yml file I was using:
<pre><code class="ruby">
quentin:
	  login: quentin
	  email: quentin@example.com
	  newsletter: 1
	  notify_of_events: 1
	  terms_of_service: 1
	  salt: 7e3041ebc2fc05a40c60028e2c4901a81035d3cd
	  crypted_password: 00742970dc9e6319f8019fd54864d3ea740f04b1 # test
	  activation_code: 8f24789ae988411ccf33ab0c30fe9106fab32e9b
	  activated_at: <%= 5.days.ago.to_s :db %>
	  password_reset_code: 8f24789ae3484122cf33ab0c3ffe9106fab334de

not_activated_user:
	  login: not_activated_user
	  email: not_activated_user@example.com
	  newsletter: 0
	  notify_of_events: 0
	  terms_of_service: 1
	  salt: 7e3041ebc2fc05a40c60028e2c4901a81035d3cd
	  crypted_password: 00742970dc9e6319f8019fd54864d3ea740f04b1 # test
	  activation_code: 9f24789ae988411ccf33ab0c30fe9106fab32e9a
	  password_reset_code: 8f24789ae3484122cf33ab0c3ffe9106fab334de
</pre></code>

For some reason the email part of the test failed every time.  I finally changed my code to this:

<pre><code class="ruby">
context "reset password for user that has not been activated" do
    setup do
        user = create_user
        @email = user.email
        @emails.clear
        post :create, :reset_password => {:email => @email}
     end

    should "send reset notification email" do
        assert_sent_email do |email|
            email.subject =~ /You have requested to change your/ &&
            email.to.include?(@email) &&
            email.body.include?("You requested that your #{GlobalConfig.application_name} password be reset, but your account is not yet active.")
        end
    end

    should_set_the_flash_to(/A password reset link has been sent to your email address/i)
    should_redirect_to "login_path"

end
</pre></code>

create_user creates a user in the database instead of using the users from the users.yml file.  Using this method everything started working.  I have found that frequently I have better luck with my tests if I create real users.  I am sure there is a good reason for this, but I am stopping my research at knowing that I need to create users or other object when the tests don't work as expected.
