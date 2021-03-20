from django.urls import path
from .import views
urlpatterns = [
    path('test/', views.test),
    path('select/', views.select),
    path("del/", views.delete),
    path("grade/", views.Grade),
    path("add_course/", views.add_course),
    path("ajax/load_stu_list/", views.load_stu_list),
    path("", views.all_course),
]
