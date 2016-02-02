---
title: Hierarchies, trees, jQuery, Prototype, script.aculo.us and acts_as_nested_set
author: Justin Ball
layout: post
permalink: /2009/01/18/heirarchies-trees-jquery-prototype-scriptaculous-and-acts_as_nested_set/
categories:
  - Ruby On Rails
  - acts_as_nested_set
  - heirachy
  - Heirarchies
  - jQuery
  - ordered tree
  - prototype
  - Ruby On Rails
  - script.aculo.us
  - trees
---

'single_message' should normally be set to false.  I added it in just in case I needed to render a single message for an ajax call.  If you aren't rendering an entire tree and thus have only one node then passing 'single_message = true' will force the method to call the database to get the level of the node in the tree.

If you want to render a true tree structure (not just indents) then you'll need to do a bit of recursion.  Assuming @message is a root level message you can do this:
{% highlight ruby %}
<div id="messageList">
  <ul id="message_tree">
    <% render_messages(@message) do |message| -%>
      <%= message.text %>
    <% end -%>
  </ul>
</div>
{% endhighlight %}

{% highlight ruby %}
module MessagesHelper

def render_messages(message, &block)
  concat('<li id="message_' + message.id.to_s + '" class="messageContainer delete-container">', block.binding)
  yield(message)
  concat('<ul style="display:none;" id="ul_' + message.dom_id + '">', block.binding)
  if has_children?(message.id)
    children_of(message.id).each do |child|
      render_messages(child, &block)
    end
  end
  concat('</li></ul>', block.binding)
end

# HACK these methods assume a variable named @messages is defined.
# This hack prevents us from having to pass messages all over
def has_children?(message_id)
  @messages.any?{|message| message.parent_id == message_id}
end

def children_of(message_id)
  @messages.find_all{|message| message.parent_id == message_id}
end

end
{% endhighlight %}

(*Note that I've not fully tested the code above and I am betting it is not the most efficient.  At the very least you'll want to cache the resulting html.)

Next you'll need to add some script to get the drag and drop to work.  It will look something like this.  Honestly I can't remember if I got this code from somewhere online or if I wrote it.  I am sure someone could make it generic, but in this instance we use css class names to add drag and drop functionality to the various nodes:

{% highlight javascript %}
jQuery(document).ready(function() {

	jQuery(".messageContainer").draggable({
		zIndex : 1000000,
		revert : 'invalid',
		opacity : 0.5,
		scroll : true,
		helper : 'clone'
	});

	jQuery("#messageList").droppable({
			accept: ".messageContainer",
			drop: function(ev, ui) {
				var source_li = jQuery(ui.draggable);
				var child_ul = jQuery(this).children('ul');
				var message_id = source_li.children('input').val();
				var parent_id = 0;
				if(same_parent(source_li, child_ul)){
					return;
				}
				insert_alphabetic(child_ul, source_li);
				update_parent(message_id, parent_id);
	    }
		});

	jQuery(".messageContainer").droppable({
	  accept: ".messageContainer",
	  hoverClass: 'messageContainer-hover',
	  tolerance : 'pointer',
		greedy : true,
    drop: function(ev, ui) {
			var source_li = jQuery(ui.draggable);
			var target_li = jQuery(this);
			var message_id = source_li.children('input').val();
			var parent_id = target_li.children('input').val();
			if(target_li.children('ul').length <= 0){
				target_li.append('<ul></ul>');
			}
			var child_ul = target_li.children('ul');
			if(same_parent(source_li, child_ul)){
				return;
			}
			jQuery(this).children('ul:hidden').slideDown();
			insert_alphabetic(child_ul, source_li);
			update_parent(message_id, parent_id);
    }
	});

	jQuery(".submit-delete").click(function() {
		if(jQuery(this).parents('li:first').siblings('li').length <= 0){
			jQuery(this).parents('li:first').parents('li:first').children('.expander').remove();
		}
		return false;
	});

	function insert_alphabetic(child_ul, source_li){
		var kids = child_ul.children('li');
		var source_text = source_li.children('span.link').children('a').html().toLowerCase();
		for(i=0; i<kids.length; i++){
			var current_text = jQuery(kids[i]).children('span.link').children('a').html().toLowerCase();
			if(source_text < current_text){
				source_li.insertBefore(kids[i]);
				return;
			}
		}
		source_li.appendTo(child_ul);
	}

	function same_parent(source_li, child_ul){
		return source_li.parent() == child_ul;
	}

	function update_parent(message_id, parent_id){
		var path = jQuery('#updatePath').val();
		jQuery.post(path + '/' + message_id + '.js', {parent_id: parent_id, action: 'update', _method: 'put', only_parent: 'true' },
		  function(data){
				apply_expander();
				if(data.length > 0){
					var result = eval('(' + data + ')');
					if(!result.success){
						jQuery.jGrowl.error(result.message);
					}
				}
		  });
		return false;
	}

	apply_expander();
	function apply_expander(){
		jQuery(".expander").remove();
		jQuery(".messageContainer ul:hidden li:first-child").parent().parent().prepend('<a class="expander" href="#"><img src="/images/expand.png" /></a>');
		jQuery(".messageContainer ul:visible li:first-child").parent().parent().prepend('<a class="expander" href="#"><img src="/images/collapse.png" /></a>');
		jQuery(".expander").click(function(){
			var img = jQuery(this).children('img');
			var target_ul = jQuery(this).siblings('ul');
			if(img.attr('src') == '/images/expand.png'){
				img.attr('src', '/images/collapse.png');
				target_ul.slideDown();
			} else {
				img.attr('src', '/images/expand.png');
				target_ul.slideUp();
			}
			return false;
		});
	}

});
{% endhighlight %}


In two of the projects I have removed prototype and script.aculo.us in favor of jQuery.  Personally I prefer jQuery and the <a href="http://ennerchi.com/projects/jrails">jRails plugin</a> makes the transition simple.  However, there are probably more people using the default libraries.  Prototype actually comes with the ability to create a nice drag and drop ordered tree built in.  However, I don't love the fact that their 'onUpdate' callback doesn't give the node that was dropped.  Instead you are supposed to serialize the entire tree.  awesome_nested_set makes it very easy to move just one node and that seems more efficient so you'll see a hack in the code below that constantly records the dropped node into a hash table on the 'onChange' event.  That data is then sent to the server on the 'onUpdate' event.

{% highlight javascript %}
window._token = '#{form_authenticity_token}'; // Rails requires this token to validate forms so we'll need to pass it in the ajax request
window._message_updates = new Hash;
Sortable.create('message_tree', {tree:true,
                                    dropOnEmpty:true,
                                    scroll:window,
                                    constraint:false,
                                    onChange:function(element) {
                                      // this is a bit of a hack, but basically we just pull the message id from the id of the html element
                                      var child_id = element.id.replace('message_', '');
                                      var parent_id = element.up().id.replace('ul_message_', '');
                                      var previous = element.previous();
                                      var sibling_id = '';
                                      if(previous){
                                        var sibling_id = previous.id.replace('message_', '');
                                      }
                                      window._message_updates.set(child_id, [parent_id, sibling_id]);
                                    },
                                    onUpdate:function(element) {
                                      window._message_updates.each(function(pair) {
                                        var child_id = pair.key;
                                        var parent_id = pair.value[0];
                                        var sibling_id = pair.value[1];
                                        window._message_updates.unset(child_id);
                                        var url = '/messages/' + child_id + '.js?parent_id=' + parent_id + '&sibling_id=' + sibling_id;
                                        new Ajax.Request(url, {
                                          method: 'PUT',
                                          parameters: {
                                            authenticity_token: window._token
                                          }
                                        });
                                      });
                                    }
                                    });
{% endhighlight %}

Here is a link to the default script.aculo.us tree example
<a href="http://script.aculo.us/playground/test/functional/sortable_tree_test.html">http://script.aculo.us/playground/test/functional/sortable_tree_test.html</a>

I borrowed many of the ideas from there.  I'm sure there are a few bugs in this so if anyone tries out the code and has problems let me know and I'll make changes as needed.
