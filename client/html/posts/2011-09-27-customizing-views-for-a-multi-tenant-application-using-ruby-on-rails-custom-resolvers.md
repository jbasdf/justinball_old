---
title: Customizing Views for a Multi-Tenant Application Using Ruby on Rails Custom Resolvers
author: Justin Ball
layout: post
permalink: /2011/09/27/customizing-views-for-a-multi-tenant-application-using-ruby-on-rails-custom-resolvers/
categories:
  - Ruby On Rails
---

Like so many other internet startups, <a href="http://www.oerglue.com" title="OER Glue">OER Glue</a> is a multi-tenant application. The process of hosting many of clients using a single piece of software presents a number of challenges and one of the largest has been customizing the look for each customer. I've tried solving this a number of different ways over the years including writing a gem called <a href="https://github.com/jbasdf/disguise" title="Disguise Gem">disguise</a> that let's you customize look of your Rails site in a way similar to the method Wordpress uses. That gem will customize the views based on the domain, but it's not especially efficient.

With <a href="http://www.oerglue.com" title="OER Glue">OER Glue</a> we needed something that didn't effect performance and that didn't require a new deploy every time we need to customize a view for a customer. If you've run into this problem then you've problem also prayed to the omniscient Google and found this <a href="http://blog.plataformatec.com.br/2011/04/default-views-in-rails-3-0-with-custom-resolvers/" title="Custom Resolvers in Rails 3.1">great article by Jose Valim on creating custom resolvers</a>. About half way through I got really excited and decided to check out his book <a href="http://plataformatec.com.br/crafting-rails-applications/" title="Crafting Rails Applications">Crafting Rails Applications</a>. Then I got really, really excited when I realized I had already bought it.

It turns out Chapter 3 from the book describes creating a custom template resolver for Ruby on Rails that pulls templates from the database. It also caches them so you aren't constantly hitting the database which would result in a nasty performance hit. If you want to understand how the resolver works then it really is worth buying the book. The solution Jose presents solved 90% of my problem.

However, I was still left with one really big issue - how do I get information from the controller into the custom view resolver? Specifically, I needed to pass information about the current domain into the resolver so that I could scope the views to the current account.
Here's the specific snippet responsible for retrieving template from the database:
<pre><code class="ruby">
    def find_templates(name, prefix, partial, details)
      conditions = {
        :path    => normalize_path(name, prefix, partial),
        :locale  => normalize_array(details[:locale]).first,
        :format  => normalize_array(details[:formats]).first,
        :handler => normalize_array(details[:handlers]),
        :partial => partial || false
      }
      @account.custom_views.where(conditions).map do |record|
        initialize_template(record)
      end
    end
</pre></code>

The problem is that in the book the resolver is a singleton and so there is no opportunity to pass in the an account and setup an @account value since the resolver is setup in the application controller like this:
<pre><code class="ruby">
class ApplicationController < ActionController::Base
  prepend_view_path SqlTemplate::Resolver.instance
end
</pre></code>

At first I decided to just use a global on the current thread:
<pre><code class="ruby">
Thread[:account] = current_account
</pre></code>

Then inside the resolver I could recover the account from the global:

<pre><code class="ruby">
    def find_templates(name, prefix, partial, details)
      conditions = {
        :path    => normalize_path(name, prefix, partial),
        :locale  => normalize_array(details[:locale]).first,
        :format  => normalize_array(details[:formats]).first,
        :handler => normalize_array(details[:handlers]),
        :partial => partial || false
      }
      Thread[:account].custom_views.where(conditions).map do |record|
        initialize_template(record)
      end
    end
</pre></code>

That works but setting a global on the current thread felt like a big hack. (<a href="http://coderrr.wordpress.com/2008/04/10/lets-stop-polluting-the-threadcurrent-hash/" title="Stop polluting the Thread.current hash">Here's a good article on Thread.current</a>  ) Lucky for me Jose was willing to spend a little time working with me and the resulting code works without globals. Instead of passing a global around we removed the Singleton code from the resolver and create an instance of the resolver per each account:

<pre><code class="ruby">
class ApplicationController < ActionController::Base
  before_filter :set_resolver

  def current_account
    @current_account ||= Account.find_by_domain(request.host) || Account.find_by_code(request.subdomains.first) || Account.first
  end

  @@account_resolver = {}

  def account_resolver_for(account)
    @@account_resolver[account.id] ||= CustomView::Resolver.new(account)
  end

  def set_resolver
    return unless current_account
    resolver = account_resolver_for(current_account)
    resolver.update_account(current_account)
    prepend_view_path resolver
  end

end
</pre></code>

In the resolver we take the account as a parameter. The trick is that the account also has a counter called 'custom_view_cache_count' that increments anytime a view is changed thus allowing us to expire the cache across all instances and servers. Since I have to recover the account model from the database on each request anyway this doesn't require any more database hits than I was making before adding this solution:
<pre><code class="ruby">
  class Resolver < ActionView::Resolver

    def initialize(account)
      @account = account
    end

    # Check if the custom_view_cache_count is still the same, if not clear the cache
    def update_account(updated_account)
      self.clear_cache unless @account.custom_view_cache_count == updated_account.custom_view_cache_count
      @account = updated_account
    end
  end

</pre></code>

This has a couple of benefits. The biggest is that you no longer have to pass around a global, but another is that the cache is specific to each account so you don't end up expire the cache for all accounts unnecessarily.

Big thanks to Jose for helping me figure this one out!
