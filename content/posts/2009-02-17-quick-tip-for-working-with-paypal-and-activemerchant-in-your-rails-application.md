---
title: Quick Tip for working with Paypal and ActiveMerchant in your Rails Application
author: Justin Ball
layout: post
permalink: /2009/02/17/quick-tip-for-working-with-paypal-and-activemerchant-in-your-rails-application/
tags:
  - Ruby On Rails
  - activemerchant
  - paypal
  - Ruby On Rails
---
Working with Paypal can be a bit difficult not because of the code required, but rather because their website can be a hassle to navigation.  I already have ActiveMerchant integrated into my application.  My problem was figuring out how to change it from Braintree to Paypal.  Here are the quick steps for getting going.

<ol>
	<li>Sign up for an account here:
https://developer.paypal.com</li>
	<li>Click on 'Test Accounts' then choose 'Seller' and create an account</li>
</li>You can then use that account to login just like a real business user with the exception that you will log in to the sandbox and no money will exchange hands.</li>
<li>If you want you can also create a 'Buyer' account that you can use to test transactions.</li>
<li>Select the 'Seller' account and then press 'Enter Sandbox Test Site'.  You will be asked to login as the 'Buyer' user.  Login and then under 'My Account' which should be the first screen you see there will be 3 steps towards the bottom of the page.  Click on the 'Go' button to accept the billing agreement and then you will be provided with API credentials.  Note that it will tell you that you will be billed $30 a month.  However since you are in the sandbox your test account is free so don't fret.  At least I hope they are free.  Maybe I should watch my account :-).</li> 
<li>If you don't copy the credentials provided no worries you can always get the API Credentials from inside your sandbox account by clicking on 'View Details' under the buy account.  Copy the credentials they are the information you need to setup ActiveMerchant.</li>
<li>You can now setup your application to talk to Paypal with something like this:
<pre><code class="ruby">
  gateway = ActiveMerchant::Billing::PaypalGateway.new(
    :login => "seller_432342373_p.example.com",
    :password => "WUDJOWK4M92C6HBE",
    :signature => "28dusj#8skaTiKxtkm6L9DcSUCUgePAUDQ3L-9s83usj@$osja82haDYtSu"
  )
</pre></code>
<li>I won't go into all the details of how to build a payment system instead watch the Railscasts and buy the <a href="http://peepcode.com/products/activemerchant-pdf">ActiveMerchant pdf</a></li>
</ol>

Note: If you get this error during your work:
<pre><code class="ruby">
Error: There's an error with this transaction. Please enter a complete billing address.
</pre></code>
It's because Paypal requires billing information even in test mode.  You'll need to include something like this in the 'options' argument to the various method calls in ActiveMerchant:
<pre><code class="ruby">
      :billing_address => {
        :name     => "Test Guy",
        :address1 => "123 W 423 E",
        :city     => "Somewhere",
        :state    => "CA",
        :country  => "US",
        :zip      => "88888"
      }
</pre></code>

If you get an error stating 'This transaction cannot be processed due to an invalid merchant configuration' then you need to sign into your 'Buyer' account and accept the API 

Railscasts are awesome.  <a href="http://railscasts.com/episodes/141-paypal-basics">PayPal Basics</a>, <a href="http://railscasts.com/episodes/144-active-merchant-basics">Active Merchant Basics</a>, and <a href="http://railscasts.com/episodes/145-integrating-active-merchant">Integrating Active Merchant</a> for a complete walk through.