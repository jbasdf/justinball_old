---
title: apachectl stopped working after Mac OSX 10.6.5
author: Justin Ball
layout: post
permalink: /2010/11/23/apachectl-stopped-working-after-mac-osx-10-6-5/
tags:
  - apache
  - error
  - mac
---
I noticed today when I tried to restart apache on my Mac that it had stopped working and gave me this error:

  /usr/sbin/apachectl: line 82: ulimit: open files: cannot modify limit: Invalid argument

Luckily the world is a big place and [someone had already fixed the problem][1].

 [1]: http://blog.deversus.com/2010/11/mac-os-1065-apachectl-usrsbinapachectl-line-82-ulimit-open-files-cannot-modify-limit-invalid-argument/

Just open up /usr/sbin/apachectl and change (around line 64):

  ULIMIT\_MAX\_FILES="ulimit -S -n \`ulimit -H -n\`"

to

  ULIMIT\_MAX\_FILES=""