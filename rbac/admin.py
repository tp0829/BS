from django.contrib import admin
from .models import Menu, Permission, Role, UserInfo, SchoolInfo, ClassInfo, MajorInfo

# Register your models here.


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ("title", 'parent')


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ("title", 'url', 'menu')


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("title",)


@admin.register(UserInfo)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", 'password', 'name', 'email', 'types', 'database_id',)


@admin.register(SchoolInfo)
class SchoolInfoAdmin(admin.ModelAdmin):
    list_display = ("schoolname", "classroom",)


@admin.register(MajorInfo)
class ClassInfoAdmin(admin.ModelAdmin):
    list_display = ("f_school", "majorname")


@admin.register(ClassInfo)
class MajorInfoAdmin(admin.ModelAdmin):
    list_display = ("f_major", "grade", "classname")