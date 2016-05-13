---
title: Setting up new Macbook pro
author: Justin Ball
layout: post
permalink: /2006/07/28/setting-up-new-macbook-pro/
tags:
  - Computers
---

I am trying to set a new Macbook pro to boot Mac OSX and Windows with a third partition for data. It is a pain, but [here is a good resource to help you get started][1]. I managed to mess up the partitions. If you do that you will need to boot off the install disk then use gpt to delete any extra partitions that you have created. [The man page for gpt is here][2]. [I also found this post about setting up and deleting partitions helpful][3].

 [1]: http://wiki.onmac.net/index.php/Triple_Boot_via_BootCamp
 [2]: http://www.hmug.org/man/8/gpt.php
 [3]: http://www.friday.com/bbum/2006/05/04/

As far as steps to make it work. Follow the first link. If you mess up like I did you will need to use gpt to delete the volumes. The command looks like this:
sudo gpt remove -i 3

Then you will need to use gpt to recreate the volumes:
sudo gpt add
 (Look at the man page. The options will depend on how large you want the partition to be and at which sector you want the partition to start. It is a little low level but follow the instructions on the gpt man page and you will be just fine.)

Next you need to boot into OSX and format the partitions. Use diskutil eraseValue to do this. It is pretty fast.

OK get a tasty beverage.

Now boot using a boot cd that has an fdisk utility. I recommend using [Emergency Boot Disk][4]. It requires that you install it on a Windows box and then generate an iso. That mean you will need seperate Windows machine with a cd burner. Ask your friends for help you if you don't one. If you don't have friends then suck. Join My Space and get some.

 [4]: http://ebcd.pcministry.com/

Next step is a big one:
START OVER because you are screwed. Once the Master Boot Record is messed up you are out of luck. So now you have to copy off your osx install onto a firewire drive, reinstall and start over. Just FYI this sucks.

Best of luck.

UPDATE:
I got tired of having a screwed up Mac and I didn't want to wait until Trent (system admin) gets back from the Wind Rivers to help me so...

1.  I downloaded Carbon Copy Cloner
2.  Cloned my Mac to an external drive
3.  Booted off the external drive
4.  Now that you are booted using the external drive you can run diskutil and repartition the harddrive. Use this to setup your Windows partitions
5.  Use Carbon Copy Cloner to copy your OS back onto your harddrive. (You did make a Mac partition right?
6.  Now proceed with your windows setup. Be sure to use an fdisk util to set the last partition on the drive active so Windows installs there.