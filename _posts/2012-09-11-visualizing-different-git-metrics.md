---
layout: post
title: "Visualizing different git metrics"
description: "The one where I present three scripts for getting data out of your git."
location: "Oslo, Norway"
category: Unix
tags: [git, tips]
---
{% include JB/setup %}

This is a follow-up, or rather a predecessor of my talk at this years Javazone, and I will quickly summarize the takeaways from my upcoming talk.

There exists a lot of unused data in our git repositories, and with simple techniques and tools we can extract some of these data and visualize them.

I will present three scripts that generate csv-output and thus can be opened in any spreadsheet and turned into a graph.

**#1 Repository size**

This script will output the total number of lines per revision, and can be used to monitor accidental check-ins (or check-outs) of libraries and such. 

{% highlight bash %}
#!/bin/bash

set -e

function main() {
  git rev-list --reverse  --since="6 months ago" HEAD |
  while read rev; do 
    echo "`revision_time`, `line_count`"
  done 
}

function line_count() {
  git ls-tree -r $rev | 
  awk '{print $3}' | 
  xargs git show |
  wc -l
}
function revision_time() {
  git log -1 $rev --pretty=format:"%ai"
}
main
{% endhighlight %}

Please note that this only looks 6 months back in time for speedyness, but this is of course customizable.

**#2 git churn**

This term I think was coined by Corey Haines, and is a number that indicates how many times a file has changed over the history of the repository. If a file is changing all the time, maybe it's time to refactor it into two or more files? 

{% highlight bash %}
#!/bin/bash
git log --all -M -C --name-only --format='format:' "$@" | 
sort | grep -v '^$' | uniq -c | sort | tail -n 5 
{% endhighlight %}


**#3 Impact**

You know the impact graph over at github? Well, this is a simpler, not so cool version of that one. It shows the total number of lines added + the lines deleted for each revision. Useful to find flukes, and to see if your commits are getting bigger or smaller.

{% highlight bash %}
#! /bin/sh
(echo "rev,lines changed"
git rev-list HEAD --since="1 year ago"|
while read rev;
do
  git show $rev --shortstat --format="%h" | tr "\\n" " " | awk '{t=$5+$7} {print $1 "," t } '
done
{% endhighlight %}

You can also check out these scripts and the presentation (in norwegian) at my <a href="http://github.com/heim/jz12-visualisering-av-kildekode">github page</a>.

