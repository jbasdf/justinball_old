---
title: Ruby on Rails i18n with the Rails I18n Textmate bundle
author: Justin Ball
layout: post
permalink: /2009/12/19/ruby-on-rails-i18n-with-the-rails-i18n-textmate-bundle/
tags:
  - Ruby On Rails
  - i18n
  - Rails I18n Textmate bundle
  - Ruby On Rails
  - textmate
  - tools
  - translations
---
For the longest time I've deal with internationalization in Ruby on Rails by hand. This is a tedious process that involves switching back and forth between the file containing the string and your localization yaml file. I was looking at <a href="http://www.jetbrains.com/ruby/index.html">Ruby Mine</a> and found that it supports localization and appears to do many of the things that I like about <a href="http://macromates.com/">Textmate</a>. I've used <a href="http://www.jetbrains.com/resharper/">Resharper</a> with Visual Studio in the past and I admit that I can't live without it in the .Net world. I downloaded the Ruby Mine demo and tried it out on an existing project.  For some reason the popup that is supposed to say 'I18n string value' that they show in the demos never came up for me unless I changed my strings from
<pre>
&lt;p&gt;Some String&lt;/p&gt;
</pre>
to
<pre>
&lt;%= 'Some String' %&gt;
</pre>
 I didn't really feel like having to change my string into that format was going to help my productivity so I abandoned Ruby Mine and instead started looking at the <a href="http://github.com/svenfuchs/rails-i18n">Rails I18n Textmate bundle from Sven Fuchs</a>.  Look inside the tools directory.

Alas, I couldn't get that tool to work either.  Instead each time I hit command+shift+e I and add the translation it would insert this into my file:

<pre>
/Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n/backend/base.rb:238:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of fileload_yml'
  from /Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n/backend/base.rb:225:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of fileload_file'
  from /Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n/backend/base.rb:17:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of fileeach'
  from /Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n/backend/base.rb:17:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of fileinit_translations'
  from /Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n/backend/base.rb:107:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of filetranslate'
  from /Library/Ruby/Gems/1.8/gems/i18n-0.3.2/lib/i18n.rb:208:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of file[]'
  from /Users/jbasdf/Library/Application Support/TextMate/Pristine Copy/Bundles/Rails I18n.tmbundle/Support/lib/extensions.rb:121:in /bin/bash: -c: line 0: unexpected EOF while looking for matching `''
/bin/bash: -c: line 2: syntax error: unexpected end of fileadd_translation'
  from /tmp/temp_textmate.CUUYuC:4
</pre>

That sucked until I realized that by default the bundle assumes the locale file is in 'config/locales/en.yml'. That is the default for most projects and so most of the time you're fine. However, in my gems I put the locales at the root. Since the bundle couldn't find the file it barfed. Lucky for me you can change this value by going to Bundles -> Rails I18n -> Edit Settings

I changed my settings to look like this so that I could easily change back and forth between locations.
<pre>
CONFIG = {}
CONFIG[:locale] = :en

#CONFIG[:locale_file_path] = "#{ENV['TM_PROJECT_DIRECTORY']}/config/locales/en.yml"
CONFIG[:locale_file_path] = "#{ENV['TM_PROJECT_DIRECTORY']}/locales/en.yml"

CONFIG[:bundle_preferences_path] = "~/Library/Preferences/com.macromates.textmate.rails_i18n_translation_helper.pstore"
CONFIG[:project_directory] = ENV['TM_PROJECT_DIRECTORY']
CONFIG[:method_style] = :long   # :long => I18n.translate() and translate()
                                # :short => I18n.t() and t()
CONFIG[:log_changes] = false
#CONFIG[:log_file_path] = "#{ENV['TM_PROJECT_DIRECTORY']}/config/locales/en"
CONFIG[:log_file_path] = "#{ENV['TM_PROJECT_DIRECTORY']}/locales/en"
</pre>


One other tip.  Be sure to install the i18n gem. I didn't see it in the readme, but I might have read over it.
<pre>
 sudo gem install i18n
</pre>

This is an awesome plugin.  It will save me quite a bit of time.  I do wish it would support multiple locale directories but I can live with it as is.

On a side note the <a href="http://github.com/svenfuchs/rails-i18n">rails-i18n project</a> is a great piece of code if you do any internationalization work.  Check out all the locale files for Rails.