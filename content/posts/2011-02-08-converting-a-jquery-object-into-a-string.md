---
title: Converting a jQuery Object into a String
author: Justin Ball
layout: post
permalink: /2011/02/08/converting-a-jquery-object-into-a-string/
tags:
  - Javascript
  - jQuery
---

I'm so used to everything having a 'to_s' method that when it's not there I feel like going out a kicking puppies. In jQuery you can always get the contents of a jQuery object thus:

Html:
<pre><code class="javascript">
var html = myObject.html();
</pre></code>

Text:
<pre><code class="javascript">
var html = myObject.text();
</pre></code>

That's great and has been extremely helpful over the years but what if you want the html of the object as well? It turns out that there are others that have had this problem. <a href="http://stackoverflow.com/questions/652763/jquery-object-to-string">Here's the solution on stackoverflow.com</a>.  <a href="http://bugs.jquery.com/ticket/8142#comment:5">There's a request for the jQuery team to implement an outerHtml() method</a>. Go add a comment and push the request, please.

I was using the solution from stackoverflow and it worked well until one day all of the contents of my page vanished upon execution of a method leaving me with a serious WTF at 1 am in the morning.

Here's part of my code. I've found that for manipulating an html string jQuery is the bomb. In the code below I take a snippet of html, remove whitespace and then rewrite links.
<pre><code class="javascript">
	clean_snippet: function(snippet){
		snippet = snippet.replace(/'/gi, "&#40;"); // single quote will cause javascript problems inline.
		snippet = snippet.replace(/[\t\n\r]/gi, ""); // remove tabs, newlines, and return chars
		return this.rewrite_links(snippet);
	},

	// Rewrite links in the snippets so they go back to the parent site.
	rewrite_links: function(snippet){
		var obj = jQuery(snippet);
		obj.find('[href]').attr('href', function(){ return com.oerglue.browser.make_abs_url(this.href); });
		obj.find('[src]').attr('src', function(){ return com.oerglue.browser.make_abs_url(this.src); });
		obj.find('[action]').attr('action', function(){ return com.oerglue.browser.make_abs_url(this.action); });
		return com.oerglue.common.obj_to_s(obj);
	},
</pre></code>

(Note this code won't work standalone there are some missing methods. It's just here for illustration).

When I'm done rewriting links in the html snippet I think convert the jQuery object back into html. I originally used a derivative of the code from the StackOverFlow conversation:

<pre><code class="javascript">
obj_to_s : function(obj) {
  jQuery('< div>').append(obj.clone()).remove().html();
},
</pre></code>

That works until obj contains script tags which it frequently does when you are dealing with arbitrary html. <a href="http://stackoverflow.com/questions/610995/jquery-cant-append-script-element">It turns out that 'append' and all other similar jQuery methods are smart about how they append data and they know to look for script tags</a>.  Because of that when I was appending the object the scripts from the page I'm operating on are re-executed which causes all kinds of nasty problems - see how many web pages can handle the re-execution of bits of javascript from the page. In most cases jQuery is doing what you want. Most of the time when adding new stuff you want the scripts to run. However, when you are building a string you don't want the code to run rather you just want a string representation of the code.

I've rewritten my obj_to_s code to look like this:
<pre><code class="javascript">
  obj_to_s : function(obj) {
		var tmp = jQuery('<div>');
		jQuery.each(obj, function(index, item){
			if(!jQuery.nodeName(item, "script")){
				tmp.append(item);
			}
		});
		return tmp.html();
  },
</pre></code>

I currently ignore scripts when I do the append and now I get a string. I'll post an update when I have a solution for appending the script text.


UPDATE:

Thanks goes to <a href="http://twitter.com/ryankshaw">Ryan Shaw</a> for helping me work through this. The code below extends jQuery to include an outerHtml method and provides a way to include or exclude scripts.

<pre><code class="javascript">

jQuery.fn.outerHtml = function(include_scripts) {
	if(include_scripts === undefined){ include_scripts = false; }
	var clone = this.clone();
	var items = jQuery.map(clone, function(element){
		if(jQuery.nodeName(element, "script")){
			if(include_scripts){
				var attributes;
				if(element.attributes){
					attributes = jQuery.map(element.attributes, function(attribute){
				    return attribute.name + '="' + attribute.value + '" ';
				  });
				}
				return '<' + element.nodeName + ' ' + attributes.join(' ') + ">" + jQuery(element).html() + "</" + element.nodeName +'>';
			} else {
				return '';
			}
		} else {
			return jQuery('<div>').append(element).remove().html();
		}
	});
	return items.join('');
}

</pre></code>

<a href="https://gist.github.com/817477">Here's the gist on github</a>.
