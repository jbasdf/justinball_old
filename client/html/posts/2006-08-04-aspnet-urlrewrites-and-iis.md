---
title: asp.net url rewrites and IIS
author: Justin Ball
layout: post
permalink: /2006/08/04/aspnet-urlrewrites-and-iis/
categories:
  - ASP.Net
---

Here's something I am posting so I remember it. I want pretty urls for my latest ASP.Net application - The Plan Collection (2.0, reloaded, you can pick your favorite internet term). Url rewrites work fine using the web server built into Visual Studio 2005. Howerver, IIS is smart about what it lets pass through for security reasons. It doesn't like it when files don't exist and will give you a page not found error by default. You have to configure your website with a wildcard so that IIS knows to pass the request for a non-existant page on to your code. To do this open up the IIS manager. Find your website, right click, select properties. Click on the 'Home Directory' tab. Choose 'Configuration'. On the 'Mappings' tab there is an 'Insert' button. Click that and add a value that maps to the asp.net dll that you are working with. Something like this:
C:WINDOWSMicrosoft.NETFrameworkv2.0.50727aspnet_isapi.dll

Here's the important part. Uncheck 'Verify that file exists'. That will let IIS send the request on to your code.

[If you are doing url rewriting in your application be sure to read this][1]. Asp.Net doesn't respond well to the Google bot without some tweaking. If you ignore that thread you risk losing points with Google.

 [1]: http://communityserver.org/forums/1/536640/ShowThread.aspx