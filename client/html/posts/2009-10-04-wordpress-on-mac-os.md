---
title: WordPress on Mac OSX 10.6
author: Justin Ball
layout: post
permalink: /2009/10/04/wordpress-on-mac-os/
categories:
  - configuration
  - Mac OSX 10.6
  - php
  - Wordpress
---

I do a little Wordpress work on my site using my Mac.  After upgrading to Snow Leopard I started getting errors like this:

<i>
Warning: strtotime(): It is not safe to rely on the system's timezone settings. You are *required* to use the date.timezone setting or the date_default_timezone_set() function. In case you used any of those methods and you are still getting this warning, you most likely misspelled the timezone identifier. We selected 'America/New_York' for 'EDT/-4.0/DST' instead in /Users/scott/Sites/usic.net/wp-includes/functions.php on line 35
</i>

I found <a href="http://wordpress.org/support/topic/308902">this post that talks about setting the time zone in Wordpress</a>.  Unfortunately, just setting a default time zone didn't fix the problem  (it's still a good idea though).

The <a href="http://www.macosxhints.com/article.php?story=20090831101932728">solution was to set a default time zone in my /etc/php.ini file</a>:
{% highlight php %}
date.timezone = "America/Boise"
{% endhighlight %}

You might not have a php.ini file in /etc.  If you don't then look for a file called 'php.ini.default' and copy that to php.ini.