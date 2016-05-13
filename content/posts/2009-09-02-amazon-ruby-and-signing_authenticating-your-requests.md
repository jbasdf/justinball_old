---
title: Amazon Wishlist RSS, Ruby and Signing/Authenticating your Requests
author: Justin Ball
layout: post
permalink: /2009/09/02/amazon-ruby-and-signing_authenticating-your-requests/
tags:
  - amazon
  - Authentication
  - rss
  - Ruby On Rails
  - wishlist
---

UPDATE: If you don't want to bother with the code and instead would just like to get your <a href="http://www.my-amazon-feeds.com/">Amazon.com Wishlist rss you can go here</a>.

I've been playing with the <a href="http://docs.amazonwebservices.com/AWSECommerceService/latest/DG/index.html?AnatomyOfaRESTRequest.html">Amazon API</a> lately.  At first I just wanted to get the RSS feed to my wish list and I followed the direction in <a href="http://developer.amazonwebservices.com/connect/entry.jspa?externalID=379">this article on the Amazon developer site</a>.  Don't bother with that article.  <a href="http://www.xml.com/pub/a/2006/08/30/generating-rss-with-xslt-and-amazon-ecs.html">This one on xml.com is a bit out of date, but still useful</a>.  Getting the RSS feed for your profile on most sites is a pretty simple process.  On Amazon it's not.  It's a total pain in the butt.  Shame on them for not making this process easier.  I shouldn't have to interact with a full API just to gain access to an RSS feed.  Also, for any Amazon people out there would you mind keeping your documentation up to date or at least marking old articles as invalid so that I don't waste my time with stuff that doesn't work anymore?</rant>.

OK so you don't actually care about all the crap you just want the guts.  I took the basic structure from <a href="http://www.caliban.org/ruby/ruby-aws/">ruby-aaws</a>.  Look there if you want a complete library.  Here's how to sign your Amazon requests using ruby code.

<pre><code class="ruby">

require 'rubygems'
require 'openssl'

class Amazon

  # Do we have support for the SHA-256 Secure Hash Algorithm?
  # Note that Module#constants returns Strings in Ruby 1.8 and Symbols in 1.9.
  DIGEST_SUPPORT = OpenSSL::Digest.constants.include?('SHA256') || OpenSSL::Digest.constants.include?(:SHA256)

  # Requests are authenticated using the SHA-256 Secure Hash Algorithm.
  DIGEST = OpenSSL::Digest::Digest.new('sha256') if DIGEST_SUPPORT

  AMAZON_SITES = {
    :ca => 'http://ecs.amazonaws.ca/onca/xml',
    :de => 'http://ecs.amazonaws.de/onca/xml',
    :fr => 'http://ecs.amazonaws.fr/onca/xml',
    :jp => 'http://ecs.amazonaws.jp/onca/xml',
    :uk => 'http://ecs.amazonaws.co.uk/onca/xml',
    :us => 'http://ecs.amazonaws.com/onca/xml'
  }

  # Sign an amazon query
  # Requires openssl and that GlobalConfig.amazon_secret_access_key be defined.
  # Based on ruby-aaws and documentation here
  # http://www.caliban.org/ruby/ruby-aws/
  # http://docs.amazonwebservices.com/AWSECommerceService/latest/DG/index.html?RequestAuthenticationArticle.html
  # Parameters
  # query:    The query to be signed
  # locale:   Locale for the specific amazon site to use valid values are ca, de, fr, jp, uk, us
  def self.sign_query(uri, query, amazon_secret_access_key, locale = :us)
    raise 'SHA-256 not available in this version of openssl.  Cannot sign Amazon requests.' unless DIGEST_SUPPORT
    query << "&Timestamp=#{Time.now.utc.strftime('%Y-%m-%dT%H:%M:%SZ')}"
    new_query = query.split('&').collect{|param| "#{param.split('=')[0]}=#{url_encode(param.split('=')[1])}"}.sort.join('&')
    to_sign = "GET\n%s\n%s\n%s" % [uri.host, uri.path, new_query]
    hmac = OpenSSL::HMAC.digest(DIGEST, amazon_secret_access_key, to_sign)
    base64_hmac = [hmac].pack('m').chomp
    signature = url_encode(base64_hmac)
    new_query << "&Signature=#{signature}"
  end

  # Encode a string, such that it is suitable for HTTP transmission.
  def self.url_encode(string)
    # Shamelessly plagiarised from Wakou Aoyama's cgi.rb, but then altered slightly to please AWS.
    string.gsub( /([^a-zA-Z0-9_.~-]+)/ ) do
      '%' + $1.unpack( 'H2' * $1.bytesize ).join( '%' ).upcase
    end
  end

end

</pre></code>

I put together another class to make the requests:
<pre><code class="ruby">
require 'rubygems'
require 'httparty'
class AmazonRequest
  include HTTParty
  format :xml

  # Initialize Amazon Request.  Obtain valid Amazon credentials from your developer account
  # Parameters:
  # amazon_access_key_id:     Valid Amazon access key
  # amazon_secret_access_key: Valid Amazon secret access key
  # amazon_associate_tag:     Valid Amazon associates tag (optional)
  # locale:                   Locale for the specific amazon site to use valid values are :ca, :de, :fr, :jp, :uk, :us (optional, default is us)
  def initialize(amazon_access_key_id, amazon_secret_access_key, amazon_associate_tag = nil, locale = :us)
    @amazon_access_key_id = amazon_access_key_id
    @amazon_secret_access_key = amazon_secret_access_key
    @amazon_associate_tag = amazon_associate_tag
    @locale = locale
  end

  # Generate rss feeds for the give email
  # Parameters:
  # email:    email for which to find feeds.
  def get_amazon_feeds(email)
    wishlists = get_customer_wishlists(email)
    if !wishlists.blank?
      wishlist_ids = wishlists.collect{|list| list['ListId']}
      generate_wishlist_rss(wishlist_ids)
    end
  end

  # Get matching id for the given email
  # Parameters:
  # email:  customer's email.
  def get_customer_id(email)
    query = "Operation=CustomerContentSearch&Email=#{email}"
    result = make_request(query)
    if result['CustomerContentSearchResponse']['Customers']['TotalResults'].to_i > 0
      result['CustomerContentSearchResponse']['Customers']['Customer'][0]
    end
  end

  # Get information for the given customer id
  def get_customer_information(customer_id)
    query = "Operation=CustomerContentLookup&ResponseGroup=CustomerLists&CustomerId=#{customer_id}"
    make_request(query)
  end

  # Get customer's wishlist ids
  def get_customer_wishlists(email)
    query = "Operation=ListSearch&ListType=WishList&Email=#{email}"
    result = make_request(query)
    result['ListSearchResponse']['Lists']['List']
  end

  def generate_wishlist_rss(wishlist_ids)
    feeds = []
    wishlist_ids.each do |wishlist_id|
      query = "Operation=ListLookup&ListType=WishList&ListId=#{wishlist_id}&ResponseGroup=ItemAttributes,ListItems,ListInfo,Offers&Sort=DateAdded&Style=#{Amazon::ECS_TO_RSS_WISHLIST}"
      feeds << make_xslt_request(query)
    end
    feeds
  end

  protected
    def make_request(query)
      add_required_params(query)
      uri = Amazon::AMAZON_SITES[@locale]
      signed_query = Amazon.sign_query(URI.parse(uri), query, @amazon_secret_access_key)
      AmazonRequest.get(uri, :query => signed_query)
    end

    def make_xslt_request(query)
      add_required_params(query)
      uri = Amazon::AMAZON_XSLT_SITES[@locale]
      signed_query = Amazon.sign_query(URI.parse(uri), query, @amazon_secret_access_key)
      "#{uri}?#{signed_query}"
    end

    def add_required_params(query)
      query << "&Service=AWSECommerceService"
      query << "&AWSAccessKeyId=#{@amazon_access_key_id}"
      query << "&AssociateTag=#{@amazon_associate_tag}" if @amazon_associate_tag
      query << "&Version=2009-07-01"
    end
end
</pre></code>

And finally make the calls:

<pre><code class="ruby">
amazon_associate_tag = 'jbasdf-20' # feel free to use my associate tag :-)
amazon_secret_access_key = 'your secret key'
amazon_access_key_id = 'your access key'
email = 'testguy@example.com' # put a valid Amazon email here

am = AmazonRequest.new(amazon_access_key_id, amazon_secret_access_key, amazon_associate_tag)
puts am.get_amazon_feeds(email)
</pre></code>

This will give you a list of wishlist RSS feeds.

That was way to freakin' hard for something so simple.  Amazon gets an 'F'.

