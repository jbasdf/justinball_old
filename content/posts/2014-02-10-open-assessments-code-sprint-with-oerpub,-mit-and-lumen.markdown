---
layout: post
author: Justin Ball
title: "Open Assessments Code Sprint with OERPub, MIT and Lumen"
date: 2014-02-10 18:00:26 -0700
tags:
  - Programming
  - OER
  - Open Assessments
  - Ember.js
---

I've been spending a lot more hours driving back and forth between Salt Lake City and Logan lately than I normally like.
Today was spent integrating <a href="http://www.openassessments.com">Open Assessments</a>
with <a href="http://oerpub.org/">OERPub</a>. Soon you'll be able to author an open text book via OER Pub, add an assessment via Open Assessments
and embed objective's via MIT's MC3 project. <a href="http://www.lumenlearning.com/">Lumen Learning</a> has funding from the Hewlett Foundation
to employ content author's to generate a series of assessments in subjects ranging from physics to biology which means the bank of
freely available, open assessments will should begin to fill with high quality content later this spring.

We've made a number of changes to Open Assessments recently including fully implementing the QTI player in Ember.js. This means that the assessment
author can choose to host their assessment data (QTI XML) on Open Assessments or on any server that supports CORS. We've also improved the API
and added oEmbed support.

Here's a couple of examples from today:
<ol>
  <li>Search the API and get XML: <a href="http://www.openassessments.com/api/assessments.xml?q=fraction">http://www.openassessments.com/api/assessments.xml?q=fraction</a><li>
  <li>Or if you prefer JSON: <a href="http://www.openassessments.com/api/assessments.json?q=fraction">http://www.openassessments.com/api/assessments.json?q=fraction</a><li>
  <li>oEmbed: <a href="http://www.openassessments.com/oembed.json?url=http://www.openassessments.com/assessments/6">http://www.openassessments.com/oembed.json?url=http://www.openassessments.com/assessments/6</a></li>
</ol>

Finally, a fully embedded assessment in case you are wondering what all the data from the links above looks like to a normal person:
<iframe src="//www.openassessments.com/assessments/load?src_url=http://www.openassessments.com/api/assessments/6.xml" frameborder="0" style="border:none;width:100%;height:100%;min-height:400px;"></iframe>