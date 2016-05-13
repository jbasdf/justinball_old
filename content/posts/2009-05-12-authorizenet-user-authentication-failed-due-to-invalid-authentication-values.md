---
title: 'Authorize.net &#8211; User authentication failed due to invalid authentication values'
author: Justin Ball
layout: post
permalink: /2009/05/12/authorizenet-user-authentication-failed-due-to-invalid-authentication-values/
tags:
  - Programming
  - Ruby On Rails
  - API
  - authorize.net
  - commerce
---
So you've worked hard to integrate your website with authorize.net and now you're ready to turn it on and make the big bucks.  You run your first real transaction and get:

<blockquote>
User authentication failed due to invalid authentication values. code="E00007"
</blockquote>

or

<blockquote>
This account has not been given the permission(s) required for this request.
</blockquote>

or

<blockquote>
E00007 User authentication failed due to invalid authentication values
</blockquote>

You pull your hair out.  You swear a lot.  Then you calm down.  Log into your Authorize.net account and get click on "API Login ID and Transaction Key".  You probably used your login and password to access the gateway.  Use the api login and key and you are good to go.

UPDATE:  As Kerry pointed out you might also want to make sure you aren't pointed at the test gateway.  Your production credentials won't do you any good there.