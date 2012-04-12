---
layout: post
title: "Some small VIM tips"
description: "Some small vim tips for beginners"
category: VIM
tags: ["tips"]
---
{% include JB/setup %}


**Disable arrow keys**

To ensure quick navigation, take a minute to disable the arrow-keys. It might seem frightful in the beginning but it will pay in the long run as it forces you to do more of the editing in normal mode.

Paste this into your ```.vimrc```
{% highlight vim %}
" disable arrow keys
nnoremap <up> <nop>
nnoremap <down> <nop>
nnoremap <left> <nop>
nnoremap <right> <nop>
inoremap <up> <nop>
inoremap <down> <nop>
inoremap <left> <nop>
inoremap <right> <nop>
{% endhighlight %}



**Quickly return to file explorer**

Personally I don't use NERDTree or Command-T as I have not seen the use for it. I frequently use the file explorer to navigate various files, and often want to quickly return to the file explorer from normal mode. The command for this is ```:Rexplore``` which i conveniently map to ```,t```.

Paste this into your ```.vimrc```
{% highlight vim %}
" ,r returns to file explorer
map ,r :Rexplore<CR> 
{% endhighlight %}

**Reload .vimrc after saving it**

A little snippet for automatically reloading your ```.vimrc``` after saving it.

Paste this into your ```.vimrc```
{% highlight vim %}
" Source the vimrc file after saving it
if has("autocmd")
  autocmd bufwritepost .vimrc source $MYVIMRC
endif
{% endhighlight %}

You can also take a look at my ```.vimrc``` and the various plugins I use in this <a href="http://github.com/heim/dotvim">github repo</a>.
