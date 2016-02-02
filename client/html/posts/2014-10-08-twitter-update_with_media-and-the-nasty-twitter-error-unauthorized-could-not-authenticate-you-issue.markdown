---
layout: post
author: Justin Ball
title: "Twitter, update_with_media, and the nasty Twitter::Error::Unauthorized (Could not authenticate you) issue"
date: 2014-10-08 23:54:32 -0600
categories:
  - Programming
---

I've been playing around with the Twitter gem - yes this is what I do for fun. I was shocked to find out that all the cool kids are posting photos.
I feel so stuck in the dark ages with just 140 characters. I set out to discover how to regain my hipster cred and since
I am a lover of Ruby I started with the Twitter gem. The first bit of code that looked like this:

{% highlight ruby %}

# We're goint to upload an image from a url so we include open-uri
require 'open-uri'

class TwitterApi

  # Helper method to setup the twitter client. I'm lazy so the keys and secrets are safely stored in a nice .yml file.
  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key = Rails.application.secrets.twitter['consumer_key']
      config.consumer_secret = Rails.application.secrets.twitter['consumer_secret']
      config.access_token = Rails.application.secrets.twitter['oauth_token']
      config.access_token_secret = Rails.application.secrets.twitter['oauth_token_secret']
    end
  end

  # This method posts a tweet and image to Twitter
  def self.post(tweet, image_url)
    self.client.update_with_media(tweet, open(image_url))
  end

end
{% endhighlight %}

The problem with that code is that I would occasionally get this error:

<blockquote>
  Twitter::Error::Unauthorized Could not authenticate you
</blockquote>

That error makes no sense whatsoever since it only occured on some tweets but worked fine on others - clearly my authentication
setup was just fine.

<a href="https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=twitter%20api%20Twitter%3A%3AError%3A%3AUnauthorized%20(Could%20not%20authenticate%20you)">
A Google search turns up plenty of other examples where people have run into this problem.
</a> There are a few helpful solutions like remembering to pass a file object to the 'update_with_media'. The open-uri library
handles just fine by letting us open a url with a simple 'open(url)'. Very cool. However, that didn't solve my problem.

I turned to the <a href="https://dev.twitter.com/rest/reference/post/statuses/update_with_media">API documentation on Twitter</a>a> and found these bits of wisdom:

<blockquote>
If the user is over the daily media limit, this method will return an HTTP 403 error. In addition to media upload limits, the user is still limited in the number of statuses they can publish daily. If the user tries to exceed the number of updates allowed, this method will also return an HTTP 403 error, similar to POST statuses / update.
</blockquote>

I was just sending one Tweet so that wasn't it. Then like a brick to the face it hit me:

<blockquote>
  The Tweet text will be rewritten to include the media URL(s), which will reduce the number of characters allowed in the Tweet text. If the URL(s) cannot be appended without text truncation, the tweet will be rejected and this method will return an HTTP 403 error.
</blockquote>

The length of the tweet cannot exceed 140 characters. That includes the url of the photo that Twitter generates and appends.
That sucks 1. I wasn't sure how long the photo url would be and 2. I'm wordy and the 140 character limit was already killing me. 


<a href="https://dev.twitter.com/rest/public/uploading-media-multiple-photos">Enter the new media upload API.</a> 
As of today you'll find support for it in the <a href="https://github.com/sferik/twitter">Twitter gem</a> on github. It's not in the officeal release yet so 
if you want to play with it you'll have to poing your gemfile to github:

{% highlight ruby %}
gem "twitter", :git => 'https://github.com/sferik/twitter.git'
{% endhighlight %}

Now my code looks like this and all is well:

{% highlight ruby %}

require 'open-uri'

# The Twitter gem won't take StringIO so don't allow downloaded files to be created as StringIO. Force a tempfile to be created.
OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
OpenURI::Buffer.const_set 'StringMax', 0

class TwitterApi

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key = Rails.application.secrets.twitter['consumer_key']
      config.consumer_secret = Rails.application.secrets.twitter['consumer_secret']
      config.access_token = Rails.application.secrets.twitter['oauth_token']
      config.access_token_secret = Rails.application.secrets.twitter['oauth_token_secret']
    end
  end

  def self.post(tweet, image)
    return unless tweet.present?
    open(image) do |media|
      media_id = client.upload(media)
      puts client.update(tweet, :media_ids => media_id)
    end
  end

end

{% endhighlight %}

