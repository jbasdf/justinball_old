---
layout: post
author: Justin Ball
title: "Omniauth, Devise and Facebook Client Login Don't Play Nice"
date: 2014-02-27 15:43:41 -0700
categories:
  - javascript
  - facebook
  - omniauth
  - ruby
---

I've had to use Facebook login inside an iframe twice now. Combine <a href="https://github.com/plataformatec/devise"Devise</a>
with <a href="https://github.com/intridea/omniauth">omniauth</a> and <a href="https://github.com/mkdynamic/omniauth-facebook">omniauth-facebook</a> and you have a
pretty great user authentication system. Now try to login via Facebook inside an iframe and nothing will happen. If you check your Javascript console you'll see a error
that looks something like this:

<blockquote>
  Refused to display 'https://www.facebook.com/login.php?skip_api_login=1&api_key=asdfasdf%23_%3D_&display=page' in a frame because it set 'X-Frame-Options' to 'DENY'.
</blockquote>

Facebook won't render their UI inside of an iframe. A lot of sites do that these days. However, you can use the Facebook Javascript client and everything will
just work - sort of. Omniauth-facebook documents a <a href="https://github.com/mkdynamic/omniauth-facebook#client-side-flow">Client side flow</a> which looks like the
perfect solution to our problem but as I've learned it's not rainbows and unicorns.

If you do follow the advice provided by the documentation you'll spend hours saying things to your computer that you will regret. You'll feel depressed because you
followed the documentation and yet request.env["omniauth.auth"] will be nil no mater what you do.

There are two github threads related to this problem: <a href="https://github.com/mkdynamic/omniauth-facebook/issues/73">https://github.com/mkdynamic/omniauth-facebook/issues/73</a>
and <a href="https://github.com/intridea/omniauth-oauth2/issues/31">https://github.com/intridea/omniauth-oauth2/issues/31</a> and a number of Stack Overflow questions
<a href="http://stackoverflow.com/questions/10320320/facebook-javascript-sdk-and-omniauth/22082218#22082218">including this one that I tried to answer</a> since way
more people will find it on Stack Overflow than here.

<h3>Some Tips Before We Step In the Deep Stuff</h3>

If you're debugging through this problem the first thing you might try is using a domain like lvh.me to access your local machine (it resolves to 127.0.0.1). Chrome
has issues writing to localhost and it's possible that the Facebook cookie you need is not being properly written.

Right now would be a good time to check to make sure you don't accidently do the Oauth dance twice. This bit me. We have a link on the page with the id 'facebook_connect'.
It just so happens that the href of that link is '/users/auth/facebook' which means it will initiate the Oauth dance using Omniauth. We only want to talk to Facebook once
so be sure to call e.preventDefault() or else you will keep wondering why you get two server calls:

{% highlight javascript %}
$('#facebook_connect').on('click', function(e){
  e.preventDefault(); // Stop the request right here.
  Facebook.login();
});
{% endhighlight %}

The next thing you'll want to verify is that you are telling Facebook to write a cookie.

{% highlight javascript %}
FB.init({
  appId      : GLOBAL_SETTINGS.FBappId,
  status     : false, // don't check login status
  cookie     : true, // enable cookies to allow the server to access the session
  xfbml      : true  // parse XFBML
});
{% endhighlight %}


<h3>Before We Start</h3>
If you just want to see how to do the Facebook OAuth dance client side below is the code I use to handle Facebook logins:
<script src="https://gist.github.com/jbasdf/9262863.js"></script>

<h3>The Problem</h3>
I'm guessing you're still running into problems. The source of the issue is the callback_phase method inside the omniauth-oauth2 gem:

{% highlight ruby %}
if !options.provider_ignores_state && (request.params['state'].to_s.empty? || request.params['state'] != session.delete('omniauth.state'))
   raise CallbackError.new(nil, :csrf_detected)
end
{% endhighlight %}

request.params['state'] and session['omniauth.state'] are both nil so the condition fails and a CallbackError exception is raised. This is due
to the fact that we initiated the Facebook OAuth dance via FB.Login rather than using Omniauth to initiate the dance. Omniauth sets a state variable in the session
and then passes that as a state variable to Facebook like this:

{% highlight ruby %}
session['omniauth.state'] = SecureRandom.hex(24)
{% endhighlight %}

You can see above that the omniauth-oauth2 gem checks to make sure the state passed back from Facebook matches the one it saved into the session before
the dance started.

Sucks for the client side process.

<h3>Solution 1 - Cheap and Easy but Not So Secure</h3>
One solution is to set provider_ignores_state to true which circumvents the condition:

{% highlight ruby %}
config.omniauth :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_APP_SECRET'], {
  strategy_class: OmniAuth::Strategies::Facebook,
  provider_ignores_state: true,
}
{% endhighlight %}

That solution isn't especially secure since it can leave you open to csrf attacks.


<h3>Solution 2 - More Code Solves Everything</h3>
More code isn't usually a great way to solve your problems, but you can always create your own handler and parse the Facebook cookies yourself like this:

{% highlight ruby %}
def handle_facebook_connect
    @provider = 'facebook'
    @oauth = Koala::Facebook::OAuth.new(ENV["FACEBOOK_ID"], ENV["FACEBOOK_SECRET"])
    auth = @oauth.get_user_info_from_cookies(cookies)

    # Get an extended access token
    new_auth = @oauth.exchange_access_token_info(auth['access_token'])
    auth['access_token'] = new_auth["access_token"]

    # Use the auth object to setup or recover your user. The following is
    # and example of how you might handle the response but your needs and application structure will vary.
    if authentication = Authentication.where(:uid => auth['user_id'], :provider => @provider).first
      user = authentication.user
      sign_in(user, :event => :authentication)
    end

    # Redirect or respond with json
    respond_to do |format|
      format.html { redirect_to user }
      format.json { render json: user }
    end
end
{% endhighlight %}

Then you'll need to redirect to the 'handle_facebook_connect' method when you receive a connected response:

{% highlight javascript %}
FB.Event.subscribe('auth.authResponseChange', function(response) {
  if(response.status === 'connected'){
    if(response.authResponse){

      // Redirect to our new handler
      window.location = '/handle_facebook_connect';

    }
  } else if (response.status === 'not_authorized'){
    Facebook.message(Facebook.authorize_message);
  } else {
    FB.login();
  }
 });

{% endhighlight %}


<h3>Solution 3 - Fake It</h3>
If nothing so far brings joy to your heart then we can also simulate what omniauth does with the state variable.

I create a helper method that can be called where ever we need to use the client side Facebook login. We also have a global settings object
that can be accessed by our Javascript on the client. Calling 'add_state' generates a secure value and passes it to the client.

{% highlight ruby %}
def global_settings
    settings = {
      FBappId: ENV["FACEBOOK_ID"],
      application_name: ENV["APPLICATION_NAME"]
    }
    settings[:state] = session['omniauth.state'] = @add_state if @add_state
    settings
  end

  def add_state
    @add_state ||= SecureRandom.hex(24)
  end
{% endhighlight %}

Then have a look at the finish function in the javascript. Here we pass the state from GLOBAL_SETTINGS when we call '/users/auth/facebook/callback':

{% highlight javascript %}
finish: function(response){
    window.location.href = '/users/auth/facebook/callback?state='+ GLOBAL_SETTINGS.state;
}
{% endhighlight %}

Ideally, I would pass the state value when I call FB.Login but as far as I can tell from the Facebook documentation they don't provide
a mechanism for passing parameters. It is possible to manually create the FB login popup in which case it would be possible to pass the state, but
this solution was sufficient for our needs.
