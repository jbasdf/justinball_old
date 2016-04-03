---
title: How to manage 60,000 digital photos
author: Justin Ball
layout: post
permalink: /2007/09/24/how-to-manage-60000-digital-photos/
categories:
  - Computers
  - Projects
tags:
  - backups
  - digital-photography
  - manage
  - photos
  - storage
---


QUICK UPDATE: [If you want reliable backups for you photos check out my post on using S3][1].

 [1]: /2008/09/30/amazon-s3-jungle-disk-and-the-new-way-to-backup/

A friend of mine was surprised that I don't have a Flickr account. I am try to keep up with the cool kids and keep accounts on many of the so called web 2.0 services. So why don't I have a Flickr account?

We use Picasa. How very uncool of us. The reason why however has to do with how we manage our photos - all 60,000 at last count and growing. For years we tried to manage our collection using Adobe Photoshop Elements. However, the application strained under the weight of so many pictures and soon became completely unusable. Before Photoshop Elements there wasn't really a mainstream application and I considered writing my own, but I already have enough code to write and so I gave that up. There were many applications from small independent developers and many were even recommended by users on various forums. However, none was simple enough for my wife to use.

Then Google bought Picasa and started giving it away for free. We found it to be very fast even when given large numbers of photos to index. The search functionality has been great and my wife even likes to use it. It also integrates with various services that let you buy photos online. You might not think this is a big deal, but I buy my wife a credit to Snapfish for 1000 photos each year and she uses it and then some. Who wants to wait around for some crappy upload manager to crash? We tried Sam's Club for a long time, but their upload process sucks so they are out. Snapfish integrates with Picasa and they will print your photos the right size. In case you are wondering some digital photos aren't a perfect 4x6 instead they are more like 4x5.3. Snapfish doesn't crop your photo instead they print it the right size. I am sure there is some way to figure out the exact details and your photos to come out just right, but I have 60k photos to manage so I don't have time and why should I have to figure that out.

We don't exclusively use Picasa. Managing our photos takes a bit of work, but here are the secrets on how we do it.

First I don't let Picasa import my pictures. I use the default Windows wizard. I work on a Mac and spend plenty of time in the open source world so spare me the Windows sucks crap. The wizard copies my pictures puts then into the same directory every time and then deletes them from my camera. That is exactly what I want.

All the photos are dropped into a folder called "NewPicturesFromCamera". That folder in turn resides on a 250 gig hard drive that is dedicated to pictures. If you are going to blow thousands on several digital cameras and lenses a hundred bucks on the hard drive won't kill you. It blows me away that people will fuss over which cleaning kit to use or choose to spend a grand on a lens only to get cheap when it comes time to spend a couple hundred on computer equipment. Spend a hundred bucks and get a hard drive to dedicate to your pictures.

Now that all my new pictures are in the NewPicturesFromCamera folder I walk away - usually. I can queue up pictures in that folder for a few weeks or so. Then when I have a spare minute I run a little batch file that I wrote that renames all the picture in the folder according to the data and time the picture was taken. That bit of magic is made possible by [ExifUtils][2]. The app costs 29 bucks and is worth every penny. It also runs on pretty much every OS you might use.

 [2]: http://www.hugsan.com/EXIFutils/

My batch file looks like this:

exiffile /n/r "[date-taken].jpg" NewPicturesFromCamera

That's all you have to do to change the file names to match the exif data in the picture. Sweet.

Next I copy the files into folders that match the year and name. My drive has a pictures folder. Under that I have a folder for each year 2006, 2007 etc. Under each year of months - 01\_january, 02\_feburary, etc. Picasa watches this folder for me and automatically adds them as new pictures come in. It then generates thumbnails which makes it very fast to view the large collection. Selecting a photo or group of photos in Picasa and then pressing ctrl k will let you add keywords or tags to the photos. You can then search the photos based on those keywords. No need to have a million folders called "family trip 07" or halloween etc.

You might think you are done at this point but you aren't. Here's a dirty little secret: your harddrive WILL die. It is mechanical and mechanical things wear out. Do you think your car will last forever? No. The spinning parts will wear out. A hard drive has spinning parts. In fact it spins at 7200rpm. IT WILL DIE EVENTUALLY.

SO... Don't be a cheap skate. Unless you really want to loose all your pictures back them up. There are a number of ways to do this. I back mine up to a server that I have in my house that uses RAID 5. You don't need to do that. Instead spend another hundred bucks and buy an external hard drive. They are cheap, buy two. I know you think that is frivolous. Why spend another $300-400 bucks on more computer crap. Your perspective is wrong. Think of this. That little disk spinning at 7200 rpm holds years of memories. If it dies they are gone. I mean really gone. OK, not gone. You can spend $12,000 and have a forensic lab recover bits and pieces of your pictures. At that point I will call you a moron. So get a backup drive or two. In addition to my server I also copy all of our pictures to a backup drive that I send with my parents. If the house burns down we still have pictures.

Consider the advantage of this system compared to film. Think of how hard it would be to make 3 copies of every physical photo you ever took and then take 1 of each of those copies and have mom and dad store it. They would kill you. 60,000 photos takes up a lot of space.

On to the last thing I use to manage my collection - [Microsoft's sync tool][3]. I don't like backup software for the most part. It tries to out think you and assume you want all the crap on your computer backed up. The problem is that most programs want to save stuff like the junk photos in the "My pictures" folder. I don't care. I know what I want backed up and I don't want to mess with the other junk. Ever try to find exactly what you want in a proprietary backup file? Ever hear the line from a sys admin, "well, if the backups worked we might be able to get your files back." WTF? Backups tend to be a black box. Put random crap in and get random crap back out. The sync tool lets me specify which files/folders I want to copy and how I want to copy them. They files are not compressed and thrown into some giant file. Instead, I end up with an exact copy of my desktop machine on my server and on my backup drive. I can then use those folders on other computers however I want and the sync tool will pick up on any changes and make it right in all the locations. This process takes more thought on the part of the user but for me it works great.

 [3]: http://www.microsoft.com/downloads/details.aspx?FamilyId=E0FC1154-C975-4814-9649-CCE41AF06EB7&displaylang=en

So there you have it. My total software cost is $29 to manage my photos. My hardware cost these days is around $400 bucks for the various drives I need to run my backup scheme. $429 is half what you will pay for a decent DSLR these days. Think it over and then listen to me because when your damn hard drive crashes and you lose all your picture I WILL NOT FIX IT!

Have a great day.