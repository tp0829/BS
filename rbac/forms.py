from django.forms import ModelForm, widgets
from .models import UserInfo, Role, Permission, Menu

class UserInfoModelForm(ModelForm):
    class Meta:
        model = UserInfo
        fields = '__all__'
        widgets = {
            'username': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'password': widgets.PasswordInput(attrs={'class': 'form-control input-lg'}),
            'name': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'email': widgets.EmailInput(attrs={'class': 'form-control input-lg'}),
            'types': widgets.NumberInput(attrs={'class': 'form-control input-lg'}),
            'database_id': widgets.NumberInput(attrs={'class': 'form-control input-lg'}),
            'roles': widgets.Select(attrs={'class': 'form-control input-lg'}),
        }
        labels = {
            'username': '用户名',
            'password': '密码',
            'name': '姓名',
            'email': '邮箱',
            'types': '用户类型',
            'database_id': '数据库编号',
            'roles': '角色',
        }


class RoleModelForm(ModelForm):
    class Meta:
        model = Role
        fields = '__all__'
        widgets = {
            'title': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'permissions': widgets.Select(attrs={'class': 'form-control input-lg'}),
        }
        labels = {
            'title': '角色',
            'permissions': '权限',
        }


class PermissionModelForm(ModelForm):
    class Meta:
        model = Permission
        fields = '__all__'
        widgets = {
            'title': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'url': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'menu': widgets.Select(attrs={'class': 'form-control input-lg'}),
        }
        labels = {
            'title': '权限',
            'url': 'url',
            'menu': '所属菜单'
        }


class MenuModelForm(ModelForm):
    class Meta:
        model = Menu
        fields = '__all__'
        widgets = {
            'title': widgets.TextInput(attrs={'class': 'form-control input-lg'}),
            'parent': widgets.Select(attrs={'class': 'form-control input-lg'}),
        }
        labels = {
            'title': '菜单',
            'parent': '父级菜单',
        }
