<!DOCTYPE html>
<html>
  <head>
    {% include "./mate.tpl" %}
    {% block style %}{% endblock %}
  </head>
  <body>
    {% block content %}{% endblock %}
    {% block script %}{% endblock %}
  </body>
</html>
