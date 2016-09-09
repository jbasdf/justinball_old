---
layout: post
author: Justin Ball
title: "Docker for Mac debugging"
date: 2016-00-09 10:21:00 -0700
tags:
  - Docker
  - Programming
---


<h3>The Problem:</h3>
While trying to setup <a href="https://docs.docker.com/docker-for-mac/">Docker for Mac</a> I kept getting the following error anytime I tried to spin up a Docker image:

<blockquote>
  Couldn't connect to Docker daemon. You might need to start Docker for Mac.
</blockquote>

<h3>All the fixes said do this:</h3>

<blockquote>
  eval "docker-machine env default"
</blockquote>

I tried but kept getting

<blockquote>
  Host does not exist: "default"
</blockquote>

<h3>The fix for me</h3>

I had to run this:

<blockquote>
  docker-machine create --driver virtualbox default
</blockquote>

and then this:

<blockquote>
  eval "docker-machine env default"
</blockquote>

Also, anytime you open a new terminal you'll have to run

<blockquote>
  eval "docker-machine env default"
</blockquote>
