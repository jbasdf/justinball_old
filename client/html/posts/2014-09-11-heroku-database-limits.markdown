---
layout: post
author: Justin Ball
title: Heroku Database Limits
date: 2014-09-11 09:21:57 -0600
categories:
  - Programming
  - Docker
  - Heroku
  - Digital Ocean
---

I've been using Heroku for years and it is a great service with great support. Our company, <a href="http://www.atomicjolt">AtomicJolt</a> uses it
for all new projects since we an quickly bring up a new site on a free account and show it to our customers.

One problem we frequently run into is the database row limit when using the development plan. Once you hit 10,000 rows your database
write permissions are turned off and you will start to see this error:

<blockquote>
PG::Error: ERROR: permission denied for relation [table name here]
</blockquote>

At that point you have a couple of options:
<ol>
  <li><a href="https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases">Upgrade your database</a> to a <a href="https://www.heroku.com/pricing">paid plan</a> (which can get expensive fast).
  <li>Reduce your rows to under 10k by deleting records. Then email <a href="mailto:support@heroku.com">support@heroku.com</a> and as them to give you back permissions. They are really nice about it and fast to respond.</li>
  <li>Try out a different host. It's a bit more work but we're also loving <a href="https://www.digitalocean.com/?refcode=735771c93fa7">Digital Ocean</a>. They support <a href="https://www.docker.com/">Docker</a> which makes deployment really simple.</li>
</ol>




