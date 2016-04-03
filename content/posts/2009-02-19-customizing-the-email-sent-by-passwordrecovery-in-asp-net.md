---
title: Customizing the email sent by PasswordRecovery in ASP.Net
author: Justin Ball
layout: post
permalink: /2009/02/19/customizing-the-email-sent-by-passwordrecovery-in-asp-net/
categories:
  - ASP.Net
  - Ruby On Rails
  - ASP.Net
  - password recovery
  - Ruby On Rails
---

I spend most of my time working with Ruby on Rails these days.  However, I still do .Net programming mainly for <a href="http://www.theplancollection.com">ThePlanCollection.com</a>.  Our password recovery system has been a bit flaky lately so I decided it was time to review the code and get it into polished condition.

I found out that I was redirecting the user to the wrong page after the password recovery and so it appeared that the password reset was failing.  Big oops.  While working on the code I decided that the email message were sending out sucked.  Users expect more out of the web these days and we should deliver it.  <a href="http://www.codeverge.net/ng.asp-net-forum.security/customizing-the-email-sent-by-passwordrecovery">I found this link on customizing the password recovery control in asp.net</a>.  It is simple and to the point, but what if I want to added more customization to the message and include other dynamically generated values?

It's kind of funny how I slip into old habits when I work in the .Net world.  My immediate reaction was to start searching the web for the Microsoft sanction method of passing parameters to the email text file.  I am sure I would still be searching if I kept pursuing that course.

Instead, I just added this to my email.txt file:
<pre><code class="html">
  <%url%>/login.aspx
</pre></code>

then I did this in my code:
<pre><code class="csharp">
protected void On_SendingMail(object sender, MailMessageEventArgs e)
{
  string message = e.Message.Body.Replace("<%url%>", ConfigurationManager.AppSettings["LiveWebsite"]);
  //....
  //send message logic
  //....
}
</pre></code>

I know that all the purist out there are calling me a hacker.  You will say that I cheated and just did a string replace instead of figuring out the right way which would involve overriding some method and setting up properties on an obscure object.  I'm guessing the last part.  If I really knew how to do it I would have probably just done it.  Anyway, to all those crying hacker I say so what.  It took me 2 minutes to put this together.  It feels kind of like something I would do in Rails Rails does have 'sanctioned' ways of doing this type of thing.  It doesn't look like what I did, but that's where I stole the idea.

I don't want to start a holy war.  I'm not saying Rails is better than .Net.  Instead, I think it is important that programmers embrace multiple platforms and ways of doing things.  Let the ideas from one system bleed into another and you might find time to spend with your family.