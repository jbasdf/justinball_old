---
title: 'Using Amazon&#8217;s Web Services from Ruby &#8211; Jonathan Younger'
author: Justin Ball
layout: post
permalink: /2008/03/28/using-amazons-web-services-from-ruby-jonathan-younger/
tags:
  - mtnwestrubyconf
  - Ruby On Rails
  - amazon
  - ec2
  - mountainwestrubyconf
  - ruby
  - Ruby On Rails
  - s3
  - webservices
---

Right Scale has a great gem:
gem install right_aws
RightScale RightAws::Sqs
RightScale RightAws::Ec2

They will automatically retry errors for you.

gem install kato
Kato - EC2 Pool Manager

<pre><code class="ruby">
require 'rubygems'
requrie 'right_aws'
RightAws::RightAWSParser.xml_lib = 'libxml'

SQS = RightAws::Sqs.new(access_id, access_key) #get an SQS object
queue = SQS.queue("name_of_queue") #create a or get a reference to an existing queue
queue.psuh "put message in the queue" #8k max
queue.size # get an approximate number of message in the queue
message = queue.receive #
message.delete # if you don't delete your messages they will show up again
</pre></code>

<pre><code class="ruby">
require 'rubygems'
requrie 'right_aws'
RightAws::RightAWSParser.xml_lib = 'libxml'
EC2 = RightAsw::Ec2.new(access_id, access_key)
EC2.describe_instances # get a hash of running instances
EC2.run_instances("name_of_ami", minium_instances_to, max) # start up instances
EC2.terminate_instances(["id1", "id2"]) # turn them off
</pre></code>

<pre><code class="ruby">
require 'kato'
# Let Kato manage your instances
pool = Kato::PoolSupervisor.new(config)
pool.run
</pre></code>

Kato can manage multiple pools.  You can give it a min and max number of instances and give it an uptime interval.  Amazon charges by the hour for the machine so you if you start it up you may as well leave it on for the full hour.



