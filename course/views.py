from django.shortcuts import render,redirect, HttpResponse, reverse
from django.http import JsonResponse
from eduSystem.settings import USER_TYPE, USER_ID
from rbac.models import UserInfo,SchoolInfo
from user.models import Student,Teacher,Admin
from .models import Course,SC
from django.contrib import messages

# Create your views here.
def test(request):
    '''
    测试页面
    :param request:
    :return: html
    '''
    return render(request,'test.html')

def parser_course_time(s):
    '''

    :param s:课程的time
    :return: 一个字典{"first_week": ,"last_week": ,"day": ,"first_class": ,"last_class":}
    '''
    ans={}
    s=s.split(";")
    s[0]=s[0].split("-")
    s[2]=s[2].split("-")

    ans["first_week"]=int(s[0][0])

    ans["last_week"]=int(s[0][1][0:-1])
    ans["day"]=s[1][1]
    ans["first_class"]=int(s[2][0])
    ans["last_class"]=int(s[2][1][0:-1])
    return ans

def check_course_time(a,b):
    '''

    :param a: 字符串，表示第一门课程的时间
    :param b: 字符串，表示第二门课程的时间
    :return: 0(表示时间冲突); 1(表示时间不冲突)
    '''

    parser_a=parser_course_time(a)
    parser_b=parser_course_time(b)
    if parser_a["day"]!=parser_b["day"]:
        return 1
    if parser_a["first_class"]>parser_b["last_class"] or parser_a["last_class"]<parser_b["first_class"]:
        return 1
    if parser_a["first_week"] > parser_b["last_week"] or parser_a["last_week"] < parser_b["first_week"]:
        return 1
    return 0

def check_course_type(student,course):
    '''

    :param student: 选课的学生(是student的一个对象)
    :param course: 将选的课(是course的一个对象)
    :return: "专业课"
              "跨专业课"
    '''
    print(Student.objects.get(id=student.database_id).school)
    if course.school==Student.objects.get(id=student.database_id).school:
        return "专业课"
    else:
        return "跨专业课"

def check_SC(student,course):
    '''

    :param student: 选课的学生(是student的一个对象)
    :param course: 将选的课(是course的一个对象)
    :return:
            "选课成功！":选课成功
            "您已选过此类课程！":选课失败
            "时间冲突！":选课失败
            "选课人数已满！":选课失败
    '''
    print("enter")
    SC_for_this_student=SC.objects.filter(student_id=student)
    print(SC_for_this_student)
    for sc in SC_for_this_student:
        print(sc)
        saved_course=sc.course_id
        if saved_course.code==course.code:
            return "您已选过此类课程！"
        if check_course_time(course.time,saved_course.time)==0:
            return "时间冲突！"
    print("wmr")
    if course.num>=course.cap:
        return "选课人数已满！"
    print("wmrwmr")
    sc = SC(student_id=student, course_id=course,type=check_course_type(student,course))
    sc.save()
    course.num+=1
    course.save()
    print("wmrwmrwmr")
    return "选课成功！"

def get_list():
    '''
    
    :return: dict{"type_list":,"school_list":,"day_list":,"section_list":} 
    '''
    dict={"type_list":["专业课","跨专业课"],}
    school_list=list(Course.objects.values('school').distinct().order_by("school"))
    school_list=[each["school"] for each in school_list]
    day_list=["周一","周二","周三","周四","周五","周六","周日"]
    section_list=["1-2节","1-3节","3-4节","1-4节","5-6节","5-7节","7-8节","5-8节","9-11节"]
    dict["school_list"]=school_list
    dict["day_list"]=day_list
    dict["section_list"]=section_list
    return dict

def select(request):
    '''
    选课页面
    :param request:
    :return: html
    '''
    if request.method=='GET':
        if request.session[USER_TYPE] == 0:        #只有学生才能选课
            dict=get_list()
            course_list = Course.objects.all()
            dict["course_list"]=course_list
            dict["user_type"]=request.session[USER_TYPE]
            return render(request, "select.html",dict)
        else:
            HttpResponse("只有学生才能选课！")
    elif request.method=='POST':

        if request.POST.get("搜索")!=None:

            course_list = []
            tmp=Course.objects.all()
            for course in tmp:
                if request.POST.get("课程类型")!="" and request.POST.get("课程类型")!=check_course_type(UserInfo.objects.get(id=request.session[USER_ID]),course):
                    continue
                if request.POST.get("开课院系")!="" and request.POST.get("开课院系")!=course.school:
                    continue
                print(request.POST.get("上课日"))
                print(request.POST.get("上课日") in course.time)
                if request.POST.get("上课日")!="" and (request.POST.get("上课日") in course.time)==False:
                    continue
                if request.POST.get("上课节")!="" and (request.POST.get("上课节") in course.time)==False:
                    continue
                course_list.append(course)
            dict = get_list()
            dict["course_list"]=course_list
            dict["user_type"]=request.session[USER_TYPE]
            return render(request, "select.html", dict)
        #if request.POST.get("提交")!=None:
        #弹窗提示采用Ajax提交表单,但此时submit的name值传不到后端,故,修改此句.
        #(name值不为"搜索",即默认执行"提交")
        else:
            list = request.POST.getlist("radio_list")
            print(list)
            message = check_SC(UserInfo.objects.get(id=request.session[USER_ID]), Course.objects.get(id=int(list[0])))
            print("check_SC_ok")
            return HttpResponse(message)
        #print("POST")
        #print(request.POST.getlist("radio_list"))
        #print(request.POST.get("课程类型"))
        #print(request.POST.get("提交"))
        #print(request.POST.get("搜索"))


        #if message!="ok":
        #    return HttpResponse(message)
        #return redirect(select)
    else:
        HttpResponse("错误")

def del_SC(student,course):
    '''

    :param student: 选课的学生(是student的一个对象)
    :param course: 将退的课(是course的一个对象)
    :return: "退课成功！"
    '''
    print("ok")
    c=Course.objects.get(id=course.id)
    c.num-=1
    c.save()
    SC.objects.get(student_id=student,course_id=course).delete()
    return "退课成功！"


def delete(request):
    '''
    退课界面
    :param request:
    :return: html
    '''
    if request.method=='GET':
        if request.session[USER_TYPE] == 0:        #只有学生才能退课

            SC_this=SC.objects.filter(student_id=UserInfo.objects.get(id=request.session[USER_ID]))
            course_list=Course.objects.none()
            print(type(course_list))
            for each in SC_this:
                print(each.course_id.id)
                course_list = course_list | Course.objects.filter(id=each.course_id.id)
            return render(request, "delete.html",
                        {"course_list": course_list, "user_type": request.session[USER_TYPE]})
        else:
            HttpResponse("只有学生才能退课！")
    elif request.method=='POST':

        print("POST")
        print(request.POST.getlist("radio_list"))
        list=request.POST.getlist("radio_list")
        message=del_SC(UserInfo.objects.get(id=request.session[USER_ID]),Course.objects.get(id=int(list[0])))
        return HttpResponse(message)
        #if message!="ok":
        #    return HttpResponse(message)
        #return redirect(select)
    else:
        HttpResponse("错误")



def Grade(request):
    user_id = request.session[USER_ID]
    username = UserInfo.objects.get(id=user_id).username
    name = UserInfo.objects.get(id=user_id).name
    SC_list = SC.objects.filter(student_id=user_id)
    return render(request, 'grade.html', locals())

def arrange_course(teacher,school,course,week,length):
    '''
    排课模块
    :param teacher: 老师(Userinfo的一个对象)
    :param school: 学院
    :param course: 待排的课(time和place需要确定)
    :param week: 上课的周(如: 1-18周)
    :param length: 该课一周的节数
    :return: 正整数 排课的课程的id
              0 排课失败
    '''
    classroom=SchoolInfo.objects.get(schoolname=school).classroom
    print(classroom)
    classroom=classroom.split(';')
    print(classroom)
    day_list=["周一","周二","周三","周四","周五","周六","周日"]
    section_list=["1-2节","1-3节","3-4节","1-4节","5-6节","5-7节","7-8节","5-8节","9-11节"]
    for section in section_list:
        #print("debug", int(section[2:-1]) - int(section[0]))
        if int(section[2:-1])-int(section[0])+1!=length:
            continue
        for day in day_list:
            for place in classroom:
                tmp=week+";"+day+";"+section
                allcourse=Course.objects.all()
                is_conflict=0
                for each in allcourse:
                    if check_course_time(each.time,tmp)==0 and place==each.place:
                        is_conflict=1
                        break
                    if check_course_time(each.time,tmp)==0 and teacher==each.teacher_id:
                        is_conflict=1
                        break
                if is_conflict==0:
                    course.time=tmp
                    course.place=place
                    course.save()
                    return course.id
    print("error")
    return 0


def add_course(request):
    '''
    院系管理员添加课程的页面
    :param request:
    :return: html
    '''
    #return render(request,'add_course.html')
    if request.session[USER_TYPE] != 2:  # 只有管理员才能添加课程
        HttpResponse("只有管理员才能添加课程！")
    week_list = ["1-18周", "1-9周", "10-18周"]
    length_list = [2, 3, 4]
    this_school = Admin.objects.get(id=UserInfo.objects.get(id=request.session[USER_ID]).database_id).school
    teacher_list = []
    allteacher = UserInfo.objects.filter(types=1)
    print(allteacher)
    for each in allteacher:
        print(each.database_id)
        if Teacher.objects.get(id=each.database_id).school == this_school:
            teacher_list.append(each)
    dict = {}
    dict["week_list"] = week_list
    dict["length_list"] = length_list
    dict["teacher_list"] = teacher_list
    dict["user_type"] = request.session[USER_TYPE]
    if request.method=='GET':
        dict["show"]=False
        return render(request, "add_course.html",dict)
    elif request.method=='POST':
        print("POST:")
        print(request.POST.get('name'))
        print(request.POST.get('score'))
        print(request.POST.get('code'))
        print(request.POST.get('cap'))
        print(request.POST.get('上课周'))
        print(request.POST.get('课时'))
        print(request.POST.getlist('上课老师'))
        teacher_list=request.POST.getlist('上课老师')
        course_list=[]
        error_list="以下老师的课排课失败："
        for each_teacher in teacher_list:
            course=Course(
                   name=request.POST.get('name'),
                   score=float(request.POST.get('score')),
                   teacher_id=UserInfo.objects.get(id=int(each_teacher)),
                   school=this_school,
                   code=request.POST.get('code'),
                   cap=request.POST.get('cap')
            )
            id=arrange_course(this_school,course,request.POST.get('上课周'),int(request.POST.get('课时')))
            if id==0:
                error_list+=UserInfo.objects.get(id=int(each_teacher)).name+" "
            else:
                course_list.append(Course.objects.get(id=id))

        dict["show"]=True
        dict["course_list"]=course_list
        return render(request, "add_course.html", dict)


def submit(request):
    if request.method == 'GET':
        if request.session[USER_TYPE] == 0:
            pass
        elif request.session[USER_TYPE] == 1:
            course_list = Course.objects.filter(teacher_id=request.session[USER_ID]).all()
            course_name_list = course_list.values("name")
            return render(request, "submit.html", {"course_name_list": course_name_list})
    elif request.method == 'POST':
        # print("here")
        course_name = request.POST.get('course')
        course_id = Course.objects.filter(name=course_name, teacher_id=request.session[USER_ID]).first()
        course_id = course_id.id
        # print("here2" , course_id)
        stu_list = SC.objects.filter(course_id=course_id).all().values("student_id")
        stu_list = list(stu_list)
        for i in range(0, len(stu_list)):
            new_score = request.POST.get("score" + str(i))
            sc_obj = SC.objects.filter(course_id=course_id, student_id=stu_list[i]['student_id']).first()
            sc_obj.score = new_score
            sc_obj.save()
        return redirect(reverse(submit))


def load_stu_list(request):
    if request.method == 'GET':
        course_name = request.GET.get('course_name')
        # print(course_name)
        course_id = Course.objects.filter(name=course_name, teacher_id=request.session[USER_ID]).first()
        course_id = course_id.id
        # print(course_id)
        stu_list = SC.objects.filter(course_id=course_id).all().values("student_id")
        # stu_list = [x[id] for x in list(stu_list)]
        stu_list = list(stu_list)
        # print(stu_list)
        for x in stu_list:
            sid = x['student_id']
            x['stu_id'] = UserInfo.objects.filter(id=sid).first().username
            x['stu_name'] = UserInfo.objects.filter(id=sid).first().name
            x['stu_score'] = SC.objects.filter(course_id=course_id, student_id=sid).first().score
        # print(stu_list)

        return JsonResponse(stu_list, safe=False)

