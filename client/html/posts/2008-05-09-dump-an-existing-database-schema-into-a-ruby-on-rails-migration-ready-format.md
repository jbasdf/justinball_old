---
title: Dump an Existing Database Schema Into a Ruby On Rails Migration Ready Format
author: Justin Ball
layout: post
permalink: /2008/05/09/dump-an-existing-database-schema-into-a-ruby-on-rails-migration-ready-format/
categories:
  - Ruby On Rails
tags:
  - database
  - migrations
  - Ruby On Rails
---

I have been looking around for a plugin or bit of code that can dump the schema from an existing database into the Ruby on Rails database migration format.
The solution is a 'duh' moment, and probably obvious to most Rails programmers. All you have to do is change your database.yml file so that it points to the
existing database you want to dump. Next run rake db:schema:dump. The schema.rb file in your db directory will now contain a dump of all the tables and indexes
in your old database. Rename the schema.rb file to something else so that it doesn't get over written. Don't forget to change your database.yml file to back
and now you only need to copy and paste what you need from the schema file into your migrations. This one should have been obvious, and it can save you an insane amount of time.