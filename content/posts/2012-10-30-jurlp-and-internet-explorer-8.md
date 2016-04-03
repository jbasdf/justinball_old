---
title: jurlp and Internet Explorer 8
author: Justin Ball
layout: post
permalink: /2012/10/30/jurlp-and-internet-explorer-8/
categories:
  - Javascript
  - jQuery
  - jurlp
---
For those who don't write code the choice to use Internet Explorer probably hasn't been influenced by much more than the fact that it's sitting on the desktop ready to use. For those of us who do write code we hate you.

We use [jurlp][1] in quite a bit of our code because it's a great way to break apart and modify urls client side. Today, while testing in IE 8 we started seeing 'Invalid Argument'. I think that's the error of choice for most of Windows and as it turns out it's a pretty worthless/meaningless error.

 [1]: https://github.com/tombonner/jurlp

We traced down into the code and found that jurlp has code that looks like this:

    return $.extend ( urlToObject ( url ), { toString : uri.toString.http } );


That is an elegant line of code and shows how things should be done. However, Internet Explorer doesn't like it when you override toString that way. Both [jQuery][2] and [Underscore.js][3] have outstanding bugs detailing the problem.

 [2]: http://bugs.jquery.com/ticket/7467
 [3]: https://github.com/documentcloud/underscore/issues/60

[We created a fork of jurlp that you can find here that uglies up the code but fixes the IE problems..][4] The changes were simple and look like this:

 [4]: https://github.com/tatemae/jurlp

    var o = urlToObject ( url );
    o.toString = uri.toString.http;
    return o;


If anyone has a better idea. We're listening.