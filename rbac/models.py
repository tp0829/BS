from django.db import models
# Create your models here.


class Menu(models.Model):
    """
    菜单
    """
    title = models.CharField(max_length=32, unique=True, null=False)
    parent = models.ForeignKey("Menu", null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = '菜单管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        title_list = [self.title]
        p = self.parent
        while p:
            title_list.insert(0, p.title)
            p = p.parent
        return '-'.join(title_list)


class Permission(models.Model):
    """
    权限
    """
    title = models.CharField(max_length=32, unique=True, null=False)
    url = models.CharField(max_length=128, unique=False, null=False)
    menu = models.ForeignKey("Menu", null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = '权限管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{menu} --- {permission}".format(menu=self.menu, permission=self.title)


class Role(models.Model):
    """
    角色
    """
    title = models.CharField(max_length=32, unique=True)
    permissions = models.ManyToManyField("Permission")

    class Meta:
        verbose_name = '角色管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class UserInfo(models.Model):
    """
    用户
    """
    username = models.CharField('用户名', max_length=32, unique=True, null=False)
    password = models.CharField('密码', max_length=128, null=False)
    name = models.CharField('姓名', max_length=32, null=False)
    email = models.EmailField('邮箱', null=True)
    types = models.IntegerField('用户类型', default=False, null=False)
    database_id = models.IntegerField('数据库id', blank=False, null=False, default=1)

    roles = models.ManyToManyField("Role", error_messages={'required': u"不能为空"})

    class Meta:
        verbose_name = '用户账户管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username + " " + self.name


class SchoolInfo(models.Model):
    """
    院系
    """
    schoolname = models.CharField('院系名称', max_length=32, unique=True, null=False)
    classroom  = models.CharField('院系教室', max_length=128, default=" ")

    class Meta:
        verbose_name = '院系管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.schoolname


class MajorInfo(models.Model):
    """
    专业管理
    """
    f_school = models.ForeignKey('SchoolInfo', null=False, blank=False, on_delete=models.CASCADE)
    majorname = models.CharField("专业名称", max_length=32, null=False)

    class Meta:
        verbose_name = '专业管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.f_school.schoolname) + " " + self.majorname


class ClassInfo(models.Model):
    """
    班级管理
    """
    f_major = models.ForeignKey('MajorInfo', null=False, blank=False, on_delete=models.CASCADE)
    grade = models.IntegerField('年级', null=False, blank=False)
    classname = models.CharField("行政班", max_length=32, blank=False, null=False)

    class Meta:
        verbose_name = '班级管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.f_major) + str(self.grade) + " " + self.classname