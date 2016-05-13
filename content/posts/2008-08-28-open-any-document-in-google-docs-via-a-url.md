---
title: Open Any Document in Google Docs Via a Url
author: Justin Ball
layout: post
permalink: /2008/08/28/open-any-document-in-google-docs-via-a-url/
tags:
  - Interesting
  - Programming
  - Projects
  - Ruby On Rails
  - google docs
  - google hacks
---

We are looking at ways to integrate the new Teachers Without Borders site with Google docs.

Turns out that you can open:
documents - .pdf, .doc, .txt, .html, .rtf and .odt
spreadsheets - .xls, .csv, .ods
presentations - .ppt

By feeding the file url to this google url:

<blockquote>
  http://docs.google.com/?DocAction=updoc&formsubmitted=true&uploadURL=DOCUMENT_URL
</blockquote>

Here's an example if you needed to view a W4 form from the IRS url:

<blockquote>
  http://www.irs.gov/pub/irs-pdf/fw4.pdf
</blockquote>

Use this url:

<a href="http://docs.google.com/?DocAction=updoc&formsubmitted=true&uploadURL=http://www.irs.gov/pub/irs-pdf/fw4.pdf">http://docs.google.com/?DocAction=updoc&formsubmitted=true&uploadURL=http://www.irs.gov/pub/irs-pdf/fw4.pdf</a>
