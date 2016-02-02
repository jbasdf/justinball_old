---
title: 'ActiveRecord::StatementInvalid: Mysql::Error: Got error 139 from storage engine'
author: Justin Ball
layout: post
permalink: /2010/08/09/activerecordstatementinvalid-mysqlerror-got-error-139-from-storage-engine/
categories:
  - error
  - mysql
  - Ruby On Rails
---

I ran into a 'fun' error with an application I've been working on. Everything was running fine and then one day <a href="http://hoptoadapp.com/pages/home">hoptoad</a> started filling up with exceptions like this:
<pre>
ActiveRecord::StatementInvalid: Mysql::Error: Got error 139 from storage engine
</pre>

I hate errors like that. Lucky for me there's Google:
<a href="http://forums.mysql.com/read.php?22,63584,166521#msg-166521">http://forums.mysql.com/read.php?22,63584,166521#msg-166521</a>
<a href="http://bugs.mysql.com/bug.php?id=10035">http://bugs.mysql.com/bug.php?id=10035</a>

Turns out that each row in mysql has a limit of 8000 bytes. A 'text' column takes up 768 bytes in the row after that it moves the data to an db external page. When you have Rails migrations you forget how many 'text' columns you have. Turns out I had 14:

14 x 768 = 10752 bytes

What's interesting is that you can get away with this setup until one day one of your users enters a lot of data. At that moment you will get the dreaded:

<pre>
ActiveRecord::StatementInvalid: Mysql::Error: Got error 139 from storage engine
</pre>

Time to refactor and break the table apart. I did that and broke the one model into smaller models and now everything is wonderful again.