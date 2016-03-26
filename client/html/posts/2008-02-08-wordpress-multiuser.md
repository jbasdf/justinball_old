---
title: WordPress Multiuser
author: Justin Ball
layout: post
permalink: /2008/02/08/wordpress-multiuser/
categories:
  - Programming
tags:
  - install
  - multi-user
  - Wordpress
---

I have a couple of blogs - this one and some family ones.  Since Wordpress updates their code fairly often it has become a royal pain to manage all of them.   I debated setting up sym links so that I wouldn't have to deploy the code in several directories.  <a href="http://striderweb.com/nerdaphernalia/features/virtual-multiblog/">I even found someone doing just that</a>.  I also debated <a href="http://wordpress.org/download/svn/">using svn to checkout the Wordpress code</a>.  Then I would write a shell script that could just do an svn update to update the code on all the blogs.  But doing that would require that I maintain plugins and themes in each project.  I would also have to upgrade a bunch of databases each time I did an upgrade.

My search led me to Wordpress Multiuser.  I worried that it might not have all the features as the normal release and that I wouldn't be able to specify a domain name for each blog.  In the end this Wordpress Multiuser is the solution I chose.  Here's what I did.

You can checkout Wordpress MU using svn with this simple command:
<pre><code class="ruby">
svn co http://svn.automattic.com/wordpress-mu/trunk/ wpmu
</pre></code>

After you do that direct apache to your wpmu directory.  Here's what my virtual hosts file looks like:

<pre><code class="ruby">
NameVirtualHost *:80

&lt;VirtualHost *:80&gt;
    ServerAdmin &quot;example.com&quot;
    ServerName example
    ServerAlias www.example.com
    MIMEMagicFile /dev/null
    CustomLog logs/blogs_access_log &quot;%h %l %u %t \&quot;%r\&quot; %&gt;s %b \&quot;%{Referer}i\&quot; \&quot;%{User-agent}i\&quot;&quot;
    ErrorLog logs/blog_error_log

    DocumentRoot &quot;/home/blogs/public_html/wpmu&quot;
    &lt;Directory &quot;/home/blogs/public_html&quot;&gt;
        Options +Indexes +FollowSymLinks
        Order allow,deny
        Allow from all
        AllowOverride All
    &lt;/Directory&gt;

    Alias /usage &quot;/home/blogs/public_html/usage&quot;
    &lt;Location /usage&gt;
        Order allow,deny
        Allow from all
    &lt;/Location&gt;
&lt;/VirtualHost&gt;
</pre></code>


The first time you visit your new blog at example.com you will be presented with a page that indicates you need to change some permissions on your server.  Just copy and paste the chmod command and you should be good.

The next step is to create an empty database.  Call it wordpress or whatever.  Make sure that you assign it a user that has create privileges.  Enter that user into the wordpress dialog.  If all goes well you are done.  You have to love how easy it is to setup Wordpress.

