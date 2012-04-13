---
layout: post
title: "Displaying time since last git commit in the prompt"
description: "The one where I craft a one-liner to show time since the last git commit"
location: "Oslo, Norway"
category: Unix 
tags: ["git", "zsh"]
---
{% include JB/setup %}

Being inspired by <a href="http://twitter.com/garybernard">@garybernard</a>'s zsh-prompt where he shows the time since the last 
git commit I wanted to see if I could incorporate the same into my zsh-prompt.

Requirements
-----------

* It has to be a oneliner
* It must be fast
* It must show the time in relative manner (e.g. 2 hours ago)
* It must be compact

Steps
----

First we must find the last commit. That's pretty simple:  
{% highlight terminal %}
git log -1
{% endhighligh %}
