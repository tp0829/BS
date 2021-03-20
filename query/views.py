from django.shortcuts import render, redirect, reverse, HttpResponse
from eduSystem.settings import USER_TYPE, USER_ID
from rbac.models import UserInfo, Role
from user.models import Student, Teacher, Admin
from user.forms import StudentModelForm, TeacherModelForm, AdminModelForm
from rbac.forms import UserInfoModelForm
from course.models import SC, Course
from course.views import parser_course_time
import random

def profile(request):
    ttype = request.session[USER_TYPE]
    user_id = request.session[USER_ID]
    user_info = UserInfo.objects.filter(id=user_id).values()
    rolse = UserInfo.objects.filter(id=user_id).values('roles')
    data = list(user_info)
    print(user_info)
    print(rolse)
    if request.method == 'GET':
        if ttype == 0:
            mess_info = Student.objects.filter(id=data[0]['database_id']).values()
            mess_info = list(mess_info)
            data[0].update(mess_info[0])
            return render(request, "edit_stu.html", data[0])
        elif ttype == 1:
            mess_info = Teacher.objects.filter(id=data[0]['database_id']).values()
            mess_info = list(mess_info)
            data[0].update(mess_info[0])
            return render(request, "edit_tea.html", data[0])
        elif ttype == 2:
            mess_info = Admin.objects.filter(id=data[0]['database_id']).values()
            mess_info = list(mess_info)
            data[0].update(mess_info[0])
            return render(request, "edit_adm.html", data[0])
    elif request.method == 'POST':
        # new_password = request.POST.get('password')
        # new_phone = request.POST.get('phone')
        # new_email = request.POST.get('email')
        # new_name = request.POST.get('name')
        # data[0]['password'] = new_password
        # data[0]['phone'] = new_phone
        # data[0]['email'] = new_email
        # print(data[0])
        userform = UserInfoModelForm(request.POST, instance=UserInfo.objects.filter(id=user_id).first())
        # userform.password = new_password
        # userform.phone = new_phone
        # userform.email = new_email
        # userform.name = new_name
        # userform.roles = Role.objects.filter(id=data[0]['roles'])
        print(userform.is_valid())
        print(userform)
        if ttype == 0:
            if userform.is_valid():
                userform.save()
                return redirect(reverse(profile))
            else:
                print(userform.errors)
                return HttpResponse("错误")
        elif ttype == 1:
            if userform.is_valid():
                userform.save()
                return redirect(reverse(profile))
            else:
                print(userform.errors)
                return HttpResponse("错误")
        elif ttype == 2:
            if userform.is_valid():
                userform.save()
                return redirect(reverse(profile))
            else:
                print("herer")
                print(userform.errors)
                return HttpResponse("错误")


def calGPA(score):
    ret = 0
    if score < 60:
        ret = 0.0
    else:
        ret = (score - 60) * 0.1 + 1
    return ret

def scores(request):
    courses = SC.objects.filter(student_id=request.session[USER_ID]).all()
    course_list = courses.values("type", "score", 'course_id_id')
    print(list(course_list))
    for x in course_list:
        c_id = x['course_id_id']
        x['school'] = Course.objects.filter(id=c_id).first().school
        x['course_name'] = Course.objects.filter(id=c_id).first().name
        x['course_code'] = Course.objects.filter(id=c_id).first().code
        x['course_score'] = Course.objects.filter(id=c_id).first().score
        x['course_GPA'] = calGPA(x['course_score'])
    print(list(course_list))
    data = dict()
    data['course_list'] = course_list
    return render(request, "scores.html", data)

def day2num(s):
    '''
    周x 转 x
    如：三->3
    :param s: 周几
    :return: 阿拉伯数字
    '''
    print(s)
    if s=="一":
        return 1
    if s=="二":
        return 2
    if s=="三":
        return 3
    if s=="四":
        return 4
    if s=="五":
        return 5
    if s=="六":
        return 6
    if s=="日":
        return 7

def coursetable(request):
    '''
    返回课表
    :param request:
    :return:
    '''
    ttype = request.session[USER_TYPE]
    user = UserInfo.objects.get(id=request.session[USER_ID])
    course_list=[]
    if ttype==0:
        SC_for_this_student = SC.objects.filter(student_id=user)
        for sc in SC_for_this_student:
            course = sc.course_id
            course_list.append(course)
    if ttype==1:
        SC_for_this_teacher = SC.objects.filter(teacher_id=user)
        for sc in SC_for_this_teacher:
            course=sc.course_id
            course_list.append(course)
    print(course_list)
    dict=[[{"len":"1","time":[]} for j in range(7)] for i in range(11)]
    color_table=["Cyan","orange","hotpink","Aquamarine","Peru","DeepSkyBlue","SpringGreen","Thistle","GreenYellow","RoyalBlue"]
    for each in course_list:
        tmp=parser_course_time(each.time)
        h=tmp["first_class"]-1
        l=day2num(tmp["day"])-1
        print(h,' ',l)
        dict[h][l]["len"]=str(tmp["last_class"]-tmp["first_class"]+1)
        for i in range(tmp["first_class"]+1-1,tmp["last_class"]+1-1):
            dict[i][l]["len"]="0"
        dic={}
        dic["name"]=each.name
        dic["place"]=each.place
        dic["week"]=str(tmp["first_week"])+"-"+str(tmp["last_week"])+"周"
        dict[h][l]["time"].append(dic)
        dict[h][l]["color"]=color_table[random.randint(0,len(color_table))-1]

    print(dict)
    return render(request,"timetable.html",{"table":dict})