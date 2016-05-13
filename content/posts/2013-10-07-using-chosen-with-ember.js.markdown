---
layout: post
author: Justin Ball
title: "Using Chosen with Ember.js"
date: 2013-10-07 12:35:47 -0600
tags:
  - Ember.js
  - Javascript
  - Programming
---

<p><a href="http://harvesthq.github.io/chosen/">Harvest's Chosen select control</a> is handy for cleaning up unwieldy or
horribly long select boxes. It's a nice little bit of UI sugar that can help make your users happier and we all like
happy users right?. <a href="http://emberjs.com/">Ember.js</a> is now our Javascript framework of choice but it doesn't
always play well with other libraries and plugins - at least not without messsing around with it for a bit.</p>

<p><a href="http://stackoverflow.com/questions/9968222/ember-js-chosen-integration">There are others out there that want to
  use Chosen in their Ember application.</a> I tweaked the last bit of code in this
  <a href="http://stackoverflow.com/questions/9968222/ember-js-chosen-integration">StackOverflow question</a> a bit
to produce a working view that extends Ember.Select.</p>

<p><a href="https://gist.github.com/jbasdf/6872750">Here's gist of the code</a> and here's the code:</p>

<pre><code class="javascript">


App.Chosen = Ember.Select.extend({

  multiple: false,
  width: '95%',
  disableSearchThreshold: 10,
  searchContains: true,
  attributeBindings:['multiple', 'width', 'disableSearchThreshold', 'searchContains'],

  didInsertElement: function(){
    this._super();

    var options = {
      multiple: this.get('multiple'),
      width: this.get('width'),
      disable_search_threshold: this.get('disableSearchThreshold'),
      search_contains: this.get('searchContains')
    };

    options.clean_search_text = this.cleanSearchText;
    options.calling_context = this;

    if(this.get('multiple')){
      options.placeholder_text_multiple = this.get('prompt');
    } else {
      options.placeholder_text_single = this.get('prompt');
    }

    this.$().chosen(options);

    // observes for new changes on options to trigger an update on Chosen
    return this.addObserver(this.get("optionLabelPath").replace(/^content/, "content.@each"), function() {
      return this.rerenderChosen();
    });

  },

  _closeChosen: function(){
    // trigger escape to close chosen
    this.$().next('.chosen-container-active').find('input').trigger({type:'keyup', which:27});
  },

  cleanSearchText: function(option, context){
    return option.text;
  },

  rerenderChosen: function(){
    // Don't trigger Chosen update until after DOM elements have finished rendering.
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.$().trigger('chosen:updated');
    });
  }

});

</pre></code>

<p>UPDATE - The ember script tags will show up in the search which is not something you want. I had to modify the chosen.js source code for a solution.
Luckily it is pretty simple:</p>

<p><a href="https://gist.github.com/jbasdf/6920497">Gist of chosen.jquery.js modified to include the clean_search_text method.</a></p>

<p>In the AbstractChosen.prototype.set_default_values method I added an option for a clean_search_text method. You can add this method
  to your own code and then cleanup the search text to be whatever you like ie remove script tags. The method I used is
cleanSearchText in the code above. Notice that I pass it to chosen with "options.clean_search_text = this.cleanSearchText;"</p>

<pre><code class="javascript">
AbstractChosen.prototype.set_default_values = function() {
  var _this = this;

  this.click_test_action = function(evt) {
    return _this.test_active_click(evt);
  };
  this.activate_action = function(evt) {
    return _this.activate_field(evt);
  };
  // MODIFIED - Added clean_search_text method so that the caller can clean up the search text
  this.clean_search_text = this.options.clean_search_text || function(option){ return option.html; };
  this.calling_context = this.options.calling_context;
  this.active_field = false;
  this.mouse_on_container = false;
  this.results_showing = false;
  this.result_highlighted = null;
  this.result_single_selected = null;
  this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
  this.disable_search_threshold = this.options.disable_search_threshold || 0;
  this.disable_search = this.options.disable_search || false;
  this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
  this.group_search = this.options.group_search != null ? this.options.group_search : true;
  this.search_contains = this.options.search_contains || false;
  this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
  this.max_selected_options = this.options.max_selected_options || Infinity;
  this.inherit_select_classes = this.options.inherit_select_classes || false;
  this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
  return this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
};
</pre></code>

<p>In the AbstractChosen.prototype.results_option_build method I had to add a conditional where it says MODIFIED:</p>

<pre><code class="javascript">
  AbstractChosen.prototype.results_option_build = function(options) {
    var content, data, _i, _len, _ref;

    content = '';
    _ref = this.results_data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      data = _ref[_i];
      // MODIFIED. Don't include the place holder text in the drop down or in searches.
      if(data.text != this.options.placeholder_text_single &&
         data.text != this.options.placeholder_text_multiple){
        if (data.group) {
          content += this.result_add_group(data);
        } else {
          content += this.result_add_option(data);
        }
        if (options != null ? options.first : void 0) {
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.single_set_selected_text(data.text);
          }
        }
      }
    }
    return content;
  };
</pre></code>


<p>Last add the call to clean the search text inside the AbstractChosen.prototype.winnow_results method. Look for MODIFIED in the code
below for the method call.</p>
<pre><code class="javascript">
AbstractChosen.prototype.winnow_results = function() {
  var escapedSearchText, option, regex, regexAnchor, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;

  this.no_results_clear();
  results = 0;
  searchText = this.get_search_text();
  escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  regexAnchor = this.search_contains ? "" : "^";
  regex = new RegExp(regexAnchor + escapedSearchText, 'i');
  zregex = new RegExp(escapedSearchText, 'i');
  _ref = this.results_data;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    option = _ref[_i];
    option.search_match = false;
    results_group = null;
    if (this.include_option_in_results(option)) {
      if (option.group) {
        option.group_match = false;
        option.active_options = 0;
      }
      if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
        results_group = this.results_data[option.group_array_index];
        if (results_group.active_options === 0 && results_group.search_match) {
          results += 1;
        }
        results_group.active_options += 1;
      }
      if (!(option.group && !this.group_search)) {
        // MODIFIED added clean_search_text
        option.search_text = option.group ? option.label : this.clean_search_text(option, this.calling_context);
        option.search_match = this.search_string_match(option.search_text, regex);
        if (option.search_match && !option.group) {
          results += 1;
        }
        if (option.search_match) {
          if (searchText.length) {
            startpos = option.search_text.search(zregex);
            text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
            option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
          }
          if (results_group != null) {
            results_group.group_match = true;
          }
        } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
          option.search_match = true;
        }
      }
    }
  }
  this.result_clear_highlight();
  if (results < 1 && searchText.length) {
    this.update_results_content("");
    return this.no_results(searchText);
  } else {
    this.update_results_content(this.results_option_build());
    return this.winnow_results_set_highlight();
  }
};

</pre></code>