---
title: Rails Conference Day One
author: Justin Ball
layout: post
permalink: /2007/05/17/rails-conference-day-one/
tags:
  - Programming
  - RailsConf
  - RailsConf07
  - Ruby On Rails
  - RailsConf07
  - Ruby On Rails
---

We flew into Portland last night so that we would be ready bright and early this morning. I hate waking up at 6:30 am to go to a conference. We are programmers when will they realize that the conference should start at 11 and then run late into the night. Maybe even start at 3 and run until 1 am.

Anyway, we went looking for a restaurant last night called Sylvias. Lucky for us they were closed permanently. We drove around looking for somewhere to eat and ended up at Wendys. So far I hate Portland. We'll see how it goes over the next few days.

I am sitting in 'Scaling a Rails Application from the Bottom Up' by [Jason Hoffman][1] from [Joyent][2] this morning. I think I have come to the wrong session. He started by talking about how much power a server takes and how much bandwidth you may or may not need. I was hoping to see how to build a better, scalable Rails application. We aren't getting that and everything he is saying I know after running my own servers for years.

 [1]: http://joyeur.com/
 [2]: http://joyent.com/

I am thinking now that I will try to change rooms. This guy likes to blabber on about 'what is scalable' on and on. This is to a room of programmers that already knows what it is to scale. They want to know how to scale. Don't waste our time.

The talk started to get better. He started showing real numbers and explain real ideas. However, I still left and headed over to Test Driven Development. I thought I might be behind but he has been going over basic stuff so I should still be good.

So I wandered around to the Test Driven Development and the Scriptaculous sessions. They were a little to beginner so I am back in the scalability session.

It has gotten good. He is providing real data.
They use Big IP load balancers because they are the only ones that can provide the throughput they want.
The bottle neck in a rails app is not rails it is the load balancer.
They divided up their app into app servers. One app does email, one does rss, one does calendar etc. They use layer 7 (Big IP) load balancers to divide up the traffic to the app servers. It looks like one app, but the requests go to different servers.
Varnish is the best open source Load Balancer
Nginx for static content serving on Solaris
They get away from using a relational DB - what data can be moved out. In many cases you don't need a RDMS.
Memcache
LDAP - use this a lot. Using Sun Directory Server (open source)
[J-EAI][3] (message bus with an in memory db) use this to manage db reads and writes. You can program the bus and tell it to read and write at given intervals. Written in erlang. You can put all your data into the base. This includes email, atom, rss etc. It scales. It connects to all kinds of apps. They are going to release to the world.
File system - put some stuff on the file system. Never more than 10k files/subdirs in a single directory - aim for 4k max
Don't nest to deeply.
Pre-create 16 top level directories, 256 subdirs each which gives you 4096 buckets.

 [3]: http://www.process-one.net/en/jeai/

federate via DNS. Scale it out by sending requests for each subdomain to different servers. They use power DNS.

I didn't care much for the intro, but the second half of this talk was amazing and Jason is a great guy. I think that besides the technical points I learned that you shouldn't spend to much time on your intro or might lose the audience. This talk turned out to be great it just took a while.

One of the really cool things I found out about at this talk was a product called [Sequoia][4]. It lets you scale out your database. Very cool.

 [4]: http://sequoia.continuent.org/HomePage