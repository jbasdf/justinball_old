---
title: Rails Conf DHH keynote
author: Justin Ball
layout: post
permalink: /2007/05/18/rails-conf-dhh-keynote/
categories:
  - RailsConf
  - RailsConf07
tags:
  - RailsConf07
  - Ruby On Rails
---

Listening to DHH right now.  Play DHH buzzword bingo here. http://bingdoh.com/games/dhh-keynote He started out talking about the growth of the community and making fun of a job post requesting a Rails programmer with at least 3 years of Rails experience.  (That is longer than he has been on Rails and he invented it.)

Now we are going into <strong>Rails 2.0</strong> information.  DHH is talking about namespaces in routes.  DHH is now building a project.  Pretty cool for a keynote.  DHH showed of some of the new <strong>routing</strong> features.  Some example code looks like this:

{% highlight ruby %}
map.namespace(:admin) do |admin|
   admin.resources :products,
 	:has_many => [ :tags, :images, :variants ]
end
{% endhighlight %}

Yesterday I couldnâ€™t figure out why <strong>scaffold_resource</strong> wouldnâ€™t work on edge rails anymore.  Today I see why.  The â€˜generate resource_scaffoldâ€™ has been promoted to just â€˜generate <strong>scaffoldâ€™</strong>.  They are also getting rid of the .rhtml and .rxml formats in favor of html.erb and xml.erb.

 DHH is showing off a very cool feature of Rails which is the responds_to functionality.  This is one of my favorite features of the latest Rails.  It letâ€™s you do things like myobject, myobject.rss, myobject.xml and get back a representation of the object in those various formats.   We were doing multiple formats with scrumdidilymptio.us last year and had to write all the logic and views for each rss, rdf and html format.  This feature makes implementing stuff like that trivial.

The introduction of REST into the heart of Rails means that implementing API services is very easy and almost free.  As you develop your app you also develop your API.  This is very slick.

Active Web Service is no longer bundled with Rails (the REST stuff replaces it) Active Resource is now going to be embedded.  This means that SOAP is dropped from the core.  You can still use it by bringing in Active Web Service, but the Rails is pushing REST over SOAP and is sending that message.

Having feeds is critical.  They want to make Atom native to Rails.  He thinks OpenID will be key.  Maybe not all applications need OpenID, but thinks that it will be a core component going forward.

I like this.  We are moving all of our apps to OpenID.  I have a plugin that does OpenID.  I hope they show some action in this space.  I would love to see really good OpenID support.

Breakpoints are bad.  1.8.5 broke them by fixing the bug that breakpoints depended on.  ruby-debug replaces it.  This is not new, but is good to see.  Ken

DHH is addressing the fact that HTTP <strong>performance</strong> matters.  This is good.  You can factor out css and javascript into separate files is good for understanding.  However, in deployment it is better to have one javascript include and one css include.  Then zip it up.  Use the same include tags:

{% highlight ruby %}
<%= javascript_include_tag :all, :cache => true %>.
<%= stylesheet_link_tag :all, :cache => true %>
{% endhighlight %}

They found that http performance made the biggest difference.  This reduces the number of connections made to the server by the browser.

He is showing that you can serve assets from other locations with a simple configuration.

Hopefully he loads this code up so we can pull it down.  I canâ€™t type fast enough.

They are adding query caching.  More performance goodness.

Config/Initializers.  You can move code out of environment.rb and into a series of file that let you configure each item that needs to be configured into separate files.

New migrations look like this:
{% highlight ruby %}
Create_table :people do |t|
  t.integer :account_id, other_int_column
  t.string :stuff
end
{% endhighlight %}
They switched the types and names so that you

Added HTTP Authentication in.  This is very nice for machine authentication. Looks Like this:

{% highlight ruby %}
authenticate_or_request_with_http_basic

or

authenticate_with_http_basic
{% endhighlight %}

Rails guys prefer the MIT license.  Plugin generator assumes that you want to use the MIT license now so if you want something else you'll have to change it.

<strong>Spring Cleaning</strong>
They deprecated stuff so if you are getting warnings in your app expect those things to be removed in Rails 2.0.




