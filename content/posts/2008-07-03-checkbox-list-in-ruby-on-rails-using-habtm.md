---
title: Checkbox list in Ruby on Rails using HABTM
author: Justin Ball
layout: post
permalink: /2008/07/03/checkbox-list-in-ruby-on-rails-using-habtm/
categories:
  - Ruby On Rails
tags:
  - checkbox list
  - checkboxes
  - HABTM
  - has and belongs to many
  - Ruby On Rails
---

Checkboxes are one of those things that look easy and should be easy, but they aren't always easy.  I needed a solution that could create a checkbox list of languages that a user speaks.  So I don't forget  here's how to do it:

The migrations are important.  You have to be sure to exclude the id parameter when you create languages_users or you will get ' Mysql::Error: #23000Duplicate entry' due to the fact that ActiveRecord will try to store a value in the id field that indicates which model created the entry (User.languages << vs Langauges.users).  The other option is the create the id parameter so that the direction is maintained but be sure that it is not created as a primary key.
<pre><code class="ruby">
class LanguagesUsers < ActiveRecord::Migration
    def self.up
        create_table :languages_users, :id => false, :force => true do |t|
            t.integer :user_id
            t.integer :language_id
            t.timestamps
        end
    end

    def self.down
        drop_table :languages_users
    end
end
</pre></code>

<pre><code class="ruby">
class Languages < ActiveRecord::Migration

    def self.up
        create_table "languages", :force => true do |t|
            t.string  "name"
            t.string  "english_name"
            t.integer "is_default", :default => 0
        end
    end

    def self.down
        drop_table "languages"
        drop_table "users_languages"
    end
end
</pre></code>

<pre><code class="ruby">
class Users < ActiveRecord::Migration

    def self.up
        create_table "users", :force => true do |t|
            t.string  "login"
            # other fields excluded for brevity
        end
    end

    def self.down
        drop_table "users"
    end
end
</pre></code>

Here are my models:
user.rb
<pre><code class="ruby">
class User < ActiveRecord::Base
    has_and_belongs_to_many :languages
end
</pre></code>

language.rb:
<pre><code class="ruby">
class Language < ActiveRecord::Base
  has_and_belongs_to_many :users
end
</pre></code>

In my user_controller.rb the create and update methods are simple.  This is thanks to the fact that you get a language_ids method on the user object because of the HABTM relationship. 
<pre><code class="ruby">
    def create
        @user = User.new(params[:user])
        @user.save
    end

    def update
        params[:user][:language_ids] ||= []

        @user = User.find(current_user)
      
        if @user.update_attributes params[:user]
            flash[:notice] = "Settings have been saved."
            redirect_to edit_user_url(@user)
        else
            flash.now[:error] = @user.errors
            setup_form_values
            respond_to do |format|
                format.html { render :action => :edit}
            end
        end

    end
</pre></code>

On to the view:
<pre><code class="ruby">
<ul class="checkbox-list">
  <% @languages.each do |language| -%>
<li><%= check_box_tag "user[language_ids][]", language.id, user_speaks_language?(language) -%> <%= language.english_name -%></li>
  <% end -%>
</ul>
</pre></code>

NOTE: I had an error in my original method.  This code:
<pre><code class="ruby">
<li><%= f.check_box :language_ids, {:checked => user_speaks_language?(language)}, "#{language.id}", ""  -%> <%= "#{language.english_name}" -%></li>
</pre></code>
should be this:
<pre><code class="ruby">
<li><%= check_box_tag "user[language_ids][]", language.id, user_speaks_language?(language) -%> <%= language.english_name -%></li>
</pre></code>

And we'll need this helper method:
<pre><code class="ruby">
def user_speaks_language?(language)
    if @user && !@user.login.nil? # no sense in testing new users that have no languages
        @user.languages.include?(language)
    else
        false
    end
end
</pre></code>

The result is that you will get a list of check boxes that update values in the join table that is part of the has_and_belongs_to_many relationship.  Rails is very cool