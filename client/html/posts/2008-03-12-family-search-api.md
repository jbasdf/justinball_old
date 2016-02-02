---
title: Family Search API
author: Justin Ball
layout: post
permalink: /2008/03/12/family-search-api/
categories:
  - genealogy
tags:
  - API
  - family search
  - genealogy
---

If these posts don't make sense sorry. They are for my notes.

API is based on REST. A lot of data is sensitive so they use SSL to secure data transfer. Prefer XML elements over XML attributes. Everything is UTF-8 encoded. Right now user access is limited to LDS members. That is interesting. I guess you have to have a membership number so that you can access the API, but they will change that over time.

They need to go faster. This is all pretty bla so far.

Query looks like this:

https://api.familysearch.org/{module}/{version}/{endoint}/{id}

You need a developer key. Keys are tied to individuals so they can get a hold of you when you break something.

Login like this:

https://api.familysearch.org/identity/v1/login?key=MMMM-MMMM-MMMM-MMMM-MMMM-MMMM-MMMM-MMMM

You will have to sign an agreement to get a key.

After you authenticate you get a session key which you then have to pass back on each request. They give you back xml for each request.

It looks like you have to send an email and justify your reason for access to get a key. It would be nice if this process were simpler and faster. Because the api is REST based you can hit the read sections in a browser. We could al be sitting here playing with it if we could get keys.

They are listing the opportunities they think are available:

*   Synchronization
*   Tree Cleaning
*   Interactive GedCom import
*   Charts and Printing

They will be adding throttling to control how much data third party applications download. They are going to add a new authorization model. They will also be adding read only guest access.

The developer website is
