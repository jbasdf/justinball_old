---
title: Virtual Host Configuration for WordPress on my Mac
author: Justin Ball
layout: post
permalink: /2010/11/03/virtual-host-configuration-for-wordpress-on-my-mac/
categories:
  - apache
  - configuration
  - virtual hosts
  - Wordpress
---

I mainly post this so I don't forget, but someone else might find it useful. I always forget how to configuration the virtual host on my local Apache so that WordPress will run right. (I don't like to use MAMP - don't ask why). Note that 'jbasdf' is my username. Use your username in place of 'jbasdf'.

[See this article to find out more about setting up virtual hosts on your local machine][1]. The file '/etc/apache/users/jbasdf.conf' is automatically included in your apache config because of this line in httpd.conf:

 [1]: http://shapeshed.com/journal/setting_up_local_websites_on_snow_leopard/

    Include /private/etc/apache2/extra/httpd-userdir.conf


Edit /etc/apache/users/jbasdf.conf:


        Options Indexes MultiViews FollowSymLinks
        AllowOverride all
        Order allow,deny
        Allow from all


        Options Indexes MultiViews FollowSymLinks
        AllowOverride all
        Order allow,deny
        Allow from all

    NameVirtualHost *:80

      DocumentRoot /Users/jbasdf/projects/wordpress_sites/justinball
      ServerName justinball.dev
      ServerAlias www.justinball.dev
      ErrorLog /Users/jbasdf/projects/wordpress_sites/justinball/logs/error_log
      CustomLog /Users/jbasdf/projects/wordpress_sites/justinball/logs/access_log common



Also note that if you do this you'll want to change 'etc/hosts' so that your Mac will send requests to localhost:

    127.0.0.1 justinball.dev
    127.0.0.1 www.justinball.dev


[On a side note here's some great information on getting php to work on your Mac][2].

 [2]: http://maestric.com/doc/mac/apache_php_mysql_snow_leopard