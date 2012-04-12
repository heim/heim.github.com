---
layout: page
title: heim.blog
tagline: andreas heim 
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a><br/>{{ post.description }}</li>
  {% endfor %}
</ul>
