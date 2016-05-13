---
title: A Gazillion House Plans on ThePlanCollection.com
author: Justin Ball
layout: post
permalink: /2008/01/23/a-late-night-updating-house-plans-on-theplancollectioncom/
tags:
  - The Plan Collection
  - ASP.Net
  - house plans
  - image processing
  - Programming
  - The Plan Collection
---

I updated [ThePlanCollection.com][1] last night. I must admit that updating when you are tired is not always the best idea, but I figure everyone else is probably asleep so there isn't really a better time. We don't really have a gazillion house plans, but sometime it feels like it and being able to manage all the house plans and the related images is not a trivial task.

 [1]: http://www.theplancollection.com/

Last night I updated the main styles pages so they are looking a bit better in my humble opinion. Granted, I am not a designer so I'll let you be the judge. I updated our [Country House Plans][2], [Arts and Crafts House Plans][3], [Victorian House Plans][4] and [Luxury House Plans][5] pages. Take a look and let me know what you think.

 [2]: http://www.theplancollection.com/country-house-plans "View Country House Plans"
 [3]: http://www.theplancollection.com/arts-and-crafts-house-plans "View Arts and Crafts House Plans"
 [4]: http://www.theplancollection.com/victorian-house-plans "view Victorian House Plans"
 [5]: http://www.theplancollection.com/luxury-house-plans "View Luxury House Plans"

One of the most interesting parts of building out these new part of the system is the updates I have made to the image processing code. All the images are generated on the fly from a set of core images. There are a couple of things that I find amazing and very convenient about this. The amazing part is that the image processing is very fast. After the first image generation the file is cached so that helps and if I need to regenerate all the images on the site I only need to delete the image cache folder. The convenient part is that we are able to generate images of all sizes, and quality and we can vary background colors if we are doing an image fit. That way if we don't like what the images look like I can tweak a few settings and the change is reflected across all the images which number somewhere in the 500,000 range.

Pretty cool.