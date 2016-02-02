---
title: 'increment! and Mysql::Error: Lock'
author: Justin Ball
layout: post
permalink: /2010/08/05/increment-mysql-error/
categories:
  - Ruby on Rails
---
On a site I'm working on I started noticed a lot of production errors like this:

ActiveRecord::StatementInvalid: Mysql::Error: Lock wait timeout exceeded; try restarting transaction: UPDATE `users` SET `counter` = 2, `updated_at` = '2010-08-05 20:54:26' WHERE `id` = 1234

I traced the error back to a call in the user model:

{% highlight ruby %}
update_attribute(:start_time, DateTime.now)
increment!(:counter)
{% endhighlight %}

increment! is an ActiveRecord call. It looks convenient, but for some reason it leaves you with some SQL issues (or at least it gave me problems in my specific instance. The odd thing is that if it was a general problem I would expect to see the update error occur in other parts of the application where I do an update. However, in this application all the errors occurred at the same spot. It's possible that running two updates back to back could have caused the problem.

I changed the code to this which is more efficient anyway since there is only one call:

{% highlight ruby %}
update_attributes(:counter => self.counter += 1, :start_time => DateTime.now)
{% endhighlight %}

and all is well again.

If you run into a similar error, examine the code around the problem code. See if there are multiple updates or something similar that will cause the db to lock.