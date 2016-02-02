---
title: Configure your Free Facebook Joyent Accelerator for Capistrano
author: Justin Ball
layout: post
permalink: /2007/12/07/configure-your-free-facebook-joyent-accelerator-for-capistrano/
categories:
  - Ruby On Rails
  - Web2.0
tags:
  - capistrano
  - deployment
  - facebook
  - joyent
  - Ruby On Rails
---

<a href="http://www.joyent.com/developers/facebook/">Right now Joyent is giving away free Accelerator accounts to Facebook developers.</a>  I love free stuff so this is so cool I could just cry.  Free hosting with one of the premier Ruby on Rails hosts.  I normally have to eat bags of M&Ms to be this happy.

Not all is roses.  There is a dark side to this free hosting.  Setting it up will make you want to cry.  I am a developer, not a Solaris system administrator and so getting my application deployed was like having a vasectomy and being totally conscious the entire time.  In hopes of saving time in the future for myself and others here is how to configure your Facebook Rails application for deployment via Capistrano on a Joyent Accelerator.  The ideas aren't mine.  I stole everything from all over the place.  I added links at the bottom where I found some of the information.  The rest of it I will just feel guilty about.

<ol>
<li> <a href="http://discuss.joyent.com/viewtopic.php?id=12629">Setup your shell for capistrano</a>.  Follow the link for the how and why.
   Note my $HOME/.ssh/environment file contains this:
    {% highlight ruby %}
PATH=/usr/bin:/usr/sbin:/opt/local/bin:/usr/ucb:
/usr/sfw/bin:/usr/ccs/bin:/opt/csw/bin:/opt/csw/sbin:
/opt/csw/gnu:/opt/csw/gcc3/bin:/opt/csw/mysql5/bin:
/opt/csw/postgresql/bin:/opt/csw/apache2/bin:
/opt/csw/apache2/sbin
{% endhighlight %}
  Also be careful so that you don't edit ssh_config instead of sshd_config not that anyone would ever be so stupid and do that.  :-)
</li>
<li>
  Make sure you have the Capistrano gem installed on your local machine:
  {% highlight ruby %}sudo gem install capistrano{% endhighlight %}
</li>
<li>
  capify your application:
   In the root of your rails application run this:
   {% highlight ruby %}capify .{% endhighlight %}
</li>
<li>
  You will now have a deploy.rb in your config directory.  Replace it with this <a href='http://www.justinball.com/wp-content/uploads/2007/12/deploy.rb' title='deploy.rb'>deploy.rb</a>.
Then be sure to replace the XXXXXXXX with the username provided to you in your welcome email from Joyent.  Then look for the sections of deploy.rb that contain capital letters and enter in the relevant values.  These will include your application name, your domain name, and the path to your repository.
</li>
<li>
Now create a directory inside your config directory and name accelerator.  Then add the following three files into it:
<a href='http://www.justinball.com/wp-content/uploads/2007/12/accelerator_tasks.rb' title='accelerator_tasks.rb'>accelerator_tasks.rb - contains Capistrano recipes specific to the Joyent Accelerator.</a>
<a href='http://www.justinball.com/wp-content/uploads/2007/12/apache_vhost.erb' title='apache_vhost.erb'>apache_vhost.erb - configures apache to point to your rails application</a>
<a href='http://www.justinball.com/wp-content/uploads/2007/12/smf_template.erb' title='smf_template.erb'>smf_template.erb - starts up mongrel automatically for you when you system starts</a>
</li>
<li>
Now we need a mongrel_cluster.yml file.  Create a file called mongrel_cluster.yml inside of your config directory and put this in it:
port: "8000"
environment: production
address: 127.0.0.1
pid_file: /home/XXXXXXX/web/APP-NAME/shared/pids/mongrel.pid
log_file: /home/XXXXXXX/web/APP-NAME/shared/log/mongrel.log
servers: 3
docroot: /home/XXXXXXX/web/APP-NAME/current/public
cwd: /home/XXXXXXX/web/APP-NAME/current

You will need to edit the paths to match the paths you setup in deploy.rb.  This likely means that you will need to replace XXXXXXX with your joyent username and APP-NAME with the name of your application.
</li>
<li>
Subversion needs to know how to talk to your repository if it is password protected.  ssh into the server and do this inside your home directory:
svn co PATH TO YOUR PROJECT
You can delete the directory when it is done.  You do this so that your svn username and password are cached on the server which means that Capistrano will be able to checkout files.
</li>
<li>
While you are logged into the server be sure to create an empty database.  The name should match the name in your database.yml file.
</li>
<li>
Be sure to enter the proper username for root into your database.yml file.
</li>
<li>
Now for the exciting part:
Run {% highlight ruby %}cap deploy:setup{% endhighlight %} inside of the root of your Rails project.  It should run successfully.  If not I am very sorry.
</li>
<li>
Then do this:
cap deploy:cold
</li>
</ol>
You should be up and running at that point.

More helps and information:
<a href="http://wiki.joyent.com/facebook:kb:faststart">Joyent's quickstart</a>.  Although I would bypass that and look at the main how to <a href="http://wiki.joyent.com/facebook:kb:rails?s=facebook">found here</a>.  <a href="http://wiki.joyent.com/accelerators:deploying_rails_apps?s=capistrano">How to use Capistrano on a new Joyent Accelerator</a>.