---
layout: post
author: Justin Ball
title: "Refactoring and Making Promises"
date: 2014-03-16 21:48:17 -0600
tags:
  - Javascript
  - Ember
  - Programming
---
After spending the last year writing Ember.js code I've realized one really big thing - Ember is about promises.
I recently had a chance to refactor some code with a number of asynchrounous calls. The original logic used
timers and polling to monitor the state of a bunch of recursive calls to the Google API to retrieve a complete
folder structure. Timers get the job done, but promises make it elegant.

<h4>Original Code</h4>
<p>Requirement: wait until the entire tree is loaded before transition.</p>
<pre><code class="javascript">
App.GoogleFile = Ember.Object.extend({
});

App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    var model = App.GoogleFile.create({
      id: $('meta[name="google-folder-id"]').attr('content');
      children: Ember.ArrayProxy.create({content: []})
    });
    this.loadChildren(model.get('children'));
    return model;
  },

  afterModel: function(transition){
    if(transition.targetName == "application.index"){
      this.wait(model.get('children'), function(){
        this.transitionTo('anotherPlace');
      });
    }
  },

  // Waiting for content to load using a timer.
  wait: function(children, callback){
    if(Ember.isEmpty(children)){
      Ember.run.later(this, function () {
        this.wait(children);
      }, 10);
    } else {
      callback(children);
    }
  },

  loadChildren: function(node){
    var token = $('meta[name="google-access-token"]').attr('content');
    var query = encodeURIComponent('"' + node.get('id') + '" in parents');
    $.get('https://www.googleapis.com/drive/v2/files?q=' + query + '&access_token=' + token, function(data){
      data.items.forEach(function(item){
        var f = App.GoogleFile.create({
          name: item.title,
          id: item.id,
          icon: item.iconLink,
          mime: item.mimeType,
          embed: item.embedLink,
          edit: item.alternateLink,
          children: Ember.ArrayProxy.create({content: []})
        });
        if(item.mimeType === "application/vnd.google-apps.folder"){
          this.loadChildren(f);
        }
        node.get('children').pushObject(f);
      }.bind(this));
    }.bind(this));
  }

});
</pre></code>

<h4>The Refactored Code</h4>
<pre><code class="javascript">

App = Ember.Application.create({
});

App.GoogleFile = Ember.Object.extend({
});

App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    var model = App.GoogleFile.create({
      id: $('meta[name="google-folder-id"]').attr('content');,
      children: Ember.ArrayProxy.create({content: []})
    });

    return new Ember.RSVP.Promise(function(resolve, reject){
      this.loadChildren(model, resolve, reject);
    }.bind(this));
  },

  // The afterModel won't fire until the promise is fullfilled.
  afterModel: function(transition){
    if(transition.targetName == "application.index"){
      this.transitionTo('anotherPlace');
    }
  },

  loadChildren: function(node, resolve, reject){
  var token = $('meta[name="google-access-token"]').attr('content');
    var query = encodeURIComponent('"' + node.get('id') + '" in parents');
    // Don't resolve the promise when the ajax call returns. We have to process the data and decide if we need to make more calls.
    $.get('https://www.googleapis.com/drive/v2/files?q=' + query + '&access_token=' + token, function(data){
      var promises = [];
      data.items.forEach(function(item){
        var f = App.GoogleFile.create({
          name: item.title,
          id: item.id,
          icon: item.iconLink,
          mime: item.mimeType,
          embed: item.embedLink,
          edit: item.alternateLink,
          children: Ember.ArrayProxy.create({content: []})
        });

        if(item.mimeType === "application/vnd.google-apps.folder"){
          // We need to make more ajax calls. Create a new promise which can be resposible for
          // resolving existing promises once it is fullfilled.
          var promise = new Ember.RSVP.Promise(function(resolve, reject){
            this.loadChildren(f, resolve, reject);
          }.bind(this));
          promises.push(promise);
        }
        node.get('children').pushObject(f);
      }.bind(this));

      Promise.all(promises).then(function(){
        resolve(node);
      });

    }.bind(this));
  }

});

</pre></code>

<p><a href="http://jsbin.com/koveg/6/edit?html,js,console" target="_blank">Working refactored code snippet on jsbin</a></p>
