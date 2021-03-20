from django.shortcuts import render, redirect, reverse
from .models import UserInfo, Role, Permission, Menu, SchoolInfo, MajorInfo, ClassInfo
from .forms import UserInfoModelForm, RoleModelForm, PermissionModelForm, MenuModelForm
from user.models import Student, Teacher, Admin
from user.forms import StudentModelForm, TeacherModelForm, AdminModelForm
from django.http import HttpResponse, JsonResponse
from eduSystem.settings import USER_TYPE,USER_ID
from user.views import index


def users(request):
    """查询所有用户信息"""
    user_list = UserInfo.objects.all()
    return render(request, 'users.html', {'user_list': user_list})


def users_new(request):
    if request.method == "GET":
        model_form = UserInfoModelForm()
        return render(request, 'user_edit.html', {'model_form': model_form, 'title': '新增用户', })
    else:
        model_form = UserInfoModelForm(request.POST)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(users))
        else:
            return render(request, 'user_edit.html', {'model_form': model_form, 'title': '新增用户', })


def add_student(request):
    if request.method == 'GET':
        model_form = UserInfoModelForm()
        message_model_form = StudentModelForm()
        school_list = list(SchoolInfo.objects.all())
        return render(request, 'user_addstu.html',
                      {'model_form': model_form, 'message_model_form': message_model_form,
                       'title': '新增用户',
                       'school_list': school_list})
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        school = request.POST.get('school')
        major = request.POST.get('major')
        cclass = request.POST.get('class')
        birthday = request.POST.get('birthday')
        grade = request.POST.get('grade')

        message_data = {
            'phone': phone,
            'gender': gender,
            'birthday': birthday,
            'grade': grade,
            'school': school,
            'major': major,
            'cclass': cclass,
        }
        message_model_form = StudentModelForm(data=message_data)

        if message_model_form.is_valid():
            message_model_form.save()
            basic_data = {
                'username': username,
                'password': password,
                'name': name,
                'email': email,
                'types': 0,
                'roles': Role.objects.filter(title='学生'),
                'database_id': Student.objects.all().last().id,
            }
            basic_data_form = UserInfoModelForm(data=basic_data)
            if basic_data_form.is_valid():
                basic_data_form.save()
            else:
                print(basic_data_form.errors)
                return HttpResponse("错误")
        else:
            print(message_model_form.errors)
            return HttpResponse("错误")
        return redirect(users)
        # print(basic_data)
        # print(basic_data_form.is_valid())
        # print(basic_data_form.errors)

        # model_form = UserInfoModelForm(request.POST)
        # message_model_form = StudentModelForm(request.POST)
        # if model_form.is_valid() and message_model_form.is_valid():
        #     model_form.save()
        #     message_model_form.save()
        #     user_obj = UserInfo.objects.last()
        #     user_obj.database_id = Student.objects.last().id
        #     user_obj.types = 0
        #     user_obj.save()

        # else:
        #     return HttpResponse("错误")


def add_teacher(request):
    if request.method == 'GET':
        model_form = UserInfoModelForm()
        message_model_form = TeacherModelForm()
        school_list = list(SchoolInfo.objects.all())
        return render(request, 'user_addtea.html',
                      {'model_form': model_form, 'message_model_form': message_model_form,
                       'title': '新增用户',
                       'school_list': school_list})
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        school = request.POST.get('school')
        role = request.POST.get('role')
        diploma = request.POST.get('diploma')
        birthday = request.POST.get('birthday')
        title = request.POST.get('title')

        message_data = {
            'phone': phone,
            'gender': gender,
            'role': role,
            'diploma': diploma,
            'school': school,
            'birthday': birthday,
            'title': title,
            'rate_times': 1,
            'rate': 10.0,
        }
        message_model_form = TeacherModelForm(data=message_data)
        # print(message_data)
        # print(message_model_form.errors)
        if message_model_form.is_valid():
            message_model_form.save()
            basic_data = {
                'username': username,
                'password': password,
                'name': name,
                'email': email,
                'types': 1,
                'roles': Role.objects.filter(title='教师'),
                'database_id': Teacher.objects.all().last().id,
            }
            basic_data_form = UserInfoModelForm(data=basic_data)
            # print(basic_data_form)
            if basic_data_form.is_valid():
                basic_data_form.save()
            else:
                return HttpResponse("错误")
        else:
            return HttpResponse("错误")
        return redirect(users)


def add_admin(request):
    if request.method == 'GET':
        model_form = UserInfoModelForm()
        message_model_form = TeacherModelForm()
        return render(request, 'user_addadm.html',
                      {'model_form': model_form, 'message_model_form': message_model_form,
                       'title': '新增用户',
                       'user_type': request.session[USER_TYPE]})
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        role = request.POST.get('role')

        message_data = {
            'phone': phone,
            'role': '管理员',
        }
        message_model_form = AdminModelForm(data=message_data)
        print(message_data)
        print(message_model_form.errors)
        if message_model_form.is_valid():
            message_model_form.save()
            basic_data = {
                'username': username,
                'password': password,
                'name': name,
                'email': email,
                'types': 3,
                'roles': Role.objects.filter(title='管理员'),
                'database_id': Admin.objects.all().last().id,
            }
            basic_data_form = UserInfoModelForm(data=basic_data)
            print(basic_data_form)
            if basic_data_form.is_valid():
                basic_data_form.save()
            else:
                return HttpResponse("错误")
        else:
            return HttpResponse("错误")
        return redirect(users)


def users_edit(request, id):
    user_obj = UserInfo.objects.filter(id=id).first()
    utype = user_obj.types

    if request.method == 'GET':
        model_form = UserInfoModelForm(instance=user_obj)
        message_model_form = None
        if utype == 0:
            # Student
            stu_instance = Student.objects.filter(id=user_obj.database_id).first()
            message_model_form = StudentModelForm(instance=stu_instance)
        elif utype == 1:
            # Teacher
            tea_instance = Teacher.objects.filter(id=user_obj.database_id).first()
            message_model_form = TeacherModelForm(instance=tea_instance)
        elif utype == 2:
            # Admin
            adm_instance = Admin.objects.filter(id=user_obj.database_id).first()
            message_model_form = AdminModelForm(instance=adm_instance)

        return render(request, 'user_edit.html', {'model_form': model_form, 'message_model_form': message_model_form,
                                             'title': '编辑用户', 'user_type': utype})
    else:
        model_form = UserInfoModelForm(request.POST, instance=user_obj)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(users))
        else:
            return render(request, 'user_edit.html', {'model_form': model_form, 'title': '编辑用户', 'user_type': request.session[USER_TYPE]})


def users_delete(request, id):
    user_obj = UserInfo.objects.filter(id=id).first()
    user_obj.delete()
    return redirect(reverse(users))


def roles(request):
    role_list = Role.objects.all()
    return render(request, 'roles.html', {'role_list': role_list, 'user_type': request.session[USER_TYPE]})


def roles_new(request):
    if request.method == "GET":
        # 传入ModelForm对象
        model_form = RoleModelForm()
        return render(request, 'role_addrole.html', {'model_form': model_form, 'title': '新增角色', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = RoleModelForm(request.POST)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(roles))
        else:
            return render(request, 'role_addrole.html',
                          {'model_form': model_form,
                           'title': '新增角色',
                           'user_type': request.session[USER_TYPE]})


def roles_edit(request, id):
    role_obj = Role.objects.filter(id=id).first()
    if request.method == 'GET':
        model_form = RoleModelForm(instance=role_obj)
        return render(request, 'role_addrole.html', {'model_form': model_form, 'title': '编辑角色', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = RoleModelForm(request.POST, instance=role_obj)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(roles))
        else:
            return render(request, 'role_addrole.html', {'model_form': model_form, 'title': '编辑角色', 'user_type': request.session[USER_TYPE]})


def roles_delete(request, id):
    role_obj = Role.objects.filter(id=id).first()
    role_obj.delete()
    return redirect(reverse(roles))


def permissions(request):
    permission_list = Permission.objects.all()
    return render(request, 'permissions.html', {'permission_list': permission_list, 'user_type': request.session[USER_TYPE]})


def permissions_new(request):
    if request.method == "GET":
        # 传入ModelForm对象
        model_form = PermissionModelForm()
        return render(request, 'permission_addper.html', {'model_form': model_form, 'title': '新增权限', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = PermissionModelForm(request.POST)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(permissions))
        else:
            return render(request, 'permission_addper.html', {'model_form': model_form, 'title': '新增权限', 'user_type': request.session[USER_TYPE]})


def permissions_edit(request, id):
    permission_obj = Permission.objects.filter(id=id).first()
    if request.method == 'GET':
        model_form = PermissionModelForm(instance=permission_obj)
        return render(request, 'permission_addper.html', {'model_form': model_form, 'title': '编辑权限', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = PermissionModelForm(request.POST, instance=permission_obj)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(permissions))
        else:
            return render(request, 'permission_addper.html', {'model_form': model_form, 'title': '编辑权限', 'user_type': request.session[USER_TYPE]})


def permissions_delete(request, id):
    print("in")
    permission_obj = Permission.objects.filter(id=id).first()
    permission_obj.delete()
    return redirect(reverse(permissions))


def menus(request):
    menu_list = Menu.objects.all()
    print(str(menu_list))
    return render(request, 'menus.html', {'menu_list': menu_list, 'user_type': request.session[USER_TYPE]})


def menus_new(request):
    if request.method == "GET":
        model_form = MenuModelForm()
        return render(request, 'menu_addmenu.html', {'model_form': model_form, 'title': '新增菜单', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = MenuModelForm(request.POST)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(menus))
        else:
            return render(request, 'menu_addmenu.html', {'model_form': model_form, 'title': '新增菜单', 'user_type': request.session[USER_TYPE]})


def menus_edit(request, id):
    menu_obj = Menu.objects.filter(id=id).first()
    if request.method == 'GET':
        model_form = MenuModelForm(instance=menu_obj)
        return render(request, 'menu_addmenu.html', {'model_form': model_form, 'title': '编辑菜单', 'user_type': request.session[USER_TYPE]})
    else:
        model_form = MenuModelForm(request.POST, instance=menu_obj)
        if model_form.is_valid():
            model_form.save()
            return redirect(reverse(menus))
        else:
            return render(request, 'menu_addmenu.html', {'model_form': model_form, 'title': '编辑菜单', 'user_type': request.session[USER_TYPE]})


def menus_delete(request, id):
    menu_obj = Menu.objects.filter(id=id).first()
    menu_obj.delete()
    return redirect(reverse(menus))


def load_major(request):
    print("here")
    if request.method == 'GET':
        school = request.GET.get('school')
        if school:
            scid = SchoolInfo.objects.filter(schoolname=school).first().id
            major_list = list(MajorInfo.objects.filter(f_school=scid).values("majorname"))
            return JsonResponse(major_list, safe=False)


def load_grade(request):
    if request.method == 'GET':
        major = request.GET.get('major')
        if major:
            major_id = MajorInfo.objects.filter(majorname=major).first().id
            grade_list = list(ClassInfo.objects.filter(f_major=major_id).values("grade").distinct())
            return JsonResponse(grade_list, safe=False)


def load_class(request):
    if request.method == 'GET':
        major = request.GET.get('major')
        grade = request.GET.get('grade')
        if major and grade:
            major_id = MajorInfo.objects.filter(majorname=major).first().id
            class_list = list(ClassInfo.objects.filter(f_major=major_id, grade=grade).values("classname"))
            return JsonResponse(class_list, safe=False)
