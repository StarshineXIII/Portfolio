from django.conf.urls import url
from . import views
# users app, namespace = users
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'register$', views.register, name='register'),
    url(r'login$', views.register, name='login'),
]