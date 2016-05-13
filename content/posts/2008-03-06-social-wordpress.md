---
title: Turn WordPress Into Social Butterfly
author: Justin Ball
layout: post
permalink: /2008/03/06/social-wordpress/
tags:
  - Interesting
  - internet
  - Programming
  - Social Software
  - Wordpress
  - DiSo
  - Oauth
  - OpenID
  - Social Software
  - Teachers Without Borders
  - Wordpress
  - wpmu
---

I have been pitching this idea of a distributed social network to everyone that can stand to listen to me. I realize that the conversation around WordPress and the future of social networking is heating up, but as it does I think it is important to begin thinking about implementation. It is fun to philosophize, but at the end of the day users want some toys to play with.

[Chris Messina lays out his vision and the particular functionality associated with it on his wiki][1]. Automattic picked up Buddy Press, and the [code is still available on Google Code][2]. For historical reasons here's a thread on the WPMU forums about the activity around Buddy Press. There is another social plugin for WordPress called Xiando][4] that hasn't gotten a lot of attention.
We are going to do our part and contribute as well.

As part of an effort to build a social network for Teachers Without Borders we came to a realization that it would be hypocritical to create a network filled with borders. Thus, we began thinking about how escape the social silos that constitute most social networks and bring the focus back to the individual. That focus led us to blogs which now leads me to the actual details of how to build a network around individuals.

I think it goes like this:

1.  Rich Profile in your blog
    *   Ability to add all the fields associated with your typical social networking platform. This could be done in a folksonomic way. Let users add whatever fields they want and allow communities to converge on an ontology. Perhaps there could be a microformat standard for this.
    *   We'll get to what a community is in a bit, but different communities have different needs and would require variable metadata. For example, Teachers Without Borders would likely need to gather information about teaching skills, volunteer efforts, translation abilities etc. Let each community request this specific information from members, but store the data in each member's blog. The primary goal is to center each individual's activity around the space they own rather than lock it up in a data silo.
    *   Everyone is building identity aggregators these days. That is stupid. Why should I gather up my data into a silo where some big company can benefit from my efforts. Instead gather the bits into the user's own little part of the internet. If you want to gather up your data gather it up into a space you control.
    *   Once the data is gathered up you can then control pass it back out to your friends. This won't be hard as your friends will be stored locally.
2.  Friends
    *   A blog roll looks an awful lot like a list of friends and XFN and FOAF let you express relationships, something Facebook doesn't let you do. This part of your social network is obvious.
    *   Create a friend request widget so that someone that finds you can initiate a relationship. Clicking the button would request a url to their blog. Behind the scenes your blog would contact their blog, discover what it can based on their profile and aggregated identity and report back to you. You would be notified of the request, provided with the other user's information and then have an opportunity to describe your relationship with that person.
    *   A first pass at this would leave everything public, but features could be added to control your interactions with your friends so that your boss doesn't see pictures of you and your buddies from college. [Chris Messina has a handle on that idea using OAuth][5]
3.  OpenID
    *   Your blog becomes your OpenID provider. Whether this is through delegation or by your blog actually being able to act as a provider I think is an open debate
    *   OpenID becomes palatable because when you make a friend request on someone else's blog it asks you for your blog url which just happens to be your OpenID. The interaction is natural rather than the odd login experience you currently get with OpenID that confuses most users. (I tried using OpenID and nobody understood that they needed to enter a url for their username. Normal users have a hard time getting that.)
    *   OpenID lets you establish the initial connection with another user or with a community. During the interaction the two blogs exchange authentication information which will let them request data at a later time based established relationships between the blogs.
4.  Trust
    *   Spam is a problem so when somebody makes a friend request they enter their url and login to their blog using OpenID. After that two blogs exchange data. If the person making the request is already trusted by someone you trust or is trusted by a community you trust then you would see their request.
    *   It is possible to scan through networks and find out if the person is trusted 5 or 6 levels. This would work kind of like the DNS system where if one system doesn't know the IP address they ask the next guy. Might have to be careful on this one though so that you don't end up with bots constantly scanning your friend's friends looking for people to trust.
    *   If a user belongs to a community you trust they would float to the top.
    *   The bots that want to be your friend could then float to the bottom, or an Akismet style system could be setup where users contribute to the list of known bad guys
5.  Stream of Consciousness
    *   Since your blog now has all your friends setup it is easy to watch the data coming into their profile and suck that into your blog. You would go to your blog to see what your friend's are up to or the stream could be feed back out to a reader.
    *   Each entry in the stream could have a discussion attached. The discussion could then be fed back out when your friend's harvest your blog. Think it as a distributed forum.
    *   A share button would share things you find with your friends. You could even add a bookmarklet that dumps interesting crap you find on the net into your blog which would then be fed back out to your friends.
    *   Applications are merely WordPress Plugins that interact with the stream. Riding in the MS 150 and need donations? Install an app and have it post a message to your stream. Want to poke someone? Add a plugin, the poke shows up in their stream and they can click to add the new plugin. Granted this would take a bit of work as the plugin would have to be installed, but we'll figure it out.
6.  Chat
    *   A dream feature for me would be a chat that understood my relationships. At night only my wife and video game buddies could see me. During the day I could shut down friend chatter while I am at work. No longer would I have to maintain 6 IM accounts. (Why hasn't anyone done this?)
7.  Community
    *   For the guys who are already popular community is not a problem. People flock to them. For a new blogger the question becomes how do I get people to read what I write? If you are into SEO the question is how do I get links? There are a lot of great writers on the Internet that are not A-list bloggers.
    *   Make the A-list irrelevant. Outside of the geek community many people don't care about the top bloggers. My wife wants scrapbook information. My dad is looking for motorcycle junkies. I would love to be able to push a button an have a short term community that lets me and a few other guys work together for a few months. Student study groups may not live beyond a semester but are extraordinarily valuable during their lifespan.
    *   You sign up by adding your blog
    *   A community will be made up of bloggers that apply to join. If a user wants to join but doesn't have a blog WordPress MU will provide one if the community is built on this platform.
    *   The community will aggregate posts from users and filter on tags, editor's opinion or collaborative filtering based on how the community creator sets it up. Think millions of Diggs with the community in charge.
    *   Even without a WPMU install you could spawn a community from your blog - handy for the throw away groups where we only need to collaborate for a short period of time.
    *   New members who write well would find their way to the top of the heap so it is no longer difficult to get attention from people who matter to you.
    *   Since the community is sucking in posts from its members it can connect users with one another based on existing friend relations and based on the content generated by each person.
    *   A new community must be trivial to create
    *   If the community needs profile specific meta data it can request that data when the user signs up. The data is added to the user's blog and then harvested by the community. This information would be namespaced by the community url and therefore unavailable to other communities. I'm still thinking through that process.
    *   Use Lucene to index incoming data and make recommendations.

This is what I have so far - at least that is what I have distilled from the pile of drawings on my desk. I will be interested to see how much of what we want to do overlaps Automattic's efforts with [Buddy Press][6]. If we overlap I am hoping they get done first so we can use that. We will also be watching the [DiSo][7] project closely. This is a great opportunity for the community to build and individual and collectively own the social graph.

Let me know what you think.

 [1]: http://factoryjoe.pbwiki.com/DistributedSocialNetwork
 [2]: http://code.google.com/p/buddypress/
 []: http://mu.wordpress.org/forums/topic.php?id=7448&page
 [4]: http://xsnp.livelyblog.com/
 [5]: http://factoryjoe.com/blog/2007/12/06/oauth-10-openid-20-and-up-next-diso/
 [6]: http://ma.tt/2008/03/backing-buddypress/
 [7]: http://diso-project.org/