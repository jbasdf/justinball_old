---
layout: post
author: Justin Ball
title: "OER in the LMS via LTI"
date: 2016-00-09 10:21:00 -0700
tags:
  - OER
  - LMS
  - LTI
---

<h3>Resources from my presentation at Open Ed 2016:</h3>
<ul>
  <li>LTI Lambda function: <a href="https://github.com/atomicjolt/lti-lambda">https://github.com/atomicjolt/lti-lambda</a></li>
  <li>LTI Starter App: <a href="https://github.com/atomicjolt/lti_starter_app">https://github.com/atomicjolt/lti_starter_app</a></li>
  <li>Open Assessments: <a href="https://github.com/atomicjolt/OpenAssessments">https://github.com/atomicjolt/OpenAssessments</a></li>
  <li>Open Assessments Client: <a href="https://github.com/atomicjolt/OpenAssessmentsClient">https://github.com/atomicjolt/OpenAssessmentsClient</a></li>
  <li>React Client Starter App: <a href="https://github.com/atomicjolt/react_client_starter_app">https://github.com/atomicjolt/react_client_starter_app</a></li>
  <li>Wordpress as an LTI consumer <a href="https://github.com/Saltbox/wordpress-lti-consumer">https://github.com/Saltbox/wordpress-lti-consumer</a></li>
  <li>Wordpress as an LTI provider <a href="https://github.com/lumenlearning/lti">https://github.com/lumenlearning/lti</a></li>
</ul>

<h3>Example LTI configuration</h3>

```
  <?xml version="1.0" encoding="UTF-8"?>
    <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0" xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0" xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0" xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
      <blti:title>LTI Lambda</blti:title>
      <blti:description>LTI Lambda example</blti:description>
      <blti:launch_url>https://7z1do2p8ra.execute-api.us-east-1.amazonaws.com/dev/lti</blti:launch_url>
      <blti:icon>https://7z1do2p8ra.execute-api.us-east-1.amazonaws.com/dev/images/oauth_icon.png</blti:icon>
      <blti:extensions platform="canvas.instructure.com">
        <lticm:options name="course_navigation">
          <lticm:property name="default">enabled</lticm:property>
          <lticm:property name="enabled">true</lticm:property>
          <lticm:property name="text">LTI Lambda</lticm:property>
          <lticm:property name="url">https://7z1do2p8ra.execute-api.us-east-1.amazonaws.com/dev/lti</lticm:property>
          <lticm:property name="visibility">public</lticm:property>
        </lticm:options>
        <lticm:property name="domain">https://7z1do2p8ra.execute-api.us-east-1.amazonaws.com</lticm:property>
        <lticm:property name="privacy_level">public</lticm:property>
      </blti:extensions>
    </cartridge_basiclti_link>
  ```