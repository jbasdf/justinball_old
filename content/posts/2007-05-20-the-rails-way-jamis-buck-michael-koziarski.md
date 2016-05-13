---
title: The Rails Way Jamis Buck, Michael Koziarski
author: Justin Ball
layout: post
permalink: /2007/05/20/the-rails-way-jamis-buck-michael-koziarski/
tags:
  - RailsConf
  - RailsConf07
  - jamis buck
  - RailsConf07
  - Ruby On Rails
---

Don't forget to look at <a href="http://www.therailsway.com/">The Rails Way blog</a>.

Move logic into your model.  This lets you break functionality into more granular components and makes testing easier.  Keep your controllers skinny. <a href="http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model"> Jamis blogged about this principle here.</a>

Use before filters to setup state before your controller runs.  Use before_create in your models.

ActiveSupport helps you make your code intention revealing.  Ruby code can be self documenting.

has_many, belong_to makes your code powerful easy to use, but many users donâ€™t use the power of the associations.
<pre><code class="ruby">
Document.find_all_by_user_id(@john.id)

vs

@john.documents # this one hits the db once and then stores the objects in memory.  After the call you don't have to keep hitting the db.
</pre></code>


You can do the same with
<pre><code class="ruby">
 @john.documents.find(:all, :conditions => ....
</pre></code>

try this:
<pre><code class="ruby">
@cool.documents.find_by_user_id(@john.id)
</pre></code>

then define it as a method:
<pre><code class="ruby">
@cool.documents_authored_by(@john.id)
</pre></code>
just be sure to not duplicate the method in both the tags and authors models that is difficult to maintain.
You might prefer:
<pre><code class="ruby">
@john.documents.tagged_with(@cool)
</pre></code>

Don't use the '!!' idiom.  What you are doing is saying not not.
<pre><code class="ruby">
def account_code?
  !!@account_code.nil? # will return false if account_code nil
end
</pre></code>

this is better
<pre><code class="ruby">
def account_code?
  @account_code ? true : false
end
</pre></code>

or you can do this
<pre><code class="ruby">
# make sure to document true because... false because...
def account_code?
  if @account_code
    true
  else
    false
  end
end
</pre></code>

I'm tired of typing code.  I'll post a link to the slides when they get them up.

Simplify 'New' for creating objects with associations by creating a method in your model called build with associations that does that work for you instead of creating a bunch of objects and then associating them in the controller

Simplify your routes.  If you are pointing to the same controller all the time use <strong>with_options</strong>

you can make better urls like this
<pre><code class="ruby">
def to_param
  "#{id}-#{name}"
end

find(params[:id])
</pre></code>
but you have to be careful in your controller to make sure that other methods work with params[:id]
<pre><code class="ruby">
returning new do |billable|
  billable.contract = Contract.new
end
</pre></code>
is the same as
<pre><code class="ruby">
billable = new
billable.contract = Contract.new
return billable
</pre></code>
but looks cool

How do you deal with validations when you have a lot of associations.  I have dealt with this and it sucks.  I have had to force the various objects to validate and then pull the errors into an error object then show the errors from that object.

