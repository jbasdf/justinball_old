---
title: Add Theming Engine to Your Rails Application
author: Justin Ball
layout: post
permalink: /2010/01/23/add-theming-engine-to-your-rails-application/
  - disguise
  - Ruby On Rails
  - templates
---

I've written about the <a href="http://github.com/jbasdf/disguise">disguise gem</a> before, but I've made enough changes that it warrants a new blog post.  I noticed a few performance problems which have now been fixed and the configuration has been cleaned up a bit.

Disguise makes it simple to swap out the views used by your rails application either by selecting a theme using an admin UI or by changing out the theme based on the current url.  For most apps the feature is probably not relevant, but if you are building a piece of software like a blog or social network then letting your users customize the look of the site is crucial to adoption.

Find the install instructions on the <a href="http://github.com/jbasdf/disguise">project's github account</a>.

While setting a given theme works fine and doesn't incur much of a performance hit beyond method call, swapping out the theme based on the current domain can incur a performance hit since it reloads the localization strings.  Here's the bit of code that swaps the views:

<pre><code class="ruby">
      def setup_theme
        return if !Disguise::Config.themes_enabled
        return if current_theme.blank? || current_theme.name.blank?
        theme_view_path = File.join(Disguise::Config.theme_full_base_path, current_theme.name, 'views')
        if self.view_paths.first == theme_view_path
          return
        else
          return if !theme_exists(theme_view_path)
          clean_theme_view_path
          self.prepend_view_path(theme_view_path)
          clean_theme_locale
          set_theme_locale
          I18n.reload!
        end
      end
</pre></code>

I'm hoping to find a way to improve performance when changing themes, but for now be aware that changing themes based on domains is a work in progress and shouldn't be used in a production environment.
