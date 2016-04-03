---
title: 'Rails 2.3, Nested forms and wrong constant name User[billingAttributes])'
author: Justin Ball
excerpt: ruby on rails, nested forms, custom form builder
layout: post
permalink: /2009/04/16/rails-23-nested-forms-and-wrong-constant-name-userbillingattributes/
categories:
  - Ruby On Rails
---

I found a chance to try out the new nested forms in a project I've been working on for a long time.  (I actually tried them out a long time ago in Edge Rails, but then got burned when they pulled the functionality back out).

Everything looked like it would go well until I got this:

wrong constant name User[billingAttributes])

I cussed and cursed Rails and the plugin I am using for a few minutes and then decided that I was a grown up and a Rails programmer and I shouldn't be so stupid so I looked hard at the stack trace.  It then occurred to me that I had built out a custom form builder for the project and that this error is in fact my fault.

I have some ugly code that looks like this:
<pre><code class="ruby">
  def required_field?(field)
    @object_name.to_s.camelize.constantize.reflect_on_validations_for(field).map(&:macro).include?(:validates_presence_of)
  end
</pre></code>

Normally '@object_name' would give you the name of the object you are using like 'user' etc.  However, when you are using nested forms the object in this case is named 'User[billingAttributes]'.  I was in fact using the wrong value all along and lucking out.  It worked because I had never given it a reason not to.  That doesn't me I had the right code.  It just meant that I was kind of lucky in that it work and very lucky in that I caught it, but unlucky because my <a href="http://en.wikipedia.org/wiki/Duck_typing">code was quacking like a duck even though it was at best a pigeon</a>.

I now have some ugly code that looks like this which does work:
<pre><code class="ruby">
  def required_field?(field)
    reflect_on = object.class if !object.blank?
    if reflect_on.blank?
      reflect_on = @object_name.to_s.camelize.constantize rescue nil
    end
    if !reflect_on.blank?
      reflect_on.reflect_on_validations_for(field).map(&:macro).include?(:validates_presence_of)
    else
      false
    end
  end
</pre></code>