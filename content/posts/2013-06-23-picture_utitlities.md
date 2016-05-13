---
title: Picture Utilities
author: Justin Ball
layout: post
tags:
  - Pictures
---

<p>We have a library of almost 100,000 photos. I'm guessing the number is higher if you count the total number that we have backed up for family members. Managing that many photos can be a challenge and
<a href="http://www.justinball.com/2007/09/24/how-to-manage-60000-digital-photos/">I've blooged about the topic before. </a> We like to keep our photos in specific directories with names perfectly constructed
using the date information from the exif data. It seems like an obvious scheme which makes me wonder why all the photo management software has to choose such a crappy nameing convention. You might think
that it's a not a big deal since you never look at the files names anyway. However, you're wrong. Just let iPhoto import your pictures and then let Picasa auto scan your hard drive to find folders. You will end up with a
million random names inside of Picasa at which point you'll give up digital photography all together and go back to film. We further complicate the issue by putting photos into folders based on the family member who took the photo.
This comes in really handy when their hard drive crashes (it's happened twice) and they call you begging for the backups. I have two 4 Terrabyte drives plus a RAID system so in our family I am "the cloud". There's nothing worse than losing
several years of your life to a technical glitch. Spend the money and back up your pictures.</p>
<p>We import all our new photos to a specific directory - NewPhotosFromCamera - and then I have written scripts that handle the rename. Right now I'm focused on making my wife's life even easier and so I've been tweaking the
  script so that it knows exactly where to put the photo after the rename based on the camera model. (Unfortunately, the exif data doesn't contain the names of family members so around here people get to be known by their camera.) At any rate
  I needed a way to find all those camera names. With Ruby and the exif gem it's easy. Here's the code in case you ever want to do the same. It will also count the number of photos per camera. Also, unless your username happens to be 'jbasdf'
  remember to change the directory to your user's directory.</p>
<script src="https://gist.github.com/jbasdf/5846991.js"></script>