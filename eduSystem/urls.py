"""eduSystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rbac import views as rviews

from django.urls import path
from django.conf.urls import url, include
import user.views as userviews
import course.views as courseviews
import xadmin

urlpatterns = [
    path('admin/', xadmin.site.urls),
    path('index/', userviews.index),
    path('course/', include('course.urls')),
    path('', userviews.login),
    path('logout/', userviews.logout),
    path('login/', userviews.login),
    path('rbac/', include('rbac.urls')),
    path(r'teacher/submit/', courseviews.submit),
    path('query/',include('query.urls')),
    url(r'^ajax/load_major/$', rviews.load_major),
    url(r'^ajax/load_grade/$', rviews.load_grade),
    url(r'^ajax/load_class/$', rviews.load_class),
    url(r'^ajax/load_stu_list/$', courseviews.load_stu_list),
]
