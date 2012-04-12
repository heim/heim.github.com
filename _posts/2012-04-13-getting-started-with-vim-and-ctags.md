---
layout: post
title: "Getting started with VIM and ctags."
description: "The one where I elaborate on how to get started with VIM and ctags."
location: Oslo, Norway
category: VIM
tags: [navigation, ctags, tutorial]
---
{% include JB/setup %}

Motivation
----------
It comes a time when your small rails-app has grown to a monster. 
And there are times where you have to program Java. Either way, when you are lost in mountains of source code, that's where ctags will help you. 

What is ctags?
--------------
> Ctags generates an index (or tag) file of language objects found in source files that allows these items to be quickly and easily located by a text editor or other utility. A tag signifies a language object for which an index entry is available (or, alternatively, the index entry created for that object).
> -- <cite><a href="http://ctags.sourceforge.net/whatis.html">ctags.sourceforge.net/whatis.html</a></cite>


Getting started
---------------

On OS X install ctags with  
```$ brew install ctags```

Navigate to your application or try this on a large ruby library, like <a href="http://github.com/mongoid/mongoid">mongoid</a>.

To index class and method names just go to the root of the project and type  
```ctags -R --exclude=.git```  
You can pass multiple 
```--exclude=<path>```
to the command if you want to ignore other files e.g. logs.

Using ctags from within VIM
---------------------------

To search for a given tag ```:ta <tag_name>```. If your VIM is set up correctly you can press tap for autocompletion of tag names.
```:ta``` accepts a regexp for searching, 
ex. ```:ta /^calculate_*```.
Press ```Ctrl+]``` to search for the tag under the cursor. On my norwegian mac keyboard this is an impossible key combination so I usually map this to another shortcut: ```:map ,f <C-]>```. Jump backwards in the tag stack with ```Ctrl+t```.

You can also navigate the tag stack with ```Ctrl+o``` to travel backward and ```Ctrl+i``` to travel forward. Print the tag stack with ```:tags```.

If you get multiple matches you can go to the next match with ```:tn``` and the previous tag with ```:tp```. You can also get a list with files that have a matching tag name with  
```:tselect <tagname>```. 

  


Further reading:  
---------------
* ```:help tags```
* [tpope: Effortles ctags with git](http://tbaggery.com/2011/08/08/effortless-ctags-with-git.html) Make ctags update automatically with every git commit
* [codingfreak: ctags - vim on steroids](http://codingfreak.blogspot.com/2009/12/ctags-vim-with-steroids.html) nice write-up of ctags basics
