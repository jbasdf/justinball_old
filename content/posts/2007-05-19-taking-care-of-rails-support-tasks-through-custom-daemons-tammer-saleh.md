---
title: Taking Care of Rails Support Tasks Through Custom Daemons Tammer Saleh
author: Justin Ball
layout: post
permalink: /2007/05/19/taking-care-of-rails-support-tasks-through-custom-daemons-tammer-saleh/
tags:
  - RailsConf
  - RailsConf07
  - RailsConf07
  - Ruby On Rails
---

Saleh is talking about using a Daemon to get rails to talk to LDAP.  <a href="http://thoughtbot.com/projects/ldap-ar-gateway">The code for the LDAP deamon and the code to make it look like a model live here</a>.   I will add a bit of code here and there, but hopefully the presenter will upload the slides so I donâ€™t have to retype everything.  There is some great code in this presentation.

Daemons are a bit of a dark art.

<pre><code class="ruby">
def daemonize
  Kernel.fork and Kernel.exit
  Process.setsid
  Kernel.fork and Kernel.exit
  # system maintenance items so you don't hold up directory maintenance and so you don't have to deal with permissions
  File.umask 0
  Dir.chdir '/'
  # you don't want to hold onto
  ObjectSpace.each_object(IO) {|io| io.close rescue nil}
  STIN.open('/dev/null')
end
</pre></code>

or just use a gem

<pre><code class="ruby">
require daemons
Daemons.daemonize

loop {
  # or whatever
  conn = accept
}

</pre></code>

You can interact directly with your Rails environment.
include environment file

Threads
ThreadsBase.allow_concurrency = true

Or you will get a nasty error:
Mysql::Error: Lost connection to MySQL server during query:


Start and Stop
use a unix init script that takes start/stop/restart
OSX got ride of init script Solaris is going to do the same.  Use Launchd instead.  It uses xml.

Make sure the process doesn't start twice so that it doesn't run over itself.
Use a Pid File.   This is how the daemon finds out its own id for stopping.  It is also how you keep a process from starting up twice

Configuration Files
Talk to your process.  Configure with yml files.  Read it in with YAML.Load

Logging
Daemon doesnâ€™t have standard IO.  Log it.  Do it with Logger.new.  Set log levels etc.  Use logging for debugging.

Security
When the system boots all is root. You donâ€™t want your app running as root.  Drop privileges as soon as you can so that you become a lesser user.
def become_user( â€¦. See the slides

Testing
Create a test suite.  Testing a daemon is challenging.  Spawn the daemon before tests.
Mocking makes testing safer.  See slides for code under slide Testing â€“ Mocking makes this much safer.



This was a great talk with real code.  We need more code.
