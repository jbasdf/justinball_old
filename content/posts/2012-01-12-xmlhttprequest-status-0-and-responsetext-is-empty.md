---
title: XMLHttpRequest status 0 and responseText is empty
author: Justin Ball
layout: post
permalink: /2012/01/12/xmlhttprequest-status-0-and-responsetext-is-empty/
tags:
  - Funny
---
I ran across a problem in the javascript for the [OER Glue][1] mashup process today that surprised me. We're using backbone.js and so I had constructed a login form via one of the views. When the form was submitted I would create a session object and then attempt to save that to the server. The problem was that the ajax request would immediately fail before the server returned anything and the XMLHttpRequest status was 0 and the responseText was empty. It took me way to long to realize that the submit button was cause the form to attempt to submit and since the form lacked an action attribute it couldn't submit anywhere and the request would fail. Changing  to  solves the problem. However, doing so also means the user can't hit enter to submit the form. Instead leave the  in place and return false from the method that handles the request or call event.preventDefault().

 [1]: http://www.oerglue.com