---
title: Gems on an EngineYard Solo instance
author: Justin Ball
layout: post
permalink: /2009/09/12/gems-on-an-engineyard-solo-instance/
categories:
  - engineyard
  - gems
  - Ruby On Rails
  - solo
---

I started running into a few issues on an Engineyard Solo instance with my muck gems. Basically, [muck][1] consists of a lot of
Rails engines packaged as gems for reusability. When we release a new app we also need to release new versions of the gems since
that's where most of guts of the lives. This worked fine until recently when we rebuilt our instance (to switch to [Passenger][2]).
In the past a wait of about ten minutes was sufficient for the new gems to show up. The problem was that I would do a sudo gem
install muck-engine and no matter how much cussing I did I ended up with the old version not the new one that I just released.
I checked gem env and http://gems.rubyforge.org was listed as a source. Thanks to [Ezra][3] I found out that Engineyard
maps http://gems.rubyforge.org to a local mirror. If you want to change it just edit /etc/hosts and comment out the
line that looks like this:

 [1]: http://github.com/jbasdf/muck/tree/master
 [2]: http://www.modrails.com/
 [3]: http://brainspl.at/

    174.129.222.219  gems.rubyforge.org

All better again.