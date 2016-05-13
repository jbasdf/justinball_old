---
title: Script Your Development Environment Setup on Your New Mac
author: Justin Ball
layout: post
permalink: /2011/12/03/script-your-development-environment-setup-on-your-new-mac/
tags:
  - Ruby
---
Just in time for Christmas. Every developer who's been good this year is hoping for a new MacBook under the tree. (Actually your better off waiting since Apple is likely to release new machines in 4 or 5 months). Anyway, if you need to setup a development environment in a hurry here are some scripts that will make your life a whole lot sweeter:

**Thoughtbot** provides instructions and a laptop setup script. This one installs a whole lot of stuff but it's pretty close to my typical install:
[http://robots.thoughtbot.com/post/8700977975/2011-rubyists-guide-to-a-mac-os-x-development][1]

 [1]: http://robots.thoughtbot.com/post/8700977975/2011-rubyists-guide-to-a-mac-os-x-development "Thoughtbot Laptop Setup Script"

**Pivotal Labs** provides something similar. [You get all this stuff][2]. Again this is close to my setup and Pivotal Labs does some pretty intense testing so I'll probably give this one a go the next time I need to install
[https://github.com/pivotal/pivotal_workstation][3]

 [2]: https://github.com/pivotal/pivotal_workstation/tree/master/recipes "Pivotal Labs chef recipes for laptop setup."
 [3]: https://github.com/pivotal/pivotal_workstation "Pivotal Labs laptop setup."

**Lunar Station** appears to take your machine from nothing to everything via chef scripts. (I like the idea of using chef). It does install Chrome and Skype and appears to use homebrew for a lot of the work:
[https://github.com/LunarLogicPolska/lunar-station][4]

 [4]: https://github.com/LunarLogicPolska/lunar-station "Lunar Station setup script"

**Bitnami** provides an installer, a virtual machine and an image you can run in the cloud. Looks super simple and having images you can just turn on in the cloud might be fun:
[http://bitnami.org/stack/rubystack][5]

 [5]: http://bitnami.org/stack/rubystack "Bitnami Ruby stack"

If you are a fan of rbenv then **Cinderella** might help you get setup.
[http://www.atmos.org/cinderella/][6]

 [6]: http://www.atmos.org/cinderella/ "Cinderella setup script"

If you want to test different IE versions MS provides virtual machines. This script helps set it all up using Virtual box:
[https://github.com/xdissent/ievms][7]

 [7]: https://github.com/xdissent/ievms "IE testing script for the Mac"

I've not had a lot of time to dig into **babushka**, but it looks sweet and claims to be your test-driven sysadmin. I'm guessing there are scripts to setup everything you need for your development environment but I've not found them yet.
