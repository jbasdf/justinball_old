---
title: Building Community-focused Apps with Rails Dan Benjamin
author: Justin Ball
layout: post
permalink: /2007/05/18/building-community-focused-apps-with-rails-dan-benjamin/
categories:
  - RailsConf
  - RailsConf07
tags:
  - RailsConf07
  - Ruby On Rails
---

Sitting in the community app presentation right now. I was torn between this and the clean code presentation, but since we are building community apps this presentation seemed to be the most appropriate.

Here's the first slide:
Fast prototyping
Prototype becomes product
Help Developers and Designers work together.

I am hoping it gets better and that the intro is just a quick run through the basics. If I end up in a bunch of sessions with nothing more than common sense, basic crap I will be pissed.

Here are my scatterbrained notes:

*   They developed [cork'd][1] at night over a few months as a hobby. It cost a couple hundred bucks.
*   Cork'd has been aquired.
*   They had 500 users in the first 2-3 hours and now have about 20k users.
*   Think of your efforts as a product. Keep the business in mind.
*   Start small - their first web server was a Mac Mini
*   Resist big infrastructure
*   Build the right team that may or not be friends. Don't add to many people
*   Determine ownership
    -- just my notes on the last two. They are critical. If you don't it will cost you a lot of money and you might lose friends.
*   Have a revenue stream, ads don't count. Ask yourself will I charge users? Will I have a pro version?
*   Focus on simplicity. Whatever you do do it well. Don't start with 50 features. Don't build features just because they are cool. Build simple interfaces.
*   Don't release a public beta. I disagree with this one. I think the Rails framework is in many ways a public beta. Perhaps the perception of 'Beta' is just different.
*   Know your audience and be your audience. I agree. If you use your app it is much more likely to be successful. If you are a user you will find the stuff that sucks.
*   Rails plug component - he is happy to user Rails. It helps them etc etc. ![:-)][2]
*   Think like a designer. This is not an easy one for programmers. I have been reading various UI design books and finding content on the net. In the future you will find yourself doing both. Maybe we need a combined programmer/designer degree?
*   Maximize your front page. All the important text should go 'above the fold' - think newspapers on the news stand. You only see the stuff above the fold. Put your important stuff at the top. Don't make the user scroll. Look at slideshowpro.com. They actually drew a line where they assume the fold is.
*   Consider the data. Avoid big migrations.
*   User-entered data == bad. At least for them. Users can't spell. They mis enter data. I would say if your app depends on the data being clean this might be true. However, for sites like Youtube and Myspace user entered data has worked pretty well. These guys are in a niche (wine) where clean data is important. I think that is because if people want general data google will get you in the right direction. However, once a user enters a site with a specific purpose they expect a higher level of accuracy. (They would just keep using Google otherwise). I think you see this with sites like Zillow. They have very specific metadata that simplifies the search. It would be interesting to investigate user behavior and expectations in different search contexts. I would guess that users tolerate detailed search in niche areas. When you search real estate don't you enter a lot of specific parameters ie square feet, location etc? On my [house plan website][3] we have a search that let's users enter very specific meta data and it works. People use it. If the data wasn't good and carefully controlled they would probably move on.
*   Collaborate with other developers and collaborate in real time. This is how I and my partner work on [our house plan site The Plan Collection][4]. Ironically, we live two houses from each other, but we meet to do business only on occasion.
*   Don't repeat yourself. Use plugins or other services. Leverage existing applications.
*   Take a break now and then
*   Make Google your friend. Get links so people can find you.
*   Leverage markup. Write good html. Google understands markup. Get the semantics right.
*   Recruit users. Only ask for what is absolutely necessary. Make the signup easy to find. Make the signup clean.
*   Give people that sign up extra value
*   Get people to come back.
*   Make frequent updates. At [COSL][5] with the [folksemantic tools][6] we are good at this. If you work there you know what I mean.
*   Respond positively to your users.
*   Share your API
*   Find good partners - other companies in the same space. Find people that you can work with.
*   If you do things right people won't know you've done anything at all. I agree here. Your software should not get in the way of the user's life. Instead it should enhance and/or simplify the user's life.
*   just ship it. Pare it down and get it out the door. Released software beats vaporware.

 [1]: http://corkd.com/
 [2]: http://www.justinball.com/wp-includes/images/smilies/icon_smile.gif
 [3]: http://www.theplancollection.com/ "The Plan Collection.com"
 [4]: http://www.theplancollection.com "The Plan Collection.com"
 [5]: http://cosl.usu.edu/
 [6]: http://www.folksemantic.org/

**Questions:
**

What were some of the most successful social features?
The beta was great for getting feedback from users. They added 'Drinking buddies'. People would want to see what their friends were drinking. They have RSS that outputs this data.

What was the ratio of design to code?
They spent far more time on code than on design, but he has a great designer.

One guy here doesn't like to keep the prototype. What are the implications of releasing on your prototype?
The continuing changes in Rails resulted in a lot of changes.

How important was it that they like wine?
They weren't wine experts. Cork'd is now owned by wine experts. It is critical that you can keep up with the audience. You don't have to be the best domain expert, but you do need to understand the space.

How did you deal with people gaming the system? They only had two problems. That was it.