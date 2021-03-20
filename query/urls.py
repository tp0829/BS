from django.conf.urls import url
from django.urls import path
from . import views


urlpatterns = [
    url(r'^profile/$', views.profile),
    url(r'^scores/$', views.scores),
    path(r'coursetable/',views.coursetable),
]