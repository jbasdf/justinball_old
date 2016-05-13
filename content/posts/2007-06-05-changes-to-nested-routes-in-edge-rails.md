---
title: Changes to Nested Routes in Edge Rails
author: Justin Ball
layout: post
permalink: /2007/06/05/changes-to-nested-routes-in-edge-rails/
tags:
  - Ruby On Rails
  - edge rails
  - Ruby On Rails
---

When I first saw nested resources in this [REST paper][1] I thought cool that makes sense. So we started using the nested resource method in our projects. Then it got a bit wierd - like why should I have to do this/1/that/2/foo/3 if I want to get to foo. Why can't I just get to foo/3. Then I read that[ Jamis felt the same way][2].

 [1]: http://www.b-simple.de/documents
 [2]: http://weblog.jamisbuck.org/2007/2/5/nesting-resources

Well crap.

So then I fell in love with [Edge Rails and found out that the :has\_many and :has\_one methods have found their way into routes][3]. ([Here's the change][4].) This is very cool so I threw it in, but I could get the helper methods to work (stuff like entries_path(@feed) stopped working. I don't know why but I just have a heck of a time figuring out the helper methods, but they are worth using. For example future versions of Rails will replace ';' with '/' in their restful routes. If you hard coded the ';' you now have to go back and change it. You should have used the helper methods.
Anyway, I found [Changes to Nested Resource Routes][5] to be a grand helper when figuring out the new helper methods.

 [3]: http://ryandaigle.com/articles/2007/5/6/what-s-new-in-edge-rails-restful-routing-updates
 [4]: http://dev.rubyonrails.org/changeset/6588
 [5]: http://tuples.us/2007/05/02/changes-to-nested-resource-routes/