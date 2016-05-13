---
layout: reveal
author: Justin Ball
title: "Using The AvantLink API To Streamline Your Affiliate Efforts"
date: 2014-07-28 16:42:49 -0600
tags:
  - Affiliate Marketing
  - API
---

<div class="slides">

  <section>
    <div class="left">
      <h2>Justin Ball</h2>
    </div>
    <div class="right">
      <ul>
        <li>CTO <a target="_blank" href="http://www.atomicjolt.com">AtomicJolt</a></li>
        <li>GearSnyper, SnapLinker, SnapSearcher</li>
        <li><a target="_blank" href="http://www.justinball.com">http://www.justinball.com</a></li>
      </ul>
    </div>
  </section>

  <section>
    <p><img class="scale-image" src="/images/posts/2014/AvantLink/Lamborghini.jpg" alt="Lamborghini" /></p>
  </section>

  <section>
    <h2>It Would Be Really Cool If...</h2>
  </section>

  <section>
    <h2>Open All The Things!</h2>
    <p><img class="scale-image" src="/images/posts/2014/AvantLink/OpenAllTheThings.jpg" alt="Open All The Things" /></p>
    <ul class="fragment">
      <li>Open Source</li>
      <li>APIs</li>
      <li>Open Content</li>
    </ul>
  </section>

  <section>
    <h2>Open Source</h2>
    <p><img class="small-image" src="/images/posts/2014/AvantLink/Canvas.png" alt="Canvas LTI screenshot" /></p>
    <ul>
      <li class="fragment roll-in">Moved from installs to services</li>
      <li class="fragment roll-in">Developers read the code. Create better integrations</li>
      <li class="fragment roll-in">Result is a healthy community of applications</li>
    </ul>
  </section>

  <section>
    <h2>Open Content</h2>
    <ul>
      <li>Kahn Academy</li>
      <li>MIT Open Courseware</li>
      <li>Creative Commons</li>
    </ul>
    <p class="fragment">Users win with cool remixes</p>
    <p class="fragment">Organizations (and professors) win with brand recognition</p>
  </section>

  <section>
    <h2>APIs</h2>
    <ul>
      <li><a href="https://console.developers.google.com" target="_blank">Google</a></li>
      <li><a href="https://developers.facebook.com/" target="_blank">Facebook</a></li>
      <li><a href="http://www.salesforce.com/us/developer/docs/api/" target="_blank">SalesForce</a></li>
      <li><a href="http://www.avantlink.com/api.php?help=1" target="_blank">AvantLink</a></li>
    </ul>
  </section>

  <section>
    <h2>Symbiotic Relationship</h2>
    <p class="fragment">Developers imagine new features for your platform.</p>
    <p class="fragment">Platform wins new functionality and profits.</p>
    <p class="fragment">Developer wins large audience and profits.</p>
  </section>

  <section>
    <h2>&lt;Begging&gt;</h2>
    <p class="fragment roll-in">Please implement OAuth</p>
    <p class="fragment roll-in"><a target="_blank" href="https://github.com/intridea/omniauth/wiki/List-of-Strategies">Everyone else is doing it</a></p>
    <p class="fragment roll-in">and standards make things easy</p>
    <h2 class="fragment roll-in">&lt;/Begging&gt;</h2>
  </section>

  <section>
    <h2>Cool Story Bro</h2>
  </section>

  <section>
    <section>
      <h3><a href="http://www.avantlink.com/api.php?help=1">The AvantLink API</a></h3>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/AvantLink_API.png" alt="AvantLink API documentation screenshot" /></p>
    </section>
    <section>
      <h3>Merchant API</h3>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/AvantLink_API_Merchant.png" alt="AvantLink API documentation merchant screenshot" /></p>
      <p class="fragment roll-in on-top">Ignore This</p>
    </section>
    <section>
      <h3>Affiliate API</h3>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/AvantLink_API_Affiliate.png" alt="AvantLink API documentation affiliate screenshot" /></p>
    </section>
    <section>
      <h3>Affiliate API</h3>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/AvantLink_API_Affliate_Large.png" alt="AvantLink API documentation affiliate screenshot" /></p>
    </section>
  </section>

  <section>
    <h2><a href="http://www.avantlink.com/api.php?help=1">The AvantLink API</a></h2>
    <ul class="roll-in">
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=CustomLink">Custom Links</a></li>
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=ProductSearch">Product Search</a></li>
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=DotdFeed">DOTD</a></li>
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=SubscriptionFeed">Data Feeds</a></li>
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=AffiliateReport">Reports</a></li>
      <li class="fragment roll-in"><a target="_blank" href="http://www.avantlink.com/affiliates/affiliate-tool-center/app-market/">App Market</a></li>
    </ul>
  </section>

  <section>
    <section>
      <h2>Getting Started</h2>
      <div class="fragment roll-in block">
        <p>Everything is a GET</p>
      </div>
      <div class="fragment roll-in block">
        <p>Just like your browser</p>
      </div>
      <div class="fragment roll-in block">
        <p>Looks like this:</p>
        <textarea rows="3">http://www.avantlink.com/api.php?affiliate_id=28861&module=CustomLink&output=csv&merchant_id=10060&website_id=37705&merchant_url=http%3A%2F%2Fwww.backcountry.com%2Fibis-ripley</textarea>
      </div>
      <div class="fragment roll-in block">
        <p><a href="https://www.avantlink.com/affiliate/api_request_builder.php" target="_blank">The Request Builder is very handy</a></p>
      </div>
    </section>
    <section>
      <h2>Base url</h2>
      <p>http://www.avantlink.com/api.php</p>
      <textarea rows="3">http://www.avantlink.com/api.php?affiliate_id=28861&module=CustomLink&output=csv&merchant_id=10060&website_id=37705&merchant_url=http%3A%2F%2Fwww.backcountry.com%2Fibis-ripley</textarea>
    </section>
    <section>
      <h2>Common Parameters</h2>
      <ul>
        <li><span class="highlight">affiliate_id</span>=28861</li>
        <li><span class="highlight">module</span>=CustomLink</li>
        <li><span class="highlight">output</span>=csv</li>
      </ul>
      <textarea rows="3">http://www.avantlink.com/api.php?affiliate_id=28861&module=CustomLink&output=csv&merchant_id=10060&website_id=37705&merchant_url=http%3A%2F%2Fwww.backcountry.com%2Fibis-ripley</textarea>
    </section>
  </section>

  <section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=CustomLink">Generate Custom Links</a></h2>
      <h4>Parameters:</h4>
      <ul>
        <li><span class="highlight">module</span>=CustomLink</li>
        <li><span class="highlight">output</span>=csv,tab,xml</li>
        <li><span class="highlight">merchant_id</span>=10060</li>
        <li><span class="highlight">website_id</span>=37705</li>
        <li><span class="highlight">merchant_url</span>=http://www.backcountry.com/ibis-ripley</li>
      </ul>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=CustomLink">Build a Custom Link</a></h2>
      <textarea rows="3" class="input">http://www.avantlink.com/api.php?affiliate_id=28861&module=CustomLink&output=csv&merchant_id=10060&website_id=37705&merchant_url=http%3A%2F%2Fwww.backcountry.com%2Fibis-ripley</textarea>
      <iframe class="output-frame" src=""></iframe>
      <p class="small"><a class="output-a" target="_blank" href=""></a></p>
    </section>
  </section>

  <section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=ProductSearch">Product Search</a></h2>
      <h4>Parameters:</h4>
      <ul>
        <li><span class="highlight">module</span>=ProductSearch</li>
        <li><span class="highlight">output</span>=csv,html,js,rss,tab,xml,json</li>
        <li><span class="highlight">website_id</span>=37705</li>
        <li><span class="highlight">search_term</span>=ibis</li>
      </ul>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=ProductSearch">Search</a></h2>
      <textarea rows="3" class="input">https://www.avantlink.com/api.php?module=ProductSearch&affiliate_id=28861&website_id=37705&search_term=ibis</textarea>
      <iframe class="output-frame" src=""></iframe>
      <p class="small"><a class="output-a" target="_blank" href=""></a></p>
    </section>
    <section>
      <h3><a target="_blank" href="http://www.snaplinker.com">SnapLinker</a></h3>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/SnapLinker_Search.png" alt="SnapLinker search interface" /></p>
    </section>
    <section>
      <h3><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=ProductSearch">Search Example</a></h3>
      <pre>
        <code class="changable-code" data-trim contenteditable>var query = 'ibis';
var page = 0;
var resultCount = 8;
var url = 'http://www.avantlink.com/api.php?affiliate_id=28861';
url += '&module=ProductSearch&output=json&website_id=37705';
url += '&search_results_count=' + resultCount;
url += '&search_term=' + encodeURIComponent(query);
url += '&search_results_base=' + (page * resultCount);

$('#searchExampleA').attr('href', url).text(url);

$.getJSON(url).done(function(data, textStatus, jqXHR){
  $('#searchExampleOutput').empty();
  $.each(data, function(idx, result){
    if(result){
      $('#searchExampleOutput').append(render(result));
    }
  });
});

function render(result){
  var url = 'http://www.avantlink.com/click.php?tt=app&ti=1021&pw=37705' +
    '&mi=' + result.lngMerchantId +
    '&df=' + result.lngDatafeedId +
    '&pri=' + result.lngProductId;
  var image = result.strThumbnailImage || result.strMediumImage;

  var html = '<' + 'div class="search-result">';
  html += '<' + 'a href="' + url + '" target="_blank">';
  html += '<' + 'img src="' + image + '" alt="' + result.strProductName + '" />';
  html += '<' + '/a>';
  html += '<' + 'p class="price small">$' + result.dblProductPrice + '<' + '/p>';
  html += '<' + '/div>';

  return html;
}

//url += '&search_on_sale_only=1';
//url += '&search_on_sale_level=10';
//url += '&search_price_maximum=1000';
//url += '&search_price_minimum=10';

// Boolean, enables the use of advanced search syntax, causing special treatment in the following circumstances:
// preceding a word with "+" will restrict the search to ONLY products that mention that word, preceding a
// word with "-" will restrict the search to exclude any products that mention that word, and the keyword "
// OR " can be used to perform multiple simultaneous searches (in place of OR you can use the pipe character "|"
// to separate multiple search terms).
//url += '&search_advanced_syntax=1';

//url += '&search_brand=ibis';           // A product brand to which search results should be restricted (strict filter only; does not allow wildcards).
//url += '&search_category=bikes';       // A product category to which search results should be restricted.
//url += '&search_department=clothing';  // A department to which search results should be restricted.
//url += '&merchant_ids=10060';
//url += '&search_results_sort_order=Sale+Price';

        </code>
      </pre>
      <div id="searchExampleOutput" style="margin:0 30px;"></div>
      <p class="small"><a id="searchExampleA" target="_blank" href=""></a>
    </section>
  </section>

  <section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=DotdFeed">Deal of the Day (DOTD)</a></h2>
      <h4>Parameters:</h4>
      <ul>
        <li><span class="highlight">module</span>=DotdFeed</li>
        <li><span class="highlight">output</span>=csv,html,js,rss,tab,xml,json</li>
        <li><span class="highlight">website_id</span>=37705</li>
        <li><span class="highlight">layout_id</span>=1</li>
      </ul>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=DotdFeed">DOTD</a></h2>
      <textarea rows="3" class="input">http://www.avantlink.com/api.php?affiliate_id=28861&module=DotdFeed&website_id=37705&output=html&layout_id=1</textarea>
      <iframe class="output-frame" src=""></iframe>
      <p class="small"><a class="output-a" target="_blank" href=""></a></p>
    </section>
  </section>

  <section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=SubscriptionFeed">Data Feeds</a></h2>
      <h4>Parameters:</h4>
      <ul>
        <li><span class="highlight">module</span>=SubscriptionFeed</li>
        <li><span class="highlight">output</span>=csv,tab,xml</li>
        <li><span class="highlight">auth_key</span>=908d7de89a595f9d1548s7d77d260e457</li>
        <li><span class="highlight">website_id</span>=43557</li>
      </ul>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=SubscriptionFeed">List Data Feeds</a></h2>
      <textarea rows="3" class="input">https://www.avantlink.com/api.php?affiliate_id=29689&auth_key=78163e89a595f9d154370967d260e457&module=SubscriptionFeed&output=xml&subscription_type=df&website_id=43557</textarea>
      <iframe class="output-frame" src=""></iframe>
      <p class="small"><a class="output-a" target="_blank" href=""></a></p>
    </section>
  </section>

  <section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=AffiliateReport">Using the API for reports</a></h2>
      <h4>Parameters:</h4>
      <ul>
        <li><span class="highlight">module</span>=AffiliateReport</li>
        <li><span class="highlight">output</span>=csv,html,tab,xml</li>
        <li><span class="highlight">auth_key</span>=908d7de89a595f9d1548s7d77d260e457</li>
        <li><span class="highlight">report_id</span>=1</li>
      </ul>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.avantlink.com/api.php?help=1&module=AffiliateReport">Reports</a></h2>
      <ul class="medium">
        <li>1 - Performance Summary</li>
        <li>2 - Ad Impressions (Summary)</li>
        <li>3 - Ad Impressions (Detail)</li>
        <li>5 - Click Throughs (Summary)</li>
        <li>6 - Click Throughs (Detail)</li>
        <li>8 - Sales/Commissions (Detail)</li>
        <li>9 - Performance Summary By Tool Type</li>
        <li>12 - Performance Summary By Day</li>
        <li>19 - Sale Hit Tracking Trails</li>
        <li>20 - Performance Summary By Affiliate Website</li>
        <li>22 - Performance Summary By Custom Tracking Code</li>
        <li>23 - Invalid Affiliate Links</li>
        <li>24 - Performance Summary By Ad Campaign</li>
        <li>29 - Performance Summary By Hour</li>
        <li>31 - Performance Summary By Product</li>
        <li>33 - Performance Summary By Merchant Grouping</li>
        <li>47 - Merchant Ranking By Earnings</li>
        <li>48 - Performance Summary By Month</li>
        <li>50 - Performance Summary By Week</li>
        <li>72 - Last Click Through to Sale Summary</li>
        <li>77 - Performance Summary By Paid Placement</li>
        <li>81 - Datafeeds: Merchant Datafeed Quality</li>
      </ul>
    </section>
    <section>
      <h2 id="report-title">Peformance Summary</h2>
      <textarea id="report-request" rows="3" class="input">https://www.avantlink.com/api.php?affiliate_id=29689&auth_key=78163e89a595f9d154370967d260e457&module=AffiliateReport&output=html&report_id=1</textarea>
      <iframe class="output-frame" src=""></iframe>
      <p class="small"><a class="output-a" target="_blank" href=""></a></p>
    </section>
  </section>

  <section>
    <section>
      <h2>App Market</h2>
      <p></p>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.snaplinker.com">SnapLinker</a></h2>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/SnapLinker.png" alt="SnapLinker interface" /></p>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.snapsearcher.com">SnapSearcher</a></h2>
      <p><img class="scale-image" src="/images/posts/2014/AvantLink/SnapSearcher.png" alt="SnapSearcher interface" /></p>
    </section>
    <section>
      <h2><a target="_blank" href="http://www.snapsearcher.com">SnapSearcher</a></h2>
      <p><a target="_blank" href="http://gearshop.me/">GearShop.me</a>
      <p><a target="_blank" href="https://github.com/blitzhaven/snapsearcher">SnapSearcher Source on Github</a></p>
      <iframe width="420" height="315" src="//www.youtube.com/embed/5wCaC_YYMdQ" frameborder="0" allowfullscreen></iframe>
    </section>
  </section>

  <section>
    <h2>Questions?
    <h4>Justin Ball</h4>
    <ul>
      <li>@jbasdf</li>
      <li>justinball@gmail.com</li>
      <li>http://www.justinball.com</li>
      <li>https://github.com/jbasdf</li>
    </ul>
  </section>

</div>

<script type="text/javascript">

$(function(){
  $('#report-request').on('keyup', function(){
    var id;
    $.each($(this).val().split('?')[1].split('&'), function(i, params){
      if(params.indexOf('report_id')==0){
        id = params.split('=')[1];
      }
    });
    switch(id){
      case "1":
        title = "Performance Summary";
        break;
      case "2":
        title = "Ad Impressions (Summary)";
        break;
      case "3":
        title = "Ad Impressions (Detail)";
        break;
      case "5":
        title = "Click Throughs (Summary)";
        break;
      case "6":
        title = "Click Throughs (Detail)";
        break;
      case "8":
        title = "Sales/Commissions (Detail)";
        break;
      case "9":
        title = "Performance Summary By Tool Type";
        break;
      case "12":
        title = "Performance Summary By Day";
        break;
      case "19":
        title = "Sale Hit Tracking Trails";
        break;
      case "20":
        title = "Performance Summary By Affiliate Website";
        break;
      case "22":
        title = "Performance Summary By Custom Tracking Code";
        break;
      case "23":
        title = "Invalid Affiliate Links";
        break;
      case "24":
        title = "Performance Summary By Ad Campaign";
        break;
      case "29":
        title = "Performance Summary By Hour";
        break;
      case "31":
        title = "Performance Summary By Product";
        break;
      case "33":
        title = "Performance Summary By Merchant Grouping";
        break;
      case "47":
        title = "Merchant Ranking By Earnings";
        break;
      case "48":
        title = "Performance Summary By Month";
        break;
      case "50":
        title = "Performance Summary By Week";
        break;
      case "72":
        title = "Last Click Through to Sale Summary";
        break;
      case "77":
        title = "Performance Summary By Paid Placement";
        break;
      case "81":
        title = "Datafeeds: Merchant Datafeed Quality";
        break;
      default:
        title = "Report";
      }
      $('#report-title').text(title);
  });
});

</script>

