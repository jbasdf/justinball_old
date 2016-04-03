---
title: 'Using Shoulda to test login &#8211; should_require_login'
author: Justin Ball
layout: post
permalink: /2008/10/02/using-shoulda-to-test-login-should_require_login/
categories:
  - Ruby On Rails
tags:
  - Ruby On Rails
  - shoulda
  - testing
---
I've had my problems with shoulda, but one very powerful component of the testing framework is the ability to create macros.
Here's one that checks to make sure a user has to be logged in to access an action.  Put it into test/shoulda_macros/authentication.rb.
(You can name the file anything you want I just thought authentication.rb made sense)
<pre><code class="ruby">
Test::Unit::TestCase.class_eval do
  def self.should_require_login(*actions)
    actions.each do |action|
      should "Require login for '#{action}' action" do
        get(action)
        assert_redirected_to(login_url)
      end
    end
  end
end
</pre></code>

Then inside your controller test do something like this:

<pre><code class="ruby">
class UserControllerTest < ActionController::TestCase
  should_require_login :edit, :update, :destroy
end
</pre></code>
