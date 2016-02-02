---
title: Logan Utah Technical Jobs
author: Justin Ball
layout: post
permalink: /2008/08/06/logan-utah-technical-jobs/
categories:
  - jobs
tags:
  - jobs
  - logan
  - tech
  - utah
---
Tech jobs seem to be rare in Logan so I always love to see local companies succeed. [AdventCreative][1] has a tech position open and is looking for a couple of people to help out with consulting. If anyone is interested in any of these positions just visit [AdventCreative's website][1] or leave a note in the comments and I'll send along their email.

 [1]: http://adventcreative.com/

Here's the details:

**Opening at AdventCreative**
Hardcore Programmer // Urgently needed for our creative agency

Advent Creative is a group of 12 uber-creative designers, developers, videographers and marketers. We are young, innovative, and constantly striving to push the envelope. We have clients across the globe, from Marriott hotels in Hong Kong, to USAID projects in Sudan. Advent is growing faster than ever and wants only the best talent.

We are in urgent need for a superhuman (or at least very skilled) programmer for our team. This position would primarily involve working together with two other web developers to create killer websites and unreal custom apps.

REQUIREMENTS:
1. Java/C /C# experience
2. HTML/CSS/Javascript
3. ColdFusion experience is ideal but not necessary -- as long as you are willing and excited to learn it
4. Database experience is a huge plus
5. Desire to build custom apps
6. Experience with Wii video games, or willingness to undergo rigorous training, for lunch break competitions
7. Desire to quit workin' for "the man" and grow with a company

**PHP Consultant:**
Essentially we need someone that knows linux and specifically is familiar with working on linux from a remote location through the various available services. Even better if they are familiar with CPanel which is what is being used to manage the linux webserver. What needs to be done is fix the newsletter app (php ready made app). I think there is something wrong with the database which is where we got stuck because I couldn't get access to look at it.

The a backup of the databases needs to be done and the new software Julie requested needs to be installed (I believe it's all PHP based). Really not terribly complex, we just need someone who has the time to sit down and figure things out and communicate with Julie to see if they can get all the credentials they need to make headway.

**Consultant for System Integration and Crystal Reports**
MWA is a integration problem between three different systems.

The first system interfaces with MWA billing and then calculates compensation on a point system for each of the anesthesiologists. This system is powered by an Oracle database and runs reports using Crystal Reports 8.5 and a custom Delphi application to generate PDF compensation reports. Our application is a ColdFusion 8 based application that needs to recieve these reports. I've discussed with Ryan Pulley at MWA how we might go about recieving these reports and there are a couple of ideas. If they send us PDF reports through a secure connection then somehow we are going to have to access or have access to a database table on their end which will help us translate who each of the PDF's belong too. The presents a problem cause either we maintain a syncronized table on our end or we someone need access to their database to run queries against it. The could be done either through a secure VPN connection or by implementing a server to host the MWA site inside their firewall.

The second system is a MAS 90 fincial reporting application which interfaces with the MWA system to recieve the compensation repots and then do further calcuations for taxes and that kind of stuff which then out puts pay stubs. MAS 90 uses and OEM version of crystal reports 8.5 (meaning it is customized by them) and may present some of it's own integration problems as a results. We will also need to research how to connect with the MAS 90 system to run those repots by anethesiologist from our system based on ColdFusion 8.