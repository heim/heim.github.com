---
layout: post
title: "Displaying time since last git commit in the prompt"
description: "The one where I craft a one-liner to show time since the last git commit"
location: "Oslo, Norway"
category: Unix 
tags: ["git", "zsh"]
---
{% include JB/setup %}

Being inspired by <a href="http://twitter.com/garybernhardt">@garybernhardt</a>'s zsh-prompt where he shows the time since the last 
git commit I wanted to see if I could incorporate the same into my zsh-prompt.

Requirements
-----------

* It has to be a oneliner
* It must be fast
* It must show the time in relative manner (e.g. 2 hours ago)
* It must be compact

Steps
----

First we must find the last commit. We could do a ```git log | head -1```, but thankfully ```git-log``` provides us with a shorthand for that. Running it results in a similar output:
{% highlight bash %}
$ git log -1
commit 0f65c64701798fbbfafa5c26fc15d9ec1684f25c
Merge: 9bc2f3b dad8d9e
Author: Andreas Heim <andreas@heim.no>
Date:   Fri Apr 13 10:47:51 2012 +0200

  Merge branch 'master' into drafts
        
    Conflicts:
      _posts/2012-04-14-displaying-time-since-last-git-commit-in-the-prompt.md
{% endhighlight %}

This output is obviously too verbose, so to make it a bit more readable we try some format options. The manpage for ```git-log``` has a wide array of options for output formatting, and it also provides a shortcut for formatting the date in a relative manner like my requirements.
{% highlight bash %}
$ git log -1 --pretty=format:"%ar"
16 minutes ago
{% endhighlight %}

Now we are getting somewhere, but this is obviously too verbose to put in my prompt. To cut down the verbosity we can run this throug ```sed``` with a regular expression.

{% highlight bash %}
$ git log -1 --pretty=format:"%ar" | sed 's/\([0-9]*\) \(.\).*/\1\2/'
16m
{% endhighlight %}

The first part of the regular expression ```\([0-9]*\)``` matches an variable lengnt of numbers and puts them in the special variable ```\1```. Then a space is matched, and the last part matches one character and puts it in ```\2``` and matches an arbitrary amount of charachters in the end. Afterwards we print out the variables wothout any spacing.

Putting it together
------------------

Now we have a oneliner that will extract the info we need from the last commit. I would like to put this in a function so I can put this in my zsh-prompt. This function will run after every command so we must make sure it does not give us any error messages when the current directory isn't a git repo.  
We can check that with a simple conditional in the start of the function like this:

{% highlight bash %}
function time_since_last_commit() {
  ref=$(git symbolic-ref HEAD 2> /dev/null) || return
  git log -1 --pretty=format:"%ar" | sed 's/\([0-9]*\) \(.\).*/\1\2/'
}
{% endhighlight %}

I've put this into a custom [oh-my-zsh](http://github.com/robbyrussel/oh-my-sh)-theme, source code [here](https://github.com/heim/oh-my-zsh-custom/blob/master/heim.zsh-the).
