---
title: Elastic Cloud Computing
author: Justin Ball
layout: post
permalink: /2008/04/08/elastic-cloud-computing/
tags:
  - hosting
  - internet
  - Programming
  - Projects
  - Ruby On Rails
  - 3tera
  - cloud computing
  - ec2
  - elastra
  - mosso
  - rightscale
  - ruby_on_rails
  - scalability
---

One of the most difficult tasks when putting up a new site is picking the right host. Moving hosts later on is terribly difficult so choosing the correct hosting company is as important as selecting a business partner. [I've collected about 30 hosting companies in my delicious bookmarks][1]. Some are specific to a platform others are really cheap. I recorded them because they looked interesting.

 [1]: http://del.icio.us/jbasdf/hosting

The latest movement in web hosting is towards cloud hosting. This is the holy grail for the user and for the hosting company. Imagine a web host that scales as you grow. Everyone would love nothing more than a host that could handle getting slammed by Digg.

Amazon's ec2 service offers scalable services, but it is not a simple as your typical web hosting company. [The Ruby gem ec2onrails][2] will simplify the process of getting your Ruby on Rails application up an running. [RightScale][3] builds on ec2 to make it easy to deploy your application. They add a dashboard and make it easy to load balance and bring up new instances. However, at a starting price of $500 a month and a $2500 setup fee they aren't cheap. [Elastra][4] is another cloud computing service. They claim to not have setup fees, but I can't find a price on their site. The real advantage to these services beyond scaling really needs to be cost. Paying for what you use can be great, but can also be a bit scary. If you site takes off all of a sudden you might get stuck with a rather large bill, but hey at least your server didn't go down.

 [2]: http://ec2onrails.rubyforge.org/
 [3]: http://www.rightscale.com/m/
 [4]: http://www.elastra.com/

[Mosso][5] has the ability to let you host linux or windows. At $100 a month their price is reasonable and they can scale up depending on how many requests you make. [3Tera][6] claims they can 'scale from a fraction of a server to hundreds of CPUs in days'. They also claim that you won't need to change your application code.

 [5]: http://www.mosso.com/
 [6]: http://www.3tera.com/

The [Bluehost.com][7] hosting space ($6-$7) isn't going away anytime soon. However, the future of scalable applications I think lies with cloud computing.

 [7]: http://www.bluehost.com

Thanks to [Alain Benedict][8] I am adding [Morph][9] to the list of services. I haven't had time to really examine the service yet, but it looks like it removes a lot of the hassle of hosting a Rails application.

 [8]: http://eedious.blogspot.com/
 [9]: http://morphexchange.com/