---
title: SQL2005 or higher is required for sp_expressmaint
author: Justin Ball
layout: post
permalink: /2010/11/22/sql2005-or-higher-is-required-for-sp_expressmaint/
tags:
  - sql server
  - sql server 2008 express
---

I don't have to work a lot with SQL Server these days, but this evening I noticed that the maintenance tasks on one of my servers was not running. I went to the command line to run the task and got 'SQL2005 or higher is required for sp\_expressmaint'. Turns out there is a bug in the sp\_expressmaint stored procedure that ships with SQL Server 2008 Express Edition. [The first result on Google provided the solution][1]. Luckily it's really easy to fix. Just open up the stored procedures on your master database (they're under 'programability'). Then find this line:

 [1]: http://developers.de/blogs/senad_hajric/archive/2009/05/25/bug-sql-2008-express-edition-stored-procedure-sp-dbmaintenance.aspx

    IF (select SUBSTRING(@@version,(CHARINDEX('-',@@version) 2),1))