---
title: Family Search Write
author: Justin Ball
layout: post
permalink: /2008/03/12/family-search-write/
categories:
  - genealogy
tags:
  - API
  - family search
  - genealogy
---

We're back from lunch.  I had a great chat with Alan Braverman the CTO & founder of Geni.   They are doing some cool things by connecting living people with their families and to the larger family graph.   They also let you upload photos and other digital assets then assemble that into a timeline.  Eventually you will be able to create a family timeline.

On to the FamilyTree Write.  This part of the API seems to be mainly applicable to software packages that want to contribute data to FamilySearch.  I am more of a data mooch than a data provider so it isn't as interesting but here goes:

Only the <em>assertions</em> section of the entry is writable.
In version 1.1 the <em>summary</em> section will be writable.
Only the assertion value can be changed.  ie you can't just change the date of an event.  You have to change all parts of the event - the date, the place, the type (birth, death, etc) and the description.  If you left out the place or type it would update the date and delete the place and type.

After you post you will get back a skeleton of the person which is really gross, but most of the people are probably dead so at least it won't hurt.  :-)  You only get back the IDs of the person so that you can map the object that was created to an object in your database.

If you pass some bad data you will get errors or the parts of the request that fails.  They won't fail the entire request just the bad parts.

To write you create an xml document:

<pre><code class="xml">
<familytree version="1.0" xmlns="api.familysearch.org/familytree/v1">
  <persons>
    <person>
      <assertions>
        <name type="name"></name>
        <event type="Birth" id="..">...</event>
      </assertions>
    <person>
  <persons>
</familytree>
</pre></code>

<br />
<p>
To Delete:
</p>

<pre><code class="xml">
<familytree version="1.0" xmlns="api.familysearch.org/familytree/v1">
  <persons>
    <person id="KW3b-2HB" fsaction:action="delete">
    <person>
  <persons>
</familytree>
</pre></code>

<br />
<p>
You can only change or delete assertions that you have contributed.  However, they have created a "disputed" assertion so that you can make correction to bad data.

Create a new assertion with the same values except for the disputed value.  Then set disputed=true.

The system is person centric.  All relationships for a given person are stored with the person.

