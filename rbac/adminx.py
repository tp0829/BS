import xadmin
from .models import UserInfo, Menu, Permission, Role, SchoolInfo, ClassInfo, MajorInfo

class UserInfoAdmin(object):
    list_display = ['username', 'name', 'email', 'types']

xadmin.site.register(UserInfo, UserInfoAdmin)


class MemuAdmin(object):
    list_display = ['title', 'parent']

xadmin.site.register(Menu, MemuAdmin)


class PermissionAdmin(object):
    list_display = ['title', 'url', 'menu']

xadmin.site.register(Permission, PermissionAdmin)


class RoleAdmin(object):
    list_display = ['title', 'permissions']

xadmin.site.register(Role, RoleAdmin)


class SchoolInfoAdmin(object):
    list_display = ("schoolname", 'classroom')


xadmin.site.register(SchoolInfo, SchoolInfoAdmin)

class MajorInfoAdmin(object):
    list_display = ("f_school", "majorname")



class ClassInfoAdmin(object):
    list_display = ("f_major", "grade", "classname")


xadmin.site.register(MajorInfo, MajorInfoAdmin)
xadmin.site.register(ClassInfo, ClassInfoAdmin)