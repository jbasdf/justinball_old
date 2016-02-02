---
title: Immutable Arrays in Ember.js
author: Justin Ball
layout: post
categories:
  - Javscript
  - Ember.js
---

<p>I ran into another interesting situation with ember.js today. We make a request to the server to get a collection
of objects for the application route. That request sends parameters that the server uses to filter the results
which means that ember will give you an immutable object. The code is pretty typical and looks like this:</p>

{% highlight javascript %}
App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return App.Course.find({user_id: user_id});
  }

});

{% endhighlight %}


<p>Note that if you do this and then later on attempt to add new items to the resulting array you might not get any errors -
  I didn't. Ember does throw an exception but Chrome threw them away. I'm guessing I have something turned off.
  Since we needed to be able to add new items on the client and have that update the UI. We ended up creating
  an ArrayProxy, inserting the items into that and then returning that as the model for the route.
  I don't know if this is the "right way" but it does work:</p>

{% highlight javascript %}
App.ApplicationRoute = Ember.Route.extend({

  contacts: Ember.ArrayProxy.create({content: []}),

  model: function(){
    //var current_user = this.controllerFor('currentUser');
    var user_id = 1; //current_user.get('id');
    var contacts = App.Course.find({professor_id: user_id});
    contacts.on('didLoad', function(){
      contacts.forEach(function(course){
        if(!this.contacts.contains(course)){
          this.contacts.pushObject(course);
        }
      }.bind(this));
    }.bind(this));
    return this.contacts;
  }

});

{% endhighlight %}
