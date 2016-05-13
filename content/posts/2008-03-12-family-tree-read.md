---
title: Family Tree Read
author: Justin Ball
layout: post
permalink: /2008/03/12/family-tree-read/
tags:
  - genealogy
  - API
  - family search
  - genealogy
---

What do we read out of family search?

*   Person Information
*   Search Match
*   Authorities Data - places
*   LDS Ordinance Information

Objects available in the new FamilySearch

*   Person
*   Search Data
*   Contributor Information
*   Place Standardization Data

Can output XML, JSON, and XML-FastInfoset. Request can be gzipped if client supported.

Locate a resource via NFS Id - 'KWCD-QBC', Ancestral File Number - 'afn.2bW3-9H' or Gedcom UID.

Examples:

https://api.familysearch.org/familytree/v1/person/KWCD-QBC?sessionId=MMMM

https://api.familysearch.org/authorities/v1/place/933423?sessionId=MMMM

https://api.familysearch.org/v1/search?name=Isreal Hoyt heaton?sessionId=MMMM

Get the schema:
