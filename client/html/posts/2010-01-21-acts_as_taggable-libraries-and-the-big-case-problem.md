---
title: acts_as_taggable libraries and the big case problem.
author: Justin Ball
layout: post
permalink: /2010/01/21/acts_as_taggable-libraries-and-the-big-case-problem/
categories:
  - acts as taggable
  - folksonomy
  - Ruby On Rails
---

Over the years I've had a chance to use the three tagging libraries available for Ruby on Rails:
<ul>
	<li><a href="http://github.com/mbleigh/acts-as-taggable-on">acts-as-taggable-on</a></li>
	<li><a href="http://github.com/jviney/acts_as_taggable_on_steroids">acts_as_taggable_on_steroids</a></li>
  <li><a href="http://agilewebdevelopment.com/plugins/acts_as_taggable">acts_as_taggable</a></li>
</ul>

I think the original acts as taggable is now defunct.  The other libraries are derivatives of that library.  In using tags on various sites the problem I always seem to run across is how to deal with tag case.  For example, to some blue is the same as Blue.  However, is god the same as God?  It depends on who you ask.  It seems that acts-as-taggable-on handles the case problem properly.  I noticed that if I add the tag 'blue' to an object I cannot add another tag called 'Blue'.  However, if I delete 'blue' and then add the tag 'Blue' it works as expected and the upper case tag becomes associated with the object.

 acts_as_taggable_on_steroids doesn't handle the case problem especially well and I frequently run across this error:
<pre><code class="ruby">
  ActiveRecord::RecordInvalid (Validation failed: Tag has already been taken):
</pre></code>

It turns out that that the key difference between the two libraries is in how they setup the tag relationship.

acts-as-taggable-on does this:
<pre><code class="ruby">
def save_tags
          (custom_contexts + self.class.tag_types.map(&:to_s)).each do |tag_type|
            next unless instance_variable_get("@#{tag_type.singularize}_list")
            owner = instance_variable_get("@#{tag_type.singularize}_list").owner
            new_tag_names = instance_variable_get("@#{tag_type.singularize}_list") - tags_on(tag_type).map(&:name)
            old_tags = tags_on(tag_type, owner).reject { |tag| instance_variable_get("@#{tag_type.singularize}_list").include?(tag.name) }

            transaction do
              base_tags.delete(*old_tags) if old_tags.any?
              new_tag_names.each do |new_tag_name|
                new_tag = Tag.find_or_create_with_like_by_name(new_tag_name)
                Tagging.create(:tag_id => new_tag.id, :context => tag_type,
                               :taggable => self, :tagger => owner)
              end
            end
          end

          true
        end
</pre></code>

while acts_as_taggable_on_steroids does it this way:
<pre><code class="ruby">
        def save_tags
          return unless @tag_list

          new_tag_names = @tag_list - tags.map(&:name)
          old_tags = tags.reject { |tag| @tag_list.include?(tag.name) }

          self.class.transaction do
            if old_tags.any?
              taggings.find(:all, :conditions => ["tag_id IN (?)", old_tags.map(&:id)]).each(&:destroy)
              taggings.reset
            end

            new_tag_names.each do |new_tag_name|
              tags << Tag.find_or_create_with_like_by_name(new_tag_name)
            end
          end

          true
        end
</pre></code>


The key difference is in this:
<pre><code class="ruby">
Tagging.create(:tag_id => new_tag.id, :context => tag_type,
                               :taggable => self, :tagger => owner)
</pre></code>

versus:

<pre><code class="ruby">
tags << Tag.find_or_create_with_like_by_name(new_tag_name)
</pre></code>

The first will return false and on go on it's way.  The second throws an exception.  Which is the right way of dealing with the problem?  I guess it depends.  I don't feel like either is a great solution.  Both libraries assume that 'blue' == 'Blue'.  If that assumption is correct then a different bit of code should change in each library.  Tag.rb should lower case the names in the comparison:

<pre><code class="ruby">
  def ==(object)
    super || (object.is_a?(Tag) && name == object.name)
  end
</pre></code>

changes to:

<pre><code class="ruby">
  def ==(object)
    super || (object.is_a?(Tag) && name.downcase == object.name.downcase)
  end
</pre></code>

However, if you want to leave each tag as the user specified rather than change the case then a different line needs to be changed in tag.rb

<pre><code class="ruby">
  # LIKE is used for cross-database case-insensitivity
  def self.find_or_create_with_like_by_name(name)
    find(:first, :conditions => ["name LIKE ?", name]) || create(:name => name)
  end
</pre></code>

will need to change to
<pre><code class="ruby">
  # = is used for to ensure tags are case sensitive
  def self.find_or_create_with_like_by_name(name)
    find(:first, :conditions => ["name =", name]) || create(:name => name)
  end
</pre></code>

Of course the second change will result in the duplication of tags in your site - you will end up with tags 'Blue' and 'blue', but that is the intent.  Your searches might need to be adjusted accordingly.

