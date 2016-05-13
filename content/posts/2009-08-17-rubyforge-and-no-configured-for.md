---
title: 'Rubyforge and no <processor_id> configured for <Any>'
author: Justin Ball
layout: post
permalink: /2009/08/17/rubyforge-and-no-configured-for/
tags:
  - gems
---
I've been using [jeweler][1] to setup a new gem. I followed the instructions provided, but started getting "  configured for " when I tried to do release my gem with "rake rubyforge:release". It turns out that the rubyforge gem doesn't quite configure everything for you. I added the following to ~/.rubyforge/autoconfig.yml and it started working:

 [1]: http://github.com/technicalpickles/jeweler/tree/master

    processor_ids:
      IA64: 6000
      Any: 8000
      AMD-64: 1500
      PPC: 2000
      Sparc: 4000
      Other: 9999
      i386: 1000
      Alpha: 7000
      MIPS: 3000
      UltraSparc: 5000