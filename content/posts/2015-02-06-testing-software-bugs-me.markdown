---
layout: post
author: Justin Ball
title: "Testing Software Bugs Me"
date: 2015-02-06 15:27:26 -0700
tags:
  - Software
  - Testing
---

<p>Agile practices have pushed software engineers towards test driven development. The result has been an increase
in project velocity and general happiness all around. However, at some point you will get a project that either
lacks tests or has insufficient test coverage. Even on projects that have 100% coverage bugs will still manifest
themselves. For example, the developer may have misunderstood the requirment during implementation. Their test
might pass but the code it test is an expression of incorrect behavior.</p>

<p>For these reasons we still use staging servers and we still go through testing before a final release to 
production. It takes a special person to endure the procoess of testing the same software over and over. 
Finding bugs in software is not typically the job most developers long for so I'm greatful to our team
members who diligently deal with the process each week.</p>

<p>Bugs don't always show up during QA either. The worst bugs make it to production and are typically found
during some critical demo. I really hate those bugs.</p>

<p>Where ever a bug is found in the process it's critical that it be recorded and recorded correctly.
  If a bug report doesn't contain detailed enough information the developer working on the problem can waste
  an insane amount of time trying to reproduce the bug. Make the bug report obscure enough and you'll end up with a
  pissed off developer and a report marked "Unable to Reproduce".
</p>

<p>You want your limited and expensive development resources fixing bugs not trying to find them all over gain. 
Here are a few tips for moving your developers from the bug discovery phase to the bug fix phase as quickly as
possible:</p>

<ul>
  <li>Include a url. It doesn't matter if it's a production, staging or development url. The developer can
  figure out the domain. If the application is written correctly the rest of the url contains critical state
  information that can be used to locate the bug and reproduce the state.</li>
  <li>Don't try to pack everything into the title. I've seen plenty of bugs with a title and no descriptoin. Unless the 
  bug is something along the lines of change this text the title is insufficient to accurately desribe the problem.</li>
  <li>Do use <a href="http://www.techsmith.com/jing.html">Jing</a> to capture a short video demonstrating the steps to
    reproduce the bug. I worked on a project once where almost every report came with a Jing. Finding and reproducing
    the bug was trivial.</li>
  <li>If you don't feel like you need a full video take a screenshot. <a href="https://evernote.com/skitch/">Skitch</a> 
    works great. Do draw on the screen shot. Make notes. Add arrows that point to problem areas.
  </li>
  <li>Write a detailed description. What browser were you using? What version? Do you have any plugins installed?
  What operating system are you on? If you want to be really helpful open up the javascript console. Are there errors?
  copy and paste those over.
  </li>
  <li>If you need to communicate with the developer about the bug. Include the comments in the bug. We use Pivotal Tracker.
  It's awesome. It has comments. Keep all the discussion about the bug included with the bug. Emails will get lost or forgotten.
  It might be tempting to walk over to someones desk and tell them all about it. Don't do that. They're probably working on 
  something else and will immediately brain dump everything you tell them.
  </li>
  <li>
    While you are compiling the the report think of yourself getting hit by a bus on the way home from work. You will
    never speak of this bug again. Someone else has to fix it. They can't ask you a question. They can't read your mind.
    Details and context matter include them in the description. We are human beings. We forget. When a developer gets around
    to fixing the bug you entered last week or last month you will have forgotten everything about it.
  </li>
</ul>

<p>That's it. Happy squashing. Watch out for busses.</p>