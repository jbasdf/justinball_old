---
title: Handle Keyboard events in an Ember.js view
author: Justin Ball
layout: post
tags:
  - Javscript
  - Ember.js
---

<p>We ran into a situation where we wanted to be able to close our ember.js view (a modal) when the user pressed the esc key.
At first I thought the solution was easy and I ended up with some code like this:</p>

<pre><code class="javascript">
App.ModalView = Ember.View.extend({

  didInsertElement: function(){
    $(document).on('keyup', { _self: this }, this.esc_close);
  },

  esc_close: function(e){
    if(e.which == 27){
      e.data._self.close();
    }
  },

  close: function(controller){
    $(document).off('keyup', this.esc_close);
    this.get('controller').send('modal_close');
  }

});
</pre></code>

<p>That code worked great until we ran into a situation where the ember view was removed from the DOM via a transition rather
  than by its own close method. In that situation "this.get('controller')" would be null the next time the user pressed
  the esc key since the "esc_close" method was still bound to the document's keyup event but the view had actually
  gone away along with it's related controller. Since it's always nice/better to do things the ember way
  that led us to investigate the view's eventManager</p>

<pre><code class="javascript">
App.ModalView = Ember.View.extend({

  didInsertElement: function() {
    return this.$().focus();
  },

  eventManager: Ember.Object.create({
    keyUp: function(event, view) {
      if(event.which == 27){
        view.get('controller').send('modal_close');
      }
    }
  })

});
</pre></code>

<p>We could have also just defined a keyUp method directly on the view, but it's always fun to play with new stuff.
Unfortunately, this didn't work. It looks like it should and it fact it does exactly what you've asked it to do. It
watches for keyUp events on the view, but not global keyUp events. The user has to click on some part of your view
to give it focus and then press the esc key. We even tried setting the focus and add tabIndex="0" to our top level div.
Those techniques kind of worked, but it still didn't feel right. We found that we still had to click on the page to get
the keyUp event to make it into our view. For end users that wasn't going to work so back to our original code we went.
Here's what ended up working:</p>

<pre><code class="javascript">
App.ModalView = Ember.View.extend({

  didInsertElement: function(){
    $(document).on('keyup', { _self: this }, this.esc_close);
  },

  esc_close: function(e){
    if(e.which == 27){
      e.data._self.close();
    }
  },

  close: function(controller){
    this.get('controller').send('modal_close');
  },

  willDestroyElement: function(){
    $(document).off('keyup', this.esc_close);
  }

});

</pre></code>

<p>All we needed to do was be sure to get rid of our keyup binding in 'willDestroyElement' rather than trying to handle it on
  our own in the close method. Now we can still be bound to the global key events but ember will ensure that our handlers
go away when the view does.</p>


