---
title: Shoulda used RSpec
author: Justin Ball
layout: post
permalink: /2010/09/18/shoulda-used-rspec/
categories:
  - Ruby On Rails
  - cucumber
  - rails
  - rspec
  - shoulda
---

I've been updating the <a href="http://github.com/tatemae">muck gems</a> to work with Rails 3. The change is significant and painful but in a good way. For the most part the change consists of deleting all the code you used to hack into the Rails framework and adding subclass of '::Rails::Engine'. I'll try to put together a detailed post explaining Rails 3 engines later.

The nice thing about having a test suite in place is that you can rely on those tests to ensure the upgrade is smooth. I've always written my tests in <a href="http://github.com/thoughtbot/shoulda">Shoulda</a>. I like the syntax and I love the macros. However, I'm switching everything over to RSpec. <a href="http://robots.thoughtbot.com/post/731871832/this-should-change-your-mind">Thoughtbot has declared they won't abandon the Shoulda community, but since they've made the switch to RSpec for new projects it's pretty clear that Shoulda as a stand alone project has a limited life.</a>

Luckily I've used RSpec in a lot of other projects and it's an easy DSL to like. The conversion from shoulda to RSpec isn't a terribly difficult one. You basically need to replace "context" with describe and then remove your assert statements and replace then with 'should'.

One of the most difficult issues I've had to deal with is my custom shoulda macros. From what I've read the move to BDD should inspire you to use fewer macros and instead focus on specific behavior. I think that philosophy is great, but I've already got a lot of code that uses the macros and so the macros need to be brought over. The change from shoulda macros to RSpec matchers is painful, but I think the code is cleaner and easier to read.

For example, I have custom scope macros. Here's the shoulda macro:

<pre><code class="ruby">
  # Test for 'by_title' named scope which orders by title:
  # scope :by_title, :order => "title ASC"
  # requires that the class have a shoulda factory
  def should_scope_by_title
    klass = get_klass
    factory_name = name_for_factory(klass)
    context "'by_title' title scope" do
      setup do
        klass.delete_all
        @first = Factory(factory_name, :title => 'a')
        @second = Factory(factory_name, :title => 'b')
      end
      should "sort by name" do
        assert_equal @first, klass.by_title[0]
        assert_equal @second, klass.by_title[1]
      end
    end
  end
</pre></code>

And here's the RSpec matcher:

<pre><code class="ruby">
# Ensures that the model can sort by_title
# requires that the class have a factory
#
# Tests scope:
#   scope :by_title, :order => "title ASC"
#
# Examples:
#   it { should scope_by_title }
#
def scope_by_title
  SortingMatcher.new(:by_title, :title)
end

class SortingMatcher # :nodoc:

  def initialize(scope, field)
    @scope = scope
    @field = field
  end

  def matches?(subject)
    @subject = subject
    @subject.class.delete_all
    @first = Factory(factory_name, @field => 'a')
    @second = Factory(factory_name, @field => 'b')
    @first == @subject.class.send(@scope)[0] && @second == @subject.class.send(@scope)[1]
  end

  def failure_message
    "Expected #{factory_name} to scope by #{@scope} on #{@field}"
  end

  def description
    "sort by title"
  end

  private

    def factory_name
      @subject.class.name.underscore.to_sym
    end

end
</pre></code>

I don't profess to be a master of either but my tests work so hopefully this helps someone if you're making the same transition.
