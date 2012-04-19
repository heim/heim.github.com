---
layout: post
title: "Generate ctags for all bundled gems in a ruby project"
description: "The one where I provide a quick tip for generating tags for all bundled gems."
location: "Oslo, Norway"
category: VIM
tags: [bundler, ctags, ruby]
---
{% include JB/setup %}


You can make bundler show the locations for the gems in the gemfile with
{% highlight bash %}
bundle show --paths
{% endhighlight %}

If you pipe this list into ctags, it will generate tags for all gems specified in the gemfile.

{% highlight bash %}
bundle show --paths | xargs ctags -R
{% endhighlight %}

To index the tags and append the tags for your project run

{% highlight bash %}
ctags -R -a * 
{% endhighlight %}
