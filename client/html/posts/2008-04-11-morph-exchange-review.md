---
title: Morph Exchange Review
author: Justin Ball
layout: post
permalink: /2008/04/11/morph-exchange-review/
categories:
  - internet
  - Programming
tags:
  - cloud computing
  - engine yard
  - hosting
  - joyent
  - morph exchange
  - mosso
---

I recently wrote about Cloud Computing. [Alain Benedict][1] from [Morph Exchange][2] told me that I neglected to add his company to the list. I said I would check it out. He said he would hold me to it. Last night I spent a little quality with Morph and now have a few impressions to share.

 [1]: http://eedious.blogspot.com/
 [2]: http://www.morphexchange.com/

First, adding your application to Morph is a bit confusing. It is setup as an 'application exchange' so instead of signing up for hosting you 'subscribe' to the Morph DevCenter. Once you do that you create a new 'Appspace'. Once you get past the oddity of how to get going the next part is very easy. You click one button to create the database. Then you click another to download a Capistrano file. By default it is named morph_deploy.rb but I renamed mine to just deploy so I don't have to tell Capistrano the name of the file every time I want to deploy. Add the deploy.rb to your project, edit it and set your subversion repository, do a cap deploy:morph, enter your username and password and you are ready to go. In just a few minutes your application is up and running on Morph Exchange. At first I was confused about the database. I couldn't figure out what values I should be setting in my database.yml file, but then I realized that Morph takes care of that for you. You never set the production settings for your database you just do the deploy and go. Also, it is important to note that your database migrations must be compatible with PostGreSQL. 

Morph Exhange gives you a developer account for free. That includes 1GB worth of storage and 1GB worth of transfer. I found it difficult to find [pricing on the site][3]. It is a bit hidden. You'll find it under DevCenter then select the pricing tab. The cost of the service isn't bad. The developer account is free. One step up is $31 a month. (Morph Exchange uses 'Morph Credits' but one credit = one dollar). The pricing goes up from there all the way to $1023 a month. The pricing didn't seem to bad until I really spent time thinking about it. The $1023 a month service comes with 250GB of storage and 250GB of bandwidth. The bandwidth is the shop stopper for me. The [ThePlancollection.com][4] is not a huge ecommerce site but still burns around 300GB of bandwidth a month. Morph Exchange would not be a good option if you are planning on serving a lot of data to a lot of people which makes me wonder if it is a good option. The point of cloud computing is the ability to scale which means you will serve out a lot of data. In Morph terms that means a lot of money. On the lower end for $93 a month you get 15GB of bandwidth. This blog doesn't get a whole lot of traffic but I am pretty sure I serve that much data per month. If it cost me $93 a month I wouldn't be blogging. 

 [3]: http://www.morphexchange.com/map_info#pricing
 [4]: http://www.theplancollection.com "house plans and architectural information from The Plan Collection"

For comparison Joyent will let you serve 10TB of data a month even if you are only using their $45 a month plan. I know that you won't be able to serve that much data from a $45 a month account - you will overwhelm the server long before you hit that limit - but what they are saying is we don't care how much you serve. Instead they are focusing on helping you scale up your CPU resources to meet customer demand. That seems like a more reasonable model.

Mosso has an interesting model as well. Their plan starts at $100 a month. They don't measure your output in bandwidth but in requests. For $100 you get 3 million requests. After that it costs 3¢ per 1,000 requests. I don't care for that model either. I would rather spend my days worrying about providing enough CPU power to keep my app responsive for my customers and not worrying about how many requests my customers are making. Services like this actually encourage the provider to find ways to serve less items to their customers. You start re-architecting your application so that it won't serve as many items at a time. Remember that each file and each image is a new request so your best be here is to reduce images, css files and javascript files. You don't get ssh access to Mosso either which can be good and bad depending on how deeply involved you want to be with your hosting company. It also makes you feel like you have to chase away the free loaders like some grouchy old shop keeper - don't come look at my products unless you intend to buy.

Since I am wearing my EngineYard shirt today I'll throw them into the mix. I consider these guys to be the Ferrari of Ruby on Rails hosting. They were at the Mountain West Ruby conference. I spent some time eavesdropping while hanging out in their suite at the hotel. These guys are as core to the future of Rails as 37 Signals. They know what they are doing. However, [you will pay for this Ferrari.][5] Their slices start at $349.00 a month and incur a $249.00 setup. Take a deep breath and don't pass out. That price comes with a great support staff. It includes some of their time. Remember you have to pay your technical team so you will either pay this to guys in house or to the hosting guys. EngineYard is not the place to go if you are planning on building small web applications. It isn't for you if you and your buddy are building something in your basement. However, if you find you have the next big thing, have the funding and you need help scaling your Rails application so that it can serve millions of people these guys can do it. Expect to purchase 3 slices to really be up and running which means you will be in it more than a $1,000 a month. EngineYard is currently supporting [Merb][6] and [Rubinious][7] and is the host for [GitHub][8]. I like them I just can't afford them.

 [5]: http://www.engineyard.com/pricing
 [6]: http://www.merbivore.com/
 [7]: http://rubini.us/
 [8]: https://github.com/

Back to the original point. Morph is a great service. Deployment is simple. I give them lots of points for ease of deployment. They can help you scale as they are using Amazon's services on the back end. However, if they are going to be successful they really need to examine their bandwidth charges and become more competitive. I would like to see their website adapt a bit to make it clear that they offer scalable hosting. At first I was confused and assumed it was only a service provider - something like a hosted CMS system. Overall Morph Exchange is great, but I think they need to make a few changes to become excellent.