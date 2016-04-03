---
title: Interesting testing issue with Rails 2.3.3
author: Justin Ball
layout: post
permalink: /2009/07/24/interesting-testing-issue-with-rails-2-3-3/
categories:
  - errors
  - Ruby On Rails
  - shoulda
  - template not foudn
  - testing
---

I'm not sure if this applies to all the versions of Rails, but right now I'm using the latest 2.3.3.  I'm using shoulda to do testing and my code looks like this:

<pre><code class="ruby">
    context "GET show" do
      setup do
        @feed = Factory(:feed)
        get :show, :id => @feed.to_param
      end
      should_not_set_the_flash
      should_respond_with :success
      should_render_template :show
    end
</pre></code>

The method I am testing looks like this:

<pre><code class="ruby">
  def show
    @feed = Feed.find(params[:id])
    @entries = @feed.entries
    respond_to do |format|
      format.pjs { debugger; render :template => 'feeds/show', :layout => false }
      format.json { render :json => @feed.as_json }
      format.html { render :template => 'feeds/show', :layout => params[:layout] || true  }
    end
  end
</pre></code>

The result of running this test is:
<strong>Missing template feeds/show.erb in view path app/views</strong>

That is very irritating.

I found that if I change the order as below everything works fine:
<pre><code class="ruby">
  def show
    @feed = Feed.find(params[:id])
    @entries = @feed.entries
    respond_to do |format|
      format.html { render :template => 'feeds/show', :layout => params[:layout] || true  }
      format.pjs { debugger; render :template => 'feeds/show', :layout => false }
      format.json { render :json => @feed.as_json }
    end
  end
</pre></code>

I can also change the test and explicitly list the format:
<pre><code class="ruby">
    context "GET show" do
      setup do
        @feed = Factory(:feed)
        get :show, :id => @feed.to_param, :format => 'html'
      end
      should_not_set_the_flash
      should_respond_with :success
      should_render_template :show
    end
</pre></code>

I'm guessing that is the appropriate way to deal with things.  It appears that the test doesn't send in 'html' as a default format.   I might add that this test lives inside a Rails engine.  I'm not sure if that affects things, but I figure that I would list this issue here in case anyone else runs into the same problem or in case I forget how to deal with this which is quite likely.