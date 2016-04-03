---
title: 'no <processor_id> configured for <Any>'
author: Justin Ball
layout: post
permalink: /2009/10/16/no-configured-for/
categories:
  - Ruby On Rails
tags:
  - gems ruby on rails
  - jeweler
  - ruby
---
If you are using Jeweler and get this error:
<blockquote>
  no  configured for
</blockquote>

Check out the troubleshooting section:


You need to edit ~/.rubyforge/auto-config.yml and make sure processor_ids is set like this:

    processor_ids:
            IA64: 6000
            AMD-64: 1500
            Any: 8000
            Sparc: 4000
            PPC: 2000
            Other: 9999
            Alpha: 7000
            i386: 1000
            UltraSparc: 5000
            MIPS: 3000