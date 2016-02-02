---
title: The Rails Way Jamis Buck, Michael Koziarski
author: Justin Ball
layout: post
permalink: /2007/05/20/the-rails-way-jamis-buck-michael-koziarski/
categories:
  - RailsConf
  - RailsConf07
tags:
  - jamis buck
  - RailsConf07
  - Ruby On Rails
---

Don't forget to look at <a href="http://www.therailsway.com/">The Rails Way blog</a>.

Move logic into your model.  This lets you break functionality into more granular components and makes testing easier.  Keep your controllers skinny. <a href="http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model"> Jamis blogged about this principle here.</a>

Use before filters to setup state before your controller runs.  Use before_create in your models.

ActiveSupport helps you make your code intention revealing.  Ruby code can be self documenting.

has_many, belong_to makes your code powerful easy to use, but many users donâ€™t use the power of the associations.
{% highlight ruby %}
Document.find_all_by_user_id(@john.id)

vs

@john.documents # this one hits the db once and then stores the objects in memory.  After the call you don't have to keep hitting the db.
{% endhighlight %}


You can do the same with
{% highlight ruby %}
 @john.documents.find(:all, :conditions => ....
{% endhighlight %}

try this:
{% highlight ruby %}
@cool.documents.find_by_user_id(@john.id)
{% endhighlight %}

then define it as a method:
{% highlight ruby %}
@cool.documents_authored_by(@john.id)
{% endhighlight %}
just be sure to not duplicate the method in both the tags and authors models that is difficult to maintain.
You might prefer:
{% highlight ruby %}
@john.documents.tagged_with(@cool)
{% endhighlight %}

Don't use the '!!' idiom.  What you are doing is saying not not.
{% highlight ruby %}
def account_code?
  !!@account_code.nil? # will return false if account_code nil
end
{% endhighlight %}

this is better
{% highlight ruby %}
def account_code?
  @account_code ? true : false
end
{% endhighlight %}

or you can do this
{% highlight ruby %}
# make sure to document true because... false because...
def account_code?
  if @account_code
    true
  else
    false
  end
end
{% endhighlight %}

I'm tired of typing code.  I'll post a link to the slides when they get them up.

Simplify 'New' for creating objects with associations by creating a method in your model called build with associations that does that work for you instead of creating a bunch of objects and then associating them in the controller

Simplify your routes.  If you are pointing to the same controller all the time use <strong>with_options</strong>

you can make better urls like this
{% highlight ruby %}
def to_param
  "#{id}-#{name}"
end

find(params[:id])
{% endhighlight %}
but you have to be careful in your controller to make sure that other methods work with params[:id]
{% highlight ruby %}
returning new do |billable|
  billable.contract = Contract.new
end
{% endhighlight %}
is the same as
{% highlight ruby %}
billable = new
billable.contract = Contract.new
return billable
{% endhighlight %}
but looks cool

How do you deal with validations when you have a lot of associations.  I have dealt with this and it sucks.  I have had to force the various objects to validate and then pull the errors into an error object then show the errors from that object.

