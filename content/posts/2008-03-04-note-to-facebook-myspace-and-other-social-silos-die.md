---
title: 'Note to Facebook, Myspace and Other Social Silos: DIE'
author: Justin Ball
layout: post
permalink: /2008/03/04/note-to-facebook-myspace-and-other-social-silos-die/
categories:
  - COSL
  - Interesting
  - internet
  - Programming
  - Projects
  - rant
  - Social Software
  - Web2.0
tags:
  - communities
  - Education
  - open source
  - Social Software
  - Teachers Without Borders
  - Web2.0
  - Wordpress
---

I wrote three Facebook apps and I have ideas for several more. The most successful was the [House Plans application][1] I did for [ThePlanCollection.com][2], but in the Facebook world you can't count a couple thousand users as especially successful.

 [1]: http://apps.facebook.com/house-plans/
 [2]: http://www.theplancollection.com/

When Open Social started up I felt like I needed to go sign up for a [MySpace][3] account so that I would be ready for when the next big thing showed up. So far Open Social feels like that high school party the nerdy guy threw and two or three other nerdy guys showed up but come Monday morning it will be the joke of the high school. I turned off email alerts for MySpace because I grew tired of the offensive bot spam. I tried playing with [Orkut][4] because that was the first platform that supported [Open Social][5]. Orkut feels like the Twilight Zone. I tried [Twitter][6] for a while. It is a cool service, but I forget its there unless I am bored and the only thing handy is my phone and I want to post about my boredom. How's that for boring.

 [3]: http://www.myspace.com
 [4]: http://www.orkut.com/Home.aspx
 [5]: http://code.google.com/apis/opensocial/
 [6]: http://twitter.com/jbasdf

There are countless other services I have signed. Long after I am dead my name will live on in the databases of the one or two successful social websites and decay with me in the hundreds of dead companies that burned venture capital like fireworks on the Fourth of July.

I am tired of data silos. I am tired of trying to keep up with every new site that comes along. I am tired of someone else owning my place on the internet. This is my place. This blog is me. Anyone who reads this I am sure will think I am strange that I mix my personal thoughts in with my programming frustrations. I don't care. I write this for me because I own these bits and by hell they will do my bidding.

I am currently working at The Center for Open and Sustainable Learning as a Teachers Without Borders Fellow. That is a long title, but it has given me the opportunity to consider what it means to truly work without borders. I think humans thrive on borders. Borders keep people out and keep people in. For me a border is a mnemonic that brings up images of a refugee escaping the evil influence of communism by dogging bullets as they scale the Berlin wall. That's what they taught me in seventh grade. Of course they also told me about how the United States never does anything evil. Huh. Borders make me think of the giant fence the United States is building to keep out the people that do a lot of the hard work in this country. Borders make me think of the DMZ between North and South Korea.

Sadly I think we are comfortable with borders. For some reason people like it when other people are kept out or held in. It makes us feel safer. I makes us feel special. We are we and they are them.

Big companies like that. The borders they build keep people in and make them ripe for 'monetization'. Gmail and Orkut were originally invite only. Facebook required you to have a University address. These constraints no longer exist but helped establish a perimeter of coolness. These tactics are no longer needed. The border is invisible. The border is built from our friends and network. They don't own those networks per se, but they own the technology that makes it easy to manage that network. It is hard to cross the border. No guns are needed to keep people in.

What's a fed up, ranting, liberal, nut job to do?

It's time to bring the world to me and to you and to everyone else that is tired of data silos and social network with sketchy user agreements. Social networks exist in the real world without technology. Technology just makes it easier to manage the network. The next revolution is coming and it will kill the big silos. Probably.

One of the largest and oldest (in internet terms) social networks is that of the bloggers. Blogging is not the domain of super geeks. Non technical people do it. My wife does it. My parents could probably pull it off. WordPress, Blogger and Typepad have brought this opportunity to the masses.

Blogging or writing rather is an individual activity made better through group feedback. Within the blogosphere there is a network, but so far it has been implied rather than being overt.

That is changing. Today Ma.tt posted that [Andy Peatling][7] the guy who [created Buddy Press is joining Automattic to work full on Buddy Press.][8] A few days ago [Rashmi Sinha][9] wrote an 'Open letter to Matt & Toni: Three ways for WordPress to become more of a social network'. The [DiSo][10] [project][11] is targeting WordPress first in an effort to create an open social network. [An interview with Chris Messina about the project can be found here][12].

 [7]: http://blazenewmedia.com/
 [8]: http://ma.tt/2008/03/backing-buddypress/
 [9]: http://www.rashmisinha.com/2008/02/wordpress-social-network/
 [10]: http://diso-project.org/
 [11]: http://factoryjoe.com/blog/2007/12/06/oauth-10-openid-20-and-up-next-diso/
 [12]: http://factoryjoe.com/blog/2008/01/23/the-existential-diso-interview/

I am not at the level of any of these individuals, but going back to my space is here, on this blog, I think my social network should revolve around me right here.

So how do I pull my world to me, but at the same time connect out to larger communities while prevent my information from becoming trapped in a social silo? The answer begins with open source software which leads me to WordPress.

We have been playing around with WordPress, with plugins and themes and with WordPress Multiuser. The first part of any social network exists within this platform. What you learn about me here on this blog is far richer than what you will find on my Facebook, Myspace or any other profile. My activity is here and so one of the most significant components of any social network - the profile already exists. Now, since I don't advocate unplugging from the larger Internet ecosystem what is needed are plugins that pull my data from all the places I live on the Internet. I know there are a few plugins to pull from delicious etc, but what I am envisioning is [FriendFeed][13]. A plugin that can pull my data from any and all services I use. For richer interactions the plugin will use the services specific APIs. For other systems use Atom or RSS. These services will be available to my 'friends' via an opml file. For simplicity put a 'friend request' button the the blog. A successful request will result in an exchange of opml files between my new friend and I. Now I can watch my friend's delicious, flickr and twitter accounts via my blog. The content could be fed to a public or private page for the world to see. Add commenting to each of these entries. Let the comments float between blogs so that they show up for anyone participating in the conversation. Think of the Facebook news feed, but on your blog.

 [13]: http://friendfeed.com/

Another plugin would let me manage my relationships with my friends would let me specify who shows up in my blog roles and would be exportable via FOAF. That information could be used to establish trust - ie my friends probably trust me and if I am trusted by a friend of a friend then when I post on another guy's blog I am automatically trusted and we keep the spam bots out. [This method works for Twitter and I think it could work on an open network][14].

 [14]: http://www.russellbeattie.com/blog/nearly-a-million-users-and-no-spam-or-trolls

As you collect friends you build rings of trust. Enable your blog as an OpenID provider - why do a need an external server for this?. Why shouldn't my blog url be my OpenID url and enable provider capabilities via another plugin. Now your blog url gives you access to any website that accepts OpenID and to friends blogs. When you log into a new blog or site the relying party could then ask your blog who trusts you ie who is in your friend list.

The next step is to build communities. I realize this is kind of like building borders, but if the community software is open source then if you grow tired of the community it is easy to split off and form something new. I have had an internal debate about how to build this piece. I would love to use Ruby on Rails for this task, but I think it makes a lot of sense to use WordPress Multiuser to build the community piece. Doing so means that new members that don't have established blogs can easily create a new one. If they decide that they are ready to start their own blog then all they need to do is take their data and move it to another WordPress Blog. Freedom. The function of the community would be to aggregate stories from its members and then provide interesting methods for discovering those stories. It would provide a mechanism for finding others with similar interests. I think that one big complaint of many bloggers and one big problem faced by all website is finding others with similar interests and then moving into a state where some kind of relationship exists. By providing a mechanism for discovering others in the same area of interest the community would facilitate interlinking of members which benefits new and old bloggers alike as quality, meaningful links are the currency of the internet.

Again the community would be fed to my blog. My posts would be sent to each of the communities that I belong to and filtered via tag. Only send Rails posts to the Rails community and Php posts to the Php community. We wouldn't want to start a holy war. This is the eduglu that [Brian Lamb][15] has talked about many times. We tried it with a project called [Ozmozr][16] but had a hard time because we tried to feed all data into one system. Niche communities wouldn't have to deal with nearly as much data as they only harvest and keep the posts that are meaningful to the group. 90% of the rest would be thrown away. Interesting topics could be kept in a wiki. Use that same space to collaborate on group projects that involve more than one author, or create more sub-blogs - thus the WPMU install - that let users create carefully constructed content. [David Wiley recently showed that courses could be created using a WordPress blog][17]. Authors could write books the same way. The opportunities are extraordinary. There are some very cool Mediawiki integrations with WordPress or if you want to get drunk on [Automattic][18] love then use Bliki.

 [15]: http://weblogs.elearning.ubc.ca/brian/
 [16]: http://www.ozmozr.com
 [17]: http://newmediaocw.wordpress.com/
 [18]: http://automattic.com/

Each community will have its own home page and own place on the internet. New members would use that to discover the group. They would join the group by adding their blog or by creating a new blog on the WPMU instance.

Each user will manage most of my interaction with the group on their own blog. Links that provide my social interaction on my blog couldn't be kept in sync with an RSS reader via opml or styled to look cool and kept on my blog. I and all my friends would automatically interlink and would be able to participate in meaningful discussion.

If the community is such that walls or poking is required such functionality could simply be added via another plugin. There will be no need to really on another application framework like fbml. If you can write a WordPress plugin you can create an application for this social network.

I think this method of social networking is subtle, but has greater long term impact. I am excited to see Buddy Press find its way to Automattic. Hopefully we will be contributing some meaningful plugins soon that implement the ideas outlined here.

The world is becoming open. Die silos. Die.