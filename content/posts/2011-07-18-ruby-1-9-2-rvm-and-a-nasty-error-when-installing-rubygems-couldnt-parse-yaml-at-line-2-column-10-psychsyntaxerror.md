---
title: 'ruby 1.9.2, rvm and a Nasty Error When Installing RubyGems: couldn&#8217;t parse YAML at line 2 column 10 (Psych::SyntaxError)'
author: Justin Ball
layout: post
permalink: /2011/07/18/ruby-1-9-2-rvm-and-a-nasty-error-when-installing-rubygems-couldnt-parse-yaml-at-line-2-column-10-psychsyntaxerror/
tags:
  - Ruby
  - psych
  - rvm
---
It's 'funny' how seemingly simple things take you down nasty paths. I was hoping to spend a few minutes playing with [Goliath][1]. That led me to installing ruby 1.9.2 using rvm which spit out this error:

 [1]: http://www.igvita.com/2011/03/08/goliath-non-blocking-ruby-19-web-server/

    Removing old Rubygems files...
    Installing rubygems dedicated to ruby-1.9.2-p290...
    Installing rubygems for /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/bin/ruby
    ERROR: Error running 'GEM_PATH="/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290@global:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290@global" GEM_HOME="/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290" "/Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/bin/ruby" "/Users/jbasdf/.rvm/src/rubygems-1.6.2/setup.rb"', please read /Users/jbasdf/.rvm/log/ruby-1.9.2-p290/rubygems.install.log
    WARN: Installation of rubygems did not complete successfully.


That's not especiallyl pretty but it did point me to a log file which contained this:

    /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:148:in `parse': couldn't parse YAML at line 2 column 10 (Psych::SyntaxError)
            from /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:148:in `parse_stream'
            from /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:119:in `parse'
    [2011-07-18 18:29:21] GEM_PATH="/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290@global:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290:/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290@global" GEM_HOME="/Users/jbasdf/.rvm/gems/ruby-1.9.2-p290" "/Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/bin/ruby" "/Users/jbasdf/.rvm/src/rubygems-1.6.2/setup.rb"
    /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:148:in `parse': couldn't parse YAML at line 2 column 10 (Psych::SyntaxError)
            from /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:148:in `parse_stream'
            from /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:119:in `parse'
            from /Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/psych.rb:106:in `load'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/lib/rubygems/config_file.rb:235:in `load_file'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/lib/rubygems/config_file.rb:179:in `initialize'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/lib/rubygems/gem_runner.rb:76:in `new'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/lib/rubygems/gem_runner.rb:76:in `do_configuration'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/lib/rubygems/gem_runner.rb:49:in `run'
            from /Users/jbasdf/.rvm/src/rubygems-1.6.2/setup.rb:35:in `'


Again not especially helpful. However, ruby and all it's lovely gems are open source so I dropped a 'puts' statement into 'config\_file.rb' (/Users/jbasdf/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/rubygems/config\_file.rb) and found the culprit - a very ugly .gemrc file in my home directory that I probably put there years ago. It looks like this:

    echo -e '---
    :benchmark: false
    gem: --no-ri --no-rdoc
    :update_sources: true
    :bulk_threshold: 1000
    :verbose: true
    :backtrace: false' > ~/.gemrc


psych - the yaml processor for ruby 1.9.2 - didn't like that ugly yaml at all. I removed my .gemrc file (I don't need anything custom) and everything started to work.

If you run into this problem the paths will be specific to your machine but hopefully the ideas help.

A couple of takeaways:

1.  You can tweak anything in Ruby. Don't be afraid to mess around with anything to find your problem.
2.  I knew #1, but for some reason I always try everything else before going for #1. I gotta just go for #1 to start with and save myself the time.
3.  I love Ruby