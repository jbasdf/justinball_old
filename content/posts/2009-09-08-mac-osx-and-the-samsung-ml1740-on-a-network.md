---
title: Mac OSX and the Samsung ML1740 on a network
author: Justin Ball
layout: post
permalink: /2009/09/08/mac-osx-and-the-samsung-ml1740-on-a-network/
tags:
  - Computers
  - mac
  - osx
  - samsung ml1740
---
I'm mostly posting this so I don't forget since it seems like I have to reinstall my printer driver often enough to be annoying but not
often enough to remember. I run my Samsung 1740 on my wife's computer and share it to the other computers on my network.
The driver isn't built in so you have to go hunt it down on the net.


UPDATE: The old driver is no longer available but Splix is working fine.
Download and install Splix: <a href="http://guigo.us/mac/splix/">http://guigo.us/mac/splix/</a>.

I have my Samsung plugged into my Airport so the computer finds it just fine but couldn't find drivers. After install Splix on Mavericks
all I had to do was add a printer and tell it to use the 'Generic drivers' and everything worked.


You'll only need the following if you have the printer connected to a Windows machine and are sharing that printer:
UPDATE:
In order to add the printer you will need to do the following:
1. Access the 'Advanced' dialog. On Snow Leopard do this by right clicking on the title bar and select 'Customize Toolbar'.
2. Drag the 'Advanced' icon to the toolbar.
3. Once the computer has finished searching you can add any printer value.
Type: 'Windows'
Device: 'Another Device'
URL: smb://fire/Samsung ML-1740 Series
(fire is the name of the computer I am printing to. Note that I have it setup in /etc/hosts like this:
192.168.100.109 fire)
Give the printer a name 'Samsung ML-1740 on Fire'
4. Click done and it should work.