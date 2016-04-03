---
layout: reveal
author: Justin Ball
title: "Ember.js Lessons Learned So Far"
date: 2014-03-11 21:44:32 -0600
categories:
- Ember.js
- Javascript
---

<div class="slides">

  <section>
    <h1>Ember.js</h1>
    <h3>Lessons Learned and Stuff</h3>
    <p>
      <small><a href="http://www.justinball.com">Justin Ball</a> / <a href="http://twitter.com/jbasdf">@jbasdf</a></small>
    </p>
  </section>

  <section>
    <div class="left">
      <h2>Justin Ball</h2>
    </div>
    <div class="right">
      <ul>
        <li>CTO <a href="http://www.atomicjolt.com">Atomic Jolt</a></li>
        <li>Consultant, Rubyist, Javascriptist, Cyclist, Maker, Entrepreneur</li>
        <li>Purveyor of Buzzwords</li>
      </ul>
    </div>
  </section>

  <section>
    <section>
      <h2>What is Ember.js?</h2>
      <div class="block">
        <ul>
          <li>A framework for creating ambitious web applications.</li>
          <li>Client-side MVC Framework</li>
          <li><a href="https://github.com/emberjs/ember.js">Open Source</a> - <a href="https://github.com/emberjs/ember.js/pulse/monthly">Github Pulse</a></li>
          <li>Single page apps are sexy</li>
          <li>Ember.js makes it easy*</li>
        </ul>
      </div>
      <div class="block">
        <p class="small">* Easy is exclusive of the tears shed while learning Ember.js</p>
      </div>
    </section>
    <section>
      <h2>Why Single Page Apps?</h2>
      <p class="fragment roll-in">iFrames!</p>
      <p class="fragment roll-in">Safari and IE no longer let you write a cookie to an iFrame unless the user has visited the site</p>
      <p class="fragment roll-in">Real World - LTI apps</p>
    </section>
  </section>

  <section>
    <h2>Heads Up</h2>
    <ul>
      <li>Ember.js changes a lot</li>
      <li>Ignore anything over 3 or 4 months old</li>
      <li>When you choose Ember.js you are all in</li>
    </ul>
  </section>

  <section>
    <section>
      <h2>Using Rails?</h2>
      <p><a href="https://github.com/emberjs/ember-rails">Ember.js Rails Gem</a></p>
      <pre><code data-trim contenteditable>
gem 'ember-rails'
gem 'ember-source', '1.4.0' # or the version you need
      </code></pre>
      <pre><code data-trim contenteditable>
//= require handlebars
//= require ember
//= require ember-data
      </code></pre>
    </section>
    <section>
      Why choose the gem over anything else?
    </section>
    <section>
      <a href="http://yehudakatz.com/">Yehuda Katz</a>
    </section>
  </section>

  <section>
    <section>
      <h2>AMD?</h2>
      <p class="fragment block">I love require.js</p>
      <p class="fragment block">fogetaboutit</p>
      <p class="fragment block">Or Try <a href="http://ryanflorence.com/">Ryan Florence's</a> <a href="https://github.com/rpflorence/ember-tools">Ember Tools*</a></p>
      <p class="fragment block small"><a href="/2013/08/01/building-with-ember#select_doesnt_work">*See "Ember Select doesn't work" on this page to learn about the dangers</a></p>
    </section>
    <section>
      <h2>Feel Good About Polluting The Global Namespace</h2>
      <pre><code data-trim contenteditable>
App = Ember.Application.create({
});
      </code></pre>
    </section>
  </section>

  <section>
    <h2>I don't do Rails</h2>
    <div class="block">
      <p class="fragment roll-in">Try</p>
      <p class="fragment roll-in"><a href="https://github.com/stefanpenner/ember-app-kit">Ember App Kit</a></p>
    </div>
  </section>

  <section>
    <section>
      <h2>Ember.js and AngularJS</h2>
      <p>Everything is Awesome</p>
      <p>
        <a href="https://docs.google.com/presentation/d/1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA/preview?sle=true#slide=id.p">
          AngularJS from an Ember perspective
        </a>
      </p>
    </section>
    <section>
      <iframe src="https://docs.google.com/presentation/d/1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA/preview?sle=true#slide=id.p&embedded=true" width="600" height="780" style="border: none;"></iframe>
    </section>
  </section>

  <section>
    <section>
      <h2>Ember.js is Magic!</h2>
      <p class="fragment roll-in">Except for when it's not</p>
    </section>
    <section>
      <h2><a href="/2013/08/01/building-with-ember#error_messages">Debugging</a></h2>
      <p>The Bug</p>
      <blockquote>
        Assertion failed: Cannot call get with 'id' on an undefined object. application.js?body=1:16925
        Uncaught TypeError: Cannot read property '__ember1375726885234_meta' of undefined
      </blockquote>
      <p>The Code</p>
      <pre><code data-trim contenteditable>
var map = MapModel.createRecord({
  title: 'New Map'
});
map.save().then(function(){
  this.transitionTo('map', map);
}.bind(this));
      </code></pre>
      <p class="fragment roll-in">The Cause?</p>
      <p class="fragment roll-in">Failure to call 'transition.abort();'</p>
    </section>
    <section>
      <h2><a href="/2013/08/01/building-with-ember#error_messages">Now We Know Better</a></h2>
      <blockquote>
      Assertion failed: Cannot call get with 'id' on an undefined object. application.js?body=1:17079
      Uncaught TypeError: Cannot read property '__ember1375989556474_meta' of undefined application.js?body=1:18391
      Trying to get configured shortcut getDocumentSelection.js:51
      Assertion failed: Emptying a view in the inBuffer state is not allowed and should not happen under normal circumstances. Most likely there is a bug in your application. This may be due to excessive property change notifications.
      </blockquote>
      <pre><code data-trim contenteditable>
{% raw %}
&lt;li&gt;{{#linkTo 'map.destroy' title=&quot;Delete the current map&quot;}}&lt;i class=&quot;icon-trash&quot;&gt;&lt;/i&gt; Delete{{/linkTo}}&lt;/li&gt;
{% endraw %}
      </code></pre>
      <p class="fragment roll-in">No we don't. 'map' was null.</p>
    </section>
    <section>
      <h2><a href="/2013/08/01/building-with-ember#error_messages_again">Now That We're Experts</a></h2>
      <blockquote>
      Assertion failed: Cannot call get with 'id' on an undefined object. ember.js?body=1:364
      Uncaught TypeError: Cannot read property '__ember1377186615643_meta' of undefined ember.js?body=1:1676
      Assertion failed: Emptying a view in the inBuffer state is not allowed and should not happen under normal circumstances. Most likely there is a bug in your application. This may be due to excessive property change notifications. ember.js?body=1:364
      Uncaught Error: You cannot modify child views while in the inBuffer state ember.js?body=1:18835
      </blockquote>
      <p class="fragment roll-in">"Most likely there is a bug in your application"</p>
      <p class="fragment roll-in">Would not have guessed that</p>
    </section>
    <section>
      <p>Bad Code</p>
      <pre><code data-trim contenteditable>
{% raw %}
{{#each post in Posts}}
  {{#linkTo 'posts.show' title="View post"}}{{post.name}}{{/linkTo}}
{{/each}}
{% endraw %}
      </pre></code>
      <p>Good Code</p>
      <pre><code data-trim contenteditable>
{% raw %}
{{#each post in Posts}}
  {{#linkTo 'posts.show' post title="View post"}}{{post.name}}{{/linkTo}}
{{/each}}
{% endraw %}
      </pre></code>
      <p class="fragment roll-in">Forgot to include 'post'</p>
    </section>
  </section>

  <section>
    <section>
      <h2><a href="/2013/08/30/dont-forget-your-period-computed-property-that-depends-on-ember_arraycontroller-contents/">(Really) Little Things Matter</a></h2>
      <pre><code data-trim contenteditable>
App.ContactController = Ember.ObjectController.extend({
  needs: ['selected_contacts'],
  selectedContacts: null,
  selectedContactsBinding: 'controllers.selected_contacts.content',

  isSelected: function(){
    console.log('Checking Selected for' + this.get('name'));
    return this.selectedContacts.contains(this.get('content'));
  }.property('selectedContacts@each')

});
      </code></pre>
      <p class="fragment roll-in">It looks like the #$%#! sample code.</p>
      <p class="fragment roll-in">But isSelected never fires!!!!</p>
    </section>
    <section>
      <h2>I see you still use email</h2>
      <p>Bad</p>
      <pre><code data-trim contenteditable>
property('selectedContacts@each')
      </code></pre>
      <p>Good</p>
      <pre><code data-trim contenteditable>
property('selectedContacts.@each')
      </code></pre>
    </section>
  </section>


  <section>
    <section>
      <h2>Multiple Ember Apps in a Rails App</h2>
      <p>Stay DRY. Share code</p>
    </section>
    <section>
      <p>Setup to reuse code from 'Common'</p>
      <pre><code class="more_code">
Common
  components
  helpers
  models
  mixins
  templates
SomethingAwesome
  controllers
  helpers
  mixins
  routes
  templates
  views
Admin
  controllers
  helpers
  mixins
  routes
  templates
  views
      </code></pre>
    </section>
    <section>
      <h2>The Problem</h2>
      <p>Ember won't be able to find your templates</p>
    </section>
    <section>
      <h2>The Solution</h2>
      <p>Override the Resolver</p>
      <pre><code data-trim contenteditable>
AppNamespace = 'SomethingAwesome';
SomethingAwesome = Ember.Application.create({

  Resolver: Ember.DefaultResolver.extend({
    resolveTemplate: function(parsedName){
      var fullNameWithoutType = parsedName.fullNameWithoutType;
      parsedName.fullNameWithoutType = AppNamespace + "/" + fullNameWithoutType;
      var result = this._super(parsedName);
      if(!result){
        parsedName.fullNameWithoutType = "common/" + fullNameWithoutType;
        result = this._super(parsedName);
      }
      return result;
    }
  })

});
      </code></pre>
      <p><a href="https://github.com/tatemae/oea">Check out Open Assessments source for an example</a></p>
    </section>
  </section>

  <section>
    <section>
      <h2>Transitions</h2>
      <p>Do This Infinitely</p>
      <pre><code data-trim contenteditable>
App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return this.store.find('user', params.user_id);
  },

  afterModel: function(transition){
    this.transitionTo('anotherPlace');
  }
});
      </code></pre>
    </section>
    <section>
      <p>Check Your Target</p>
      <pre><code data-trim contenteditable>
App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return this.store.find('user', params.user_id);
  },

  afterModel: function(transition){
    if(transition.targetName == "application.index"){
      this.transitionTo('anotherPlace');
    }
  }
});
      </code></pre>
    </section>
  </section>

  <section>
    <h2><a href="/2013/08/01/building-with-ember/">Choose your event names wisely</a></h2>
    <p>'destroy' is reserved</p>
    <pre><code data-trim contenteditable>
    {% raw %}
&lt;a href=&quot;#&quot; {{action 'destroy'}} class=&quot;btn&quot;&gt;Delete&lt;/a&gt;
    {% endraw %}
    </code></pre>
    <p>'destroy_node' is not</p>
    <pre><code data-trim contenteditable>
    {% raw %}
&lt;a href=&quot;#&quot; {{action 'destroy_node'}} class=&quot;btn&quot;&gt;Delete&lt;/a&gt;
    {% endraw %}
    </code></pre>
  </section>

  <section>
    <h2><a href="/2013/08/01/building-with-ember/">Set controller for route</a></h2>
    <pre><code data-trim contenteditable>
var ThingEditRoute = Ember.Route.extend({
  controllerName: 'thing',
  renderTemplate: function(controller, model){
    // You have to pass the controller to render or it will generate a new controller
    this.render({ controller: controller, into: 'application', outlet: 'modal' });
  }
});
    </code></pre>
    <p>Looks easy but couldn't find the docs</p>
  </section>

  <section>
    <h2><a href="/2013/08/29/pass-attributes-to-an-emberjs-view/">Pass a Value to a View</a></h2>
    <p>Add a property to your view:</p>
    <pre><code data-trim contenteditable>
App.ModalView = Ember.View.extend({
  aClassName: 'modal'
});
    </code></pre>

    <p>Use the value in your view template:</p>
    <pre><code data-trim contenteditable>
    {% raw %}
&lt;div {{bindAttr class=&quot;view.aClassName&quot;}}&gt;
  More stuff here
&lt;/div&gt;
    {% endraw %}
    </code></pre>

    <p>When you use the view just set the property:</p>
    <pre><code data-trim contenteditable>
    {% raw %}
{{#view App.ModalView aClassName="wide_modal"}}
  Some great content goes here
{{/view}}
    {% endraw %}
    </code></pre>
  </section>

  <section>
    <section>
      <h2><a href="2013/08/29/immutable-arrays-in-ember/">Immutable Arrays</a></h2>
      <p>Adding parameters to 'find' results in an immutable model</p>
      <pre><code data-trim contenteditable>
App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('course', {user_id: user_id});
  }
});
      </code></pre>
    </section>
    <section>
      <p>Use an ArrayProxy to builid a collection that can be modified</p>
      <pre><code data-trim contenteditable>
App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    var courses = Ember.ArrayProxy.create({content: []});
    this.store.find('courses', user_id: user_id}).then(function(data){
      data.forEach(function(course){
        if(!courses.contains(course)){
          courses.pushObject(course);
        }
      }.bind(this));
    }.bind(this));
    return courses;
  }
});
      </code></pre>
      <p class="fragment block">But then you have to manually keep the collection updated.</p>
    </section>
    <section>
      <h2>Even Better - Filters!</h2>
      <pre><code data-trim contenteditable>
var filter = this.store.filter('course', function(course){
  return !course.get('user_id') == userId;
});
this.controllerFor('courses').set('model', filter);

// Load all courses into the store.
Ember.run.once(this, function(){
  this.store.find('course');
});
    </code></pre>
    </section>
  </section>

  <section>
    <section>
      <h2>What about Ember Data?</h2>
      <p class="fragment block">Beta</p>
      <p class="fragment block">Rapidly evolving</p>
      <div class="fragment block">
        <p>Not Production Ready*</p>
        <div class="block">
          <p class="small">* We use it in production anyway</p>
        </div>
      </div>
    </section>
    <section>
      <h2>More Ember Data</h2>
      <p>All pre-beta examples on the internet are now wrong</p>
      <p><a href="https://github.com/emberjs/data/blob/master/TRANSITION.md">Let the Ember Data Transition Guide Take You to a Happy Place</a></p>
      <p>1.0 Beta changed to reduce dependance on global application object</p>
    </section>
    <section>
      <div class="left">
        <p>Ember Data 0.13</p>
        <pre><code data-trim contenteditable>
App.Post.find();
App.Post.find(params.post_id);
        </code></pre>
      </div>
      <div class="right">
        <p>Ember Data 1.0.beta.1:</p>
        <pre><code data-trim contenteditable>
this.store.find('post');
this.store.find('post', params.post_id);
        </code></pre>
      </div>
    </section>
    <section>
      <div class="left">
        <p>Ember Data 0.13</p>
        <pre><code data-trim contenteditable>
App.Post.createRecord();
        </code></pre>
      </div>
      <div class="right">
        <p>Ember Data 1.0.beta.1:</p>
        <pre><code data-trim contenteditable>
this.store.createRecord('post');
        </code></pre>
      </div>
    </section>
  </section>

  <section>
    <h2>I already have Rails models</h2>
    <p><a href="2013/09/28/generate-ember.js-models-using-your-rails-schema/">Generate Ember.js Models Using Your Rails Schema*</a><p>
    <pre><code class="more_code" data-trim contenteditable>
namespace :ember do

  desc "Build ember models from schema"
  task :models => :environment do

    # Change these values to fit your project
    namespace = 'App' # The Ember application's namespace.

    # The directory where ember models will be written. We drop them
    # in the tmp directory since we might not want an ember model for every table in the
    # database.
    output_dir = File.join(Rails.root, "tmp/ember_models")

    schema_file = File.join(Rails.root, 'db/schema.rb')

    current = ''
    file = ''
    max = 0
    attrs = []

    File.readlines(schema_file).each do |line|

      # Stuff to ignore
      next if line.strip.blank?
      next if /#.*/.match(line)
      next if /add_index.+/.match(line)
      next if /ActiveRecord::Schema.define/.match(line)

      # Find tables in the schema
      if m = /create_table \"(.+)\".*/.match(line)
        current = "#{namespace}.#{m.captures[0].classify.singularize} = DS.Model.extend({\n"
        file = "#{m.captures[0].singularize}.js"
      elsif m = /t\.(.+)\s+"([0-9a-zA-z_]+)".*/.match(line)
        max = m.captures[1].length if m.captures[1].length > max
        attrs << m.captures
      elsif m = /end/.match(line) && current.present?
        attrs.each_with_index do |attr, i|
          spaces = ''
          type = 'string'
          if %w(integer float).include?(attr[0])
            type = 'number'
          elsif %w(datetime time date).include?(attr[0])
            type = 'date'
          elsif %w(boolean).include?(attr[0])
            type = 'boolean'
          end
          comma = ','
          if attrs.size-1 == i
            comma=''
          end
          ((max + 1) - attr[1].length).times{spaces << ' '}
          if attr[1].ends_with?('_id')
            relation = attr[1][0...(attr[1].length-3)]
            current << "  #{relation}:    #{spaces}DS.belongsTo('#{relation.camelize(:lower).singularize}'),\n"
          end
          current << "  #{attr[1]}: #{spaces}DS.attr('#{type}')#{comma}\n"
        end
        current << "});\n"
        f = File.join(output_dir, file)
        if File.exists?(f)
          puts "Ember model already exists: #{f}"
        else
          current.gsub!('_spaces_', '')
          puts "Writing Ember model: #{f}"
          File.open(f, 'w'){|f| f.write(current)}
        end

        current = ''
        file = ''
        max = 0
        attrs = []

      else
        if /end/.match(line).blank?
          puts "Don't know how to handle: #{line}"
        end
      end

    end

  end

end
    </code></pre>
    <p class="small">*It's not my fault if this code nukes your site or ruins your relationships.</p>
  </section>

  <section>
    <section>
      <h2>Ember is Full of Promises</h2>
      <p class="fragment block">Think Asyncronous</p>
    </section>

    <section data-transition="linear" data-background-transition="slide">
      <h2>Make a Promise</h2>
      <h4>Docs Show This</h4>
      <pre><code class="more_code" data-trim contenteditable>
return new Promise(function(resolve, reject){
}.bind(this));
      </code></pre>
      <h4>But Do this</h4>
      <pre><code class="more_code" data-trim contenteditable>
return new Ember.RSVP.Promise(function(resolve, reject){
}.bind(this));
      </code></pre>
    </section>

    <section data-transition="linear" data-background="#c0392b" data-background-transition="slide">
      <h4>Original</h4>
      <p>Requirement: wait until the entire tree is loaded before transition.</p>
      <pre><code class="more_code" data-trim contenteditable>
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
      </code></pre>
    </section>

    <section data-transition="linear" data-background-transition="slide">
      <h4>The Refactor</h4>
      <pre><code class="more_code" data-trim contenteditable>

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

      </code></pre>
      <p><a href="http://jsbin.com/koveg/6/edit?html,js,console" target="_blank">Working code snippet on jsbin</a></p>
    </section>
  </section>

  <section>
    <section>
      <h2>You're sitting around doing nothing And...</h2>
      <pre><code class="more_code" data-trim contenteditable>
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
      </code></pre>
    </section>
    <section>
      <h2>You have to warn me about these things</h2>
      <pre><code class="more_code" data-trim contenteditable>
&lt;div class=&quot;modal fade&quot; tabindex=&quot;-1&quot; role=&quot;dialog&quot; aria-hidden=&quot;true&quot;&gt;
  &lt;div class=&quot;modal-dialog&quot;&gt;
    &lt;div class=&quot;modal-content&quot;&gt;
      &lt;div class=&quot;modal-header&quot;&gt;
        &lt;button  type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot; aria-hidden=&quot;true&quot;&gt;&amp;times;&lt;/button&gt;
        &lt;h4 class=&quot;modal-title&quot; id=&quot;tmModalLabel&quot;&gt;Inactivity Warning&lt;/h4&gt;
      &lt;/div&gt;
      &lt;div class=&quot;modal-body&quot;&gt;
        You will be logged out in 30 seconds.
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
      </code></pre>
    </section>
    <section>
      <h2>Component!</h2>
      <pre><code class="more_code" data-trim contenteditable>
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
      </code></pre>
      <p><a href="/2014/01/02/session-timeout-for-your-ember-application/">Ember.js Session Timeout In Depth</a></p>
    </section>
  </section>

  <section>
    <section>
      <h2><a href="/2013/10/24/ember-textfield-ignores-arrow-keys.-how-to-monitor-key-events-in-your-textfield/">Monitor key events in your textfield</a></h2>
      <p>Monitor changes as the user types</p>
      <pre><code data-trim contenteditable>
      {% raw %}
{{ view Ember.Textfield
  class="form-control"
  placeholderBinding="controller.prompt"
  valueBinding="controller.value"
  onEvent="keyPress"
  action="typing"
}}
      {% endraw %}
      </code></pre>
      <p class="fragment block">but keyPress doesn't fire when you press the arrow keys</p>
    </section>
    <section>
      <p>No problem! Make your own Textfield</p>
      <pre><code class="more_code" data-trim contenteditable>
App.Textfield = Ember.TextField.extend({

  init: function() {
    this._super();
    this.on("keyUp", this, this.interpretKeyEvents);
  },

  interpretKeyEvents: function(event){
    var map = TM.Textfield .KEY_EVENTS;
    var method = map[event.keyCode];
    if (method){
      return this[method](event);
    } else {
      this._super(event);
    }
  },

  arrowUp: function(event){
    this.sendAction('arrow-up', this, event);
  },

  arrowDown: function(event){
    this.sendAction('arrow-down', this, event);
  }

});

App.Textfield.KEY_EVENTS = {
  38: 'arrowUp',
  40: 'arrowDown'
};
      </code></pre>
    </section>
    <section>
      <p>Use that new code</p>
      <pre><code data-trim contenteditable>
      {% raw %}
{{ view App.Textfield
    class="form-control"
    placeholderBinding="view.prompt"
    valueBinding="view.value"
    viewName="inputField"
    arrow-up="arrowUp"
    arrow-down="arrowDown"
}}
      {% endraw %}
      </code></pre>
      <p>Add 'arrowUp' and 'arrowDown' to your controller and be filled with joy.</p>
    </section>
  </section>

  <section>
    <h1>THE END</h1>
    <h3>Justin Ball</h3>
    <p>justinball.com</p>
    <p>justinball@gmail.com</p>
    <p>@jbasdf</p>
    <p class="small" style="display:none;"><a href="/2014/03/12/emberjs-lessons-learned-so-far/#pdf-export">Download PDF</a></p>
  </section>

</div>