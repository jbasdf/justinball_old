---
title: 'Getting this: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed'
author: Justin Ball
layout: post
permalink: /2012/09/12/getting-this-ssl_connect-returned1-errno0-statesslv3-read-server-certificate-b-certificate-verify-failed/
tags:
  - Ruby
  - Ruby On Rails
---

Setting up a new Mac is always a joy. You forget how many configuration errors you solved long ago. Here's one I just ran into. I started getting this error when doing OAuth with Facebook on my local machine:

<pre><code class="ruby">
SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
</pre></code>

I had already installed Ruby 1.9.3 so I had to reinstall:
<pre><code class="ruby">
rvm pkg install openssl
rvm reinstall 1.9.3 â€“-with-openssl-dir=$rvm_path/usr
cd $rvm_path/usr/ssl
curl -O http://curl.haxx.se/ca/cacert.pem
mv cacert.pem cert.pem
</pre></code>

<a href="https://rvm.io/packages/openssl/" target="_blank">RVM has more information to help you out.</a>