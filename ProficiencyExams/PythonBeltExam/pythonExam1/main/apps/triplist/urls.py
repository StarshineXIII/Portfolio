from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^item/(?P<item_id>\d+)$', views.item, name="item"),

    url(r'^create$', views.create, name="create"),
    url(r'^addMe$', views.addMe, name="addMe"),
    url(r'^delete/(?P<item_id>\d+)$', views.delete, name="delete"),
]