{% extends "layouts/application.html" %}

{% block style %}
<link rel="stylesheet" href="/styles/index.css" />
{% endblock %}

{% block script %}
<script src="/scripts/index.js"></script>
{% endblock %}

{% block content %}
<section class="console">
  <!-- Aside -->
  
  <aside class="aside-bar">

    <nav><ul class="menus">
	<li class="menus__item">
	  <a href="#" class="menu">
	    <span class="menu__icon ion-md-bookmark"></span>
	    PAGE INDEX
	  </a>
	</li><!-- /.menu-item -->
	<li class="menus__item">
	  <a href="#" class="menu">
	    <span class="menu__icon ion-md-ionic"></span>
	    ICONS
	  </a>
	</li><!-- /.menu-item -->
	<li class="menus__item">
	  <a href="#" class="menu">
	    <span class="menu__icon ion-ios-construct"></span>
	    COMPONENTS
	  </a>
	</li><!-- /.menu-item -->
	<li class="menus__item">
	  <a href="#" class="menu">
	    <span class="menu__icon ion-ios-document"></span>
	    DOCUMENTS
	  </a>
	</li><!-- /.menu-item -->
	<li class="menus__item">
	  <a href="#" class="menu">
	    <span class="menu__icon ion-logo-github"></span>
	    GITHUB
	  </a>
	</li><!-- /.menu-item -->
    </ul></nav><!-- /.menu -->
    
  </aside>

  
  <!-- Main -->
  {% block main %}{% endblock %}
  
{% endblock %}