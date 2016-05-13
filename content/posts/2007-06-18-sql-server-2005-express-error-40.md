---
title: 'SQL Server 2005 Express error: 40'
author: Justin Ball
layout: post
permalink: /2007/06/18/sql-server-2005-express-error-40/
tags:
  - Programming
  - database
  - error
  - SQL Server 2005 Express
---

I ran into this error while trying to run some scripts on my SQL Server 2005 Express Database:

An error has occurred while establishing a connection to the server. When connecting to SQL Server 2005, this failure may be caused by the fact that under the default settings SQL Server does not allow remote connections. (provider: Named Pipes Provider, error: 40 - Could not open a connection to SQL Server)

Had to bang my head a bit on this one, but I finally figured out that all the scripts I was running referred to 'localhost'. By default Sql Server 2005 Express installs a named instance. I was too stupid/lazy to figure out how to rename it to default so I did a quick reinstall, chose the advanced setup options and set the database as default. Works great. Now if I could just get my stupid Dell 2850 server to stop locking up. In the future I will be buying Sun Servers.