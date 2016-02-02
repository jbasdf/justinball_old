---
layout: post
author: Justin Ball
title: "Session timeout for your Ember application"
date: 2014-01-02 15:58:19 -0700
categories:
  - Ember
  - Javascript
  - Programming
---

We ran into an issue with sessions timing out while users were doing client side stuff with an Ember application we're building.
Once the session timed out they could no longer make authenticated requests of course and all ajax calls would fail.

Here's a couple of bits of code that might be helpful.

First capture 401 errors in your REST adapter and send the user to the sign in page if they've been logged out:

{% highlight javascript %}

var Adapter = DS.RESTAdapter.extend({

  ajaxError: function(jqXHR){
    if(jqXHR.status == 401){
      window.location.href = '/users/sign_in?timeout=true';
    }
    if(jqXHR){
      jqXHR.then = null;
    }
    return jqXHR;
  }
});

{% endhighlight %}

We wanted something a bit more user friendly than a redirect so we proactively warn the user and then send keep alives as needed.
The solution is an Ember component that uses Twitter Bootstrap modals to warn the user. The code assumes
you have Twitter Bootstrap setup. If you don't want to use Twitter Bootstrap then it should be pretty easy to swap out the
html in the Handlebars template for whatever framework modal you want to use. Check out the comments for more details.


<a href="https://gist.github.com/jbasdf/8228953">Gist for Handlebars template</a>
{% highlight html %}
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button {{action 'close'}} type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="tmModalLabel">Inactivity Warning</h4>
      </div>
      <div class="modal-body">
        You will be logged out in 30 seconds.
      </div>
    </div>
  </div>
</div>
{% endhighlight %}


<a href="https://gist.github.com/jbasdf/8229029">Gist for Ember component javascript</a>

{% highlight javascript %}

App.InactivityWarningComponent = Ember.Component.extend({

  active: false,
  inactiveTimeout: 12000000, // Amount of time before we redirect to the sign in screen - the session should have expired by this point. (20 minutes)
  warningTimeout: 30000,     // Amount of time the user has to perform an action before the last keep alive fires - 30 seconds
  timeout: 1170000,          // 19.5 minutes. We want to be less than the 20 minute timeout to be sure the session is renewed.

  didInsertElement: function(){
    //if($('meta[name="in-development"]').attr('content')){ return; } // Uncomment and add a meta tag to your head if you want to avoid session timeout in development
    var context = this;

    var keepActive = function(){
      if(context.active){
        // Keep the session alive
        $.ajax({
          url: "/stayin_alive"
        }).done(function(result){

          // Go inactive until the user moves the mouse or presses a key
          context.active = false;

          // The user now has another 20 minutes before the session times out
          // Restart the timer to keep the user logged in
          Ember.run.later(context, keepActive, context.timeout);

          // Set a timer to show a modal indicating the user is about to be logged out.
          Ember.run.debounce(context, context.show, context.timeout - context.warningTimeout);

          // Set a timer that will send the user to the login screen
          Ember.run.debounce(context, context.forceLogin, context.inactiveTimeout);
        });
      }
    };

    $(window).mousemove(function(e){
      context.active = true;
      // Make sure the modal is hidden. This will cause the modal to hide if the user moves the mouse or presses a key.
      // Use debounce so we don't call it over and over again since this method is called from mousemove
      Ember.run.debounce(context, context.hide, 1000);
    });

    $(window).keypress(function(e){
      context.active = true;
      // Make sure the modal is hidden. This will cause the modal to hide if the user moves the mouse or presses a key.
      context.hide();
    });

    // The user has 5 minutes before they are logged out. We need to send a keep Active before then.
    Ember.run.later(context, keepActive, context.timeout);

  },

  forceLogin: function(){
    window.location.href = '/users/sign_out?timeout=true';
  },

  show: function(){
    // Warn the user that they will be logged out if we are inactive
    if(this.active === false){
      // Start countdown timer
      this.$('.modal').modal('show');
    }
  },

  hide: function(){
    this.$('.modal').modal('hide');
  }

});

{% endhighlight %}