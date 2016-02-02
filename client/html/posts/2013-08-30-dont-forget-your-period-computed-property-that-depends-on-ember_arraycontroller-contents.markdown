---
layout: post
author: Justin Ball
title: "Don't miss the '.' - Computed Property that depends on Ember.ArrayController contents"
date: 2013-08-30 17:19:32 -0600
categories:
  - Javascript
  - Ember.js
---

<p>My fun/stupid ember mistake of the day. <a href="http://jsbin.com/ajocAJA/3/edit">I even put together a jsbin to help track down the problem.</a></p>

<p>It's a tiny problem that is hard to spot. Right there at the very end there's a property declared like this:<p>

{% highlight javascript %}
  property('selectedContacts.@each')
{% endhighlight %}

<p>It wasn't always that way. Once there was this:</p>

{% highlight javascript %}
  property('selectedContacts@each')
{% endhighlight %}

<p>
  The difference is subtle. It's hard to see especially when you've spent your life typing email addresses. No
  one misses a period until the entire application stops working and everyone is furious because "It looks just like the #@$@!# sample code."
  <strong>Don't forget the '.' that goes before '@each'.<strong>
</p>

{% highlight javascript %}
var App = Ember.Application.create();

App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    var contacts = Ember.ArrayProxy.create({content: []});
    contacts.pushObject({name: 'Bill'});
    contacts.pushObject({name: 'Sally'});
    return contacts;
  },
  setupController: function(controller, model){
    controller.set('model', model);

    var selectedContacts = Ember.ArrayProxy.create({content: []});
    this.controllerFor('selected_contacts').set('content', selectedContacts);
  }
});

App.ApplicationController = Ember.ArrayController.extend({
  needs: ['selected_contacts'],
  selectedContacts: null,
  selectedContactsBinding: 'controllers.selected_contacts.content',

  itemController: 'contact',
  selectContact: function(contact){
    this.selectedContacts.pushObject(contact);
  }
});

App.SelectedContactsController = Ember.ArrayController.extend({
  itemController: 'contact',

  watcher: function(){
    console.log('Selected contents changed. Length: ' + this.get('content.length'));
  }.observes('content')

});

App.ContactController = Ember.ObjectController.extend({
  needs: ['selected_contacts'],
  selectedContacts: null,
  selectedContactsBinding: 'controllers.selected_contacts.content',

  isSelected: function(){
    console.log('Checking Selected for' + this.get('name'));
    return this.selectedContacts.contains(this.get('content'));
  }.property('selectedContacts.@each')

});

{% endhighlight %}