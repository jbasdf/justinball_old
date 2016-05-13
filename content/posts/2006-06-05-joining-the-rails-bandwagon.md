---
title: Joining the Rails bandwagon
author: Justin Ball
layout: post
permalink: /2006/06/05/joining-the-rails-bandwagon/
tags:
  - ASP.Net
  - Ruby On Rails
---

I have worked in numerous roles as a programmer. My lot has been everything from low level USB firmware to Visual Test to ASP and then ASP.Net. Years ago, when I first saw ASP.Net I thought that I had found the best web framework in the world. I am working on a PhD (here and there). Last semester I worked on an independent study project ([scrumdidilyumptiou.us][1]). Most of the project was done over the course of a few weeks with the bulk of the work done during a meeting at the Melon Foundation. I am a programmer you can't expect me to listen to business like presentations can you?

 [1]: http://scrumdidilyumptiou.us

Because everyone else was doing it I decided I would give Ruby on Rails a shot. The hype isn't hype. It's the real thing. Two weeks ago in my spare time I started a project at [www.houseplans.info][2]. Its up and running now. Two weeks. I measure my Ruby on Rails projects in weeks not months. It is an amazing framework. Tonight I find myself writing ASP.Net code. I wish I wasn't. It is power. It can do a lot. It cannot do pretty urls. I have spent hours writing url rewrite code. This stuff takes seconds in Rails. Really - go look at map.connect in the routes.rb file. I discovered it at 2am in a hotel in New York. The next day all my urls were beautiful and user friendly. Try it with ASP.Net. You can tell me all about 'HttpContext.Current.RewritePath all you want. It doesn't work nearly as well. It is sitting in an IDE in front of me right now and I am sick of it. You can tell me that I should write an ISAPI filter. I will ask you why? Rails handles it in seconds why should I blow hours.

 [2]: http://www.houseplans.info

ASP.Net takes control.  Just like Microsoft isn't free (as in beer or freedom) ASP.Net takes away your freedom.  You don't get to controll where your form posts to.  Your Ids are a mess of insane garbage.  Pretty HTML, not just valid XHTML, but really pretty HTML is out of your reach.  Just FYI for the ASP.Net team.  This:

<pre><code class="html">
<div>
  <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
  <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
  <input type="hidden" name="__LASTFOCUS" id="__LASTFOCUS" value="" />
  <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTcwODczMjYzMg8WKB4ETVhIRGYeBE1YU1FmHgRNTkhEZh4CQ1BmHgJTUWYeA0RJRGYeBE1nQ==" />
</div>
</pre></code>

isn't pretty.  Neither is this:

<pre><code class="html">
&lt;img id="ctl00_ctl00_content_content_RssForXYZ" .....
</pre></code>

That is one nasty id.  I would hate to have to use that id for anything like oh say Javascript or CSS.  (Yes, I know there are server side functions you use to hook up Javascript controls, but why should I have to?)

Ya, I have written ASP.Net code for a long time and yes I know why they do it and I know what its for.  Clean it up anyway.  Maybe you can't.  Maybe the approach is what's wrong.  I wish I could say it wasn't my problem, but it is.  I have a windows server and a legacy app written in ASP (not ASP.Net) that I have to upgrade because it is falling apart.  I can't use Rails, not yet anyway.  Why not?  Because I have 93,000 pages in the Google index and I have to have a way to match up new URLs to old ones and still come up with a valid page.  I have a database with 61 tables and 400 stored procedures.  I am stuck.  Vendor lock in blows.  My advice to anyone starting a new project - user Ruby On Rails.  You will cry a lot less and find yourself saying, "this is amazing" a lot more.