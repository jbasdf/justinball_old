---
layout: post
author: Justin Ball
title: "If PostGreSQL Won't Start Remember This"
date: 2013-12-26 14:30:05 -0700
categories:
  - PostGresSQL
  - Mac
---
I rarely ever reboot my Mac. It sits on my desk loyally waiting for my next command ready to respond to my every whim.
However, on occasion, something happens and it does need a reboot.

Today was one of those days. Upon reboot everything appeared fine until I tried to work on some code. PostGreSQL was dead.
This isn't the first time this has happened to me and I'm guessing it won't be the last so for the benefit of all here's
the problem:

Here's the error I get:
<pre>
psql: could not connect to server: No such file or directory
  Is the server running locally and accepting
  connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
</pre>

The trick is to look at the logs. I installed using <a href="http://brew.sh/">Homebrew</a> so my logs are here:
<pre>
/usr/local/var/postgres/server.log
</pre>

I had done a hard reboot which left 'postmaster.pid' in place:
<pre>
/usr/local/var/postgres/postmaster.pid
</pre>

I removed that file and then started up PostGres with:
<pre>
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
</pre>

Now I'm good to go.