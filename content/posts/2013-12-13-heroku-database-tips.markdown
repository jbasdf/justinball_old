---
layout: post
author: Justin Ball
title: "Heroku Database Tips"
date: 2013-12-13 18:44:50 -0700
tags:
  - Heroku
  - PostGreSQL
---

Even on Heroku where most of the problems of sys ops is taken care of for you, you will occasionally run into
strange database issues that are hard to explain. For me it the database issues showed up as some ugly entries
when I tried to run a rake db:migrate on a deployed database:

<pre>
2013-12-13T16:57:28.079781+00:00 app[web.1]: PG::IndexCorrupted: ERROR:  index "pg_constraint_conname_nsp_index" contains unexpected zero page at block 0
2013-12-13T16:57:28.079781+00:00 app[web.1]: HINT:  Please REINDEX it.
2013-12-13T16:57:28.079781+00:00 app[web.1]:             FROM pg_attribute attr
2013-12-13T16:57:28.079781+00:00 app[web.1]:             WHERE cons.contype = 'p'
2013-12-13T16:57:28.079781+00:00 app[web.1]:               AND cons.conrelid = '"users"'::regclass
2013-12-13T16:57:28.079781+00:00 app[web.1]:
2013-12-13T16:57:28.079781+00:00 app[web.1]: :             SELECT attr.attname
2013-12-13T16:57:28.079781+00:00 app[web.1]:             INNER JOIN pg_constraint cons ON attr.attrelid = cons.conrelid AND attr.attnum = cons.conkey[1]
2013-12-13T16:57:28.079781+00:00 app[web.1]: PG::IndexCorrupted: ERROR:  index "pg_constraint_conname_nsp_index" contains unexpected zero page at block 0
2013-12-13T16:57:28.079965+00:00 app[web.1]:             WHERE cons.contype = 'p'
2013-12-13T16:57:28.079781+00:00 app[web.1]: HINT:  Please REINDEX it.
2013-12-13T16:57:28.079965+00:00 app[web.1]:               AND cons.conrelid = '"users"'::regclass
2013-12-13T16:57:28.079965+00:00 app[web.1]: Completed 500 Internal Server Error in 10ms
2013-12-13T16:57:28.079965+00:00 app[web.1]: :             SELECT attr.attname
2013-12-13T16:57:28.079965+00:00 app[web.1]:             FROM pg_attribute attr
2013-12-13T16:57:28.079965+00:00 app[web.1]:             INNER JOIN pg_constraint cons ON attr.attrelid = cons.conrelid AND attr.attnum = cons.conkey[1]
</pre>

I was left a bit confused but I got the point that I needed to reindex my database but the question was how? turns out on heroku you can get into
your database with this command:

<pre>
heroku pg:psql
</pre>

That was easy. Now to clean up my indexes:

<pre>
REINDEX DATABASE __Your_DB_Name__
</pre>

While you're in there you can also clean up:
<pre>
VACUUM;
</pre>

You'll need to get your database name from your heroku dashboard. This url will get you there
<a href="https://postgres.heroku.com/databases">https://postgres.heroku.com/databases</a>. You'll need to know
what the specific database is and click through to get the name. It's ugly and will look something like 'dusyahwettad'

That should be it, but in case you want to dig around a bit more and see what's going on in your database you can install the pg-extras from:

<a href="https://github.com/heroku/heroku-pg-extras">https://github.com/heroku/heroku-pg-extras</a>

Once those are installed you can do things like..

See the your db bloat:
heroku pg:bloat DATABASE_URL

Check out your vacuum stats:
heroku pg:vacuum_stats DATABASE_URL

And so much more. Check here for more details:
<a href="https://devcenter.heroku.com/articles/heroku-postgres-database-tuning">https://devcenter.heroku.com/articles/heroku-postgres-database-tuning</a>

