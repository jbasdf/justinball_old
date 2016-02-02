---
layout: post
author: Justin Ball
title: "Generate Ember.js models using your Rails Schema"
date: 2013-09-28 11:48:22 -0600
categories:
  - Ruby on Rails
  - Ember.js
---

I love Ember.js. I hate typing and I especially hate typing code that a machine could build. I got really tired of reading 
a Rails schema to build new Ember.js models so I create a rake task for it. I make no guarantees that this code will
work for you or that it won't delete some of your code or start a nuclear war. Enjoy!

(<a href="https://gist.github.com/jbasdf/6744552" title="Generate Ember.js models using your Rails Schema">Link to gist if that's easier.</a>)

(<a href="https://gist.github.com/jbasdf/6786849" title="Generate Ember.js models using your Rails Schema">Updated for Ember Data 1.0.0 beta.</a>)


{% highlight ruby %}
namespace :ember do

  desc "Build ember models from schema"
  task :models => :environment do

    # Change these values to fit your project
    namespace = 'App' # The Ember application's namespace.
    output_dir = File.join(Rails.root, "app/assets/javascripts/common/models") # The directory where ember models will be written

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
            current << "  #{relation}:    #{spaces}DS.belongsTo('#{namespace}.#{relation.classify.singularize}'),\n"
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

{% endhighlight %}