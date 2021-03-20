from django.shortcuts import render, redirect, HttpResponse, reverse
from rbac.service.init_permission import init_permission
from django.conf import settings
from eduSystem.settings import USER_ID, USER_TYPE
import json
from rbac.forms import UserInfoModelForm
from rbac.models import UserInfo
from course.models import SC
from course.views import parser_course_time
import random
# Create your views here.
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

def index(request):
    title = '教务系统首页'
    id = request.session[USER_ID]
    username = UserInfo.objects.get(id=id).username
    name = UserInfo.objects.get(id=id).name
    ttype = request.session[USER_TYPE]
    # user = UserInfo.objects.get(id=request.session[USER_ID])
    # course_list=[]
    # if ttype==0:
    #     SC_for_this_student = SC.objects.filter(student_id=user)
    #     for sc in SC_for_this_student:
    #         course = sc.course_id
    #         course_list.append(course)
    # if ttype==1:
    #     SC_for_this_teacher = SC.objects.filter(teacher_id=user)
    #     for sc in SC_for_this_teacher:
    #         course=sc.course_id
    #         course_list.append(course)
    # print(course_list)
    # dict=[[{"len":"1","time":[]} for j in range(7)] for i in range(11)]
    # color_table=["Cyan","orange","hotpink","Aquamarine","Peru","DeepSkyBlue","SpringGreen","Thistle","GreenYellow","RoyalBlue"]
    # for each in course_list:
    #     tmp=parser_course_time(each.time)
    #     h=tmp["first_class"]-1
    #     l=day2num(tmp["day"])-1
    #     print(h,' ',l)
    #     dict[h][l]["len"]=str(tmp["last_class"]-tmp["first_class"]+1)
    #     for i in range(tmp["first_class"]+1-1,tmp["last_class"]+1-1):
    #         dict[i][l]["len"]="0"
    #     dic={}
    #     dic["name"]=each.name
    #     dic["place"]=each.place
    #     dic["week"]=str(tmp["first_week"])+"-"+str(tmp["last_week"])+"周"
    #     dict[h][l]["time"].append(dic)
    #     dict[h][l]["color"]=color_table[random.randint(0,len(color_table))-1]
    # print(dict)
    return render(request, 'index.html', {"table":dict, 'id':id, "username":username, 'name':name})

def login(request):
    title = '教务系统登录'
    message = ''
    error = json.dumps(True)
    if request.method == "GET":
        print()
        try:
            test = request.session[settings.SESSION_PERMISSION_URL_KEY]
        except:
            error = json.dumps(False)
            return render(request, "login.html", locals())
        else:
            return redirect('/index/')
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username)
        print(password)
        user_obj = UserInfo.objects.filter(username=username, password=password).first()
        if not user_obj:
            message = '用户名或密码错误'
            return render(request, "login.html", locals())
        else:
            init_permission(request, user_obj)
            return redirect('/index/')


def logout(request):
    try:
        del request.session[settings.SESSION_PERMISSION_URL_KEY]
        del request.session[settings.SESSION_MENU_KEY]
    except:
        return redirect(login)
    else:
        return redirect(login)
