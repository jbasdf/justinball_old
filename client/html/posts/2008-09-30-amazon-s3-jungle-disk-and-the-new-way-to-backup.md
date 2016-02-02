---
title: Amazon S3, Jungle Disk and the new way to backup
author: Justin Ball
layout: post
permalink: /2008/09/30/amazon-s3-jungle-disk-and-the-new-way-to-backup/
categories:
  - Computers
tags:
  - amazon s3
  - backups
  - jungle disk
---
Not long ago I wrote a [rather unflattering review of Mozy][1]. I feel bad in a way because I still believe that the concept is good. I haven't played with the software recently but I am guessing that my voice was loud enough to influence significant change.

 [1]: http://www.justinball.com/2008/02/22/mozycom-and-their-backup-software-is-shit/

I am fine with that.

There are a number of other companies that offer similar services. However, at the end of the day I think the simple solution is the one I will go with. In fact I went with it. It took me 15 minutes to setup one night and it now costs me literally pennies to backup my data.

Step One:
[Download Jungle Disk][2]. This nice little app makes it simple to send files to S3 and it is cheap - $20.

 [2]: http://www.jungledisk.com/index.aspx

Step Two:
[Get a key from Amazon][3]. They'll want your credit card.

 [3]: http://aws.amazon.com/

Step Three:
Tell jungle disk to automatically backup specific files to amazon.

The cool thing is that Jungle Disk is easy to use and will walk you through getting a key and setting up your backups. It also won't fill your temp drive with random crap.