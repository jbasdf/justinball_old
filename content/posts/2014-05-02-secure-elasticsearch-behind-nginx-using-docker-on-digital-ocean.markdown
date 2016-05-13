---
layout: post
author: Justin Ball
title: "Secure ElasticSearch behind Nginx using Docker on Digital Ocean"
date: 2014-05-02 14:34:24 -0600
tags:
  - Programming
  - ElasticSearch
  - Docker
  - Digital Ocean
---
I've been a big fan of <a href="http://www.elasticsearch.org/">Elastic Search</a> for a very long time. It's a great piece of software that can be used as an object database as well as a search index. I realize
that's not the intention of the software but it works so I'm happy. Elastic Search doesn't have security built in so if you want to lock down your index (which is a good idea) then you'll need to run it
behind a proxy. I briefly considered writing something in Go. There's a <a href="https://github.com/lukas-vlcek/node.es">node.js proxy for Elastic Search</a> but it hasn't been maintained in quite some time.

I want fewer moving pieces. Nginx provides basic authentication. I'm happy with that.

<a href="https://www.digitalocean.com/?refcode=735771c93fa7">Digital Ocean</a> is a new(ish) hosting company. They run on SSDs. They are pretty cheap and you can have a server running <a href="https://www.docker.io/">Docker</a> in 55 seconds.
I'm happy with that.

Mix all the above and you get a nice bit of software that you can be happy with after you figure out the mixing part. It goes something like this:

###Start
Setup an account on <a href="https://www.digitalocean.com/?refcode=735771c93fa7">Digital Ocean</a> and <a href="https://www.digitalocean.com/community/articles/how-to-use-the-digitalocean-docker-application">launch an instance running Docker</a>.


### Update Your Server

```
  apt-get update
```


### Use iptables to lock down the server

#### Add iptables-persistent

```
  sudo apt-get install iptables-persistent
```

#### Copy iptables.rules file into /etc/iptables/rules.v4 (file contents below)

```
  *filter
  :INPUT ACCEPT [0:0]
  :FORWARD ACCEPT [0:0]
  :OUTPUT ACCEPT [0:0]
  [0:0] -A INPUT -i lo -j ACCEPT
  [0:0] -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
  [0:0] -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
  [0:0] -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
  [0:0] -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
  [0:0] -A INPUT -j DROP
  COMMIT
```

#### Update iptables rules

```
  iptables-restore -c < /etc/iptables/rules.v4
```

### Setup Authentication for nginx

#### Install tools for setting up users

```
  sudo apt-get install -y apache2-utils
```

#### Setup directory

```
  sudo mkdir -p /var/www/es
  sudo mkdir -p /var/www/es_public
```

#### Add a user. You'll be prompted for a password that you shouldn't forget.

Setup a public user that can read data from Elastic Search

```
  sudo htpasswd -c /var/www/es/.htpasswd public_username_goes_here
```

Setup an admin user that can write data to Elastic Search

```
  sudo htpasswd -c /var/www/es/.htpasswd admin_username_goes_here
```

### Docker

#### Setup directories

```
  sudo mkdir /data
  sudo mkdir /var/log/nginx
```

#### Install Elastic Search

```
  docker pull dockerfile/elasticsearch
```

#### Run and name Elastic Search
The name will allow us to get information about the container from within our Nginx container that we'll fire up next.

```
  docker run -d --name elasticsearch -v /data:/data dockerfile/elasticsearch
```

#### Build nginx container - <a href="https://github.com/jbasdf/nginx_es">source for the docker image here in case you want to know what's going on.</a>

```
  docker build -t="jbasdf/nginx_es" github.com/jbasdf/nginx_es
```

#### Run Nginx container

```
  docker run -d -p 80:80 --link elasticsearch:elasticsearch -v /var/log/nginx:/var/log/nginx -v /var/www/es:/var/www/es jbasdf/nginx_es
```

You should now now be up and running. Test it using curl and make sure you get a response from Elastic Search:

```
  curl -XGET --user public_username_goes_here:password_goes_here 'http://www.yourdomain.com'
```
