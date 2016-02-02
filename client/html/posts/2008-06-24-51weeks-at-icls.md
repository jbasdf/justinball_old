---
title: 51Weeks at ICLS
author: Justin Ball
layout: post
permalink: /2008/06/24/51weeks-at-icls/
categories:
  - Programming
  - Ruby On Rails
tags:
  - 51weeks
  - icls2008
  - Ruby On Rails
---

Last year for [our open ed conference here at Utah State][1] I built an application called [51weeks][2] to help preserve the presentations and to help people interact. Tomorrow it will be used at ICLS in the Netherlands. The hardest part about these kinds of applications is life cycle management. I am frequently asked to build a 'quick and dirty' application. Years of experience has taught me that there is no such thing. Anytime you are asked to build an application you are being asked to commit to keep it alive. What inevitably happens is that someone sees it and assumes that it only needs a few tweaks to adapt it to a new use. If your code is to dirty then forget it. Adaptation almost always runs you into new errors that you have to deal with in new ways.

 [1]: http://cosl.usu.edu/events/opened2008
 [2]: http://www.51weeks.com

Whenever creating an application it is always worth the time to get tests in place. It is always worth the time to think about the architecture - not the architecture for the entire system - but rather the big picture. How will the application be deployed? What services will it depend on? What happens when the code becomes obsolete and needs to updated? This is a very real issue with Rails. Methods are deprecated or changed and plugins stop working. I know that most people like to believe that once an application is done it is done. This is a terrible fallacy. Every application requires attention to manage bugs, growth, obsolescence.

Every time I am asked to bring up an old application I am reminded of these issues. Best of luck and enjoy the application to all 51weeks users at ICLS.