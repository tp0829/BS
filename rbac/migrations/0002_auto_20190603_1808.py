# Generated by Django 2.1.2 on 2019-06-03 10:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rbac', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.IntegerField(verbose_name='年级')),
                ('classname', models.CharField(max_length=32, verbose_name='行政班')),
            ],
            options={
                'verbose_name': '班级管理',
                'verbose_name_plural': '班级管理',
            },
        ),
        migrations.CreateModel(
            name='MajorInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('majorname', models.CharField(max_length=32, verbose_name='专业名称')),
            ],
            options={
                'verbose_name': '专业管理',
                'verbose_name_plural': '专业管理',
            },
        ),
        migrations.CreateModel(
            name='SchoolInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('schoolname', models.CharField(max_length=32, unique=True, verbose_name='院系名称')),
                ('classroom', models.CharField(default=' ', max_length=128, verbose_name='院系教室')),
            ],
            options={
                'verbose_name': '院系管理',
                'verbose_name_plural': '院系管理',
            },
        ),
        migrations.AlterModelOptions(
            name='menu',
            options={'verbose_name': '菜单管理', 'verbose_name_plural': '菜单管理'},
        ),
        migrations.AlterModelOptions(
            name='permission',
            options={'verbose_name': '权限管理', 'verbose_name_plural': '权限管理'},
        ),
        migrations.AlterModelOptions(
            name='role',
            options={'verbose_name': '角色管理', 'verbose_name_plural': '角色管理'},
        ),
        migrations.AlterModelOptions(
            name='userinfo',
            options={'verbose_name': '用户账户管理', 'verbose_name_plural': '用户账户管理'},
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='database_id',
            field=models.IntegerField(default=1, verbose_name='数据库id'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='email',
            field=models.EmailField(max_length=254, null=True, verbose_name='邮箱'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='name',
            field=models.CharField(max_length=32, verbose_name='姓名'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='password',
            field=models.CharField(max_length=128, verbose_name='密码'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='roles',
            field=models.ManyToManyField(error_messages={'required': '不能为空'}, to='rbac.Role'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='types',
            field=models.IntegerField(default=False, verbose_name='用户类型'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='username',
            field=models.CharField(max_length=32, unique=True, verbose_name='用户名'),
        ),
        migrations.AddField(
            model_name='majorinfo',
            name='f_school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rbac.SchoolInfo'),
        ),
        migrations.AddField(
            model_name='classinfo',
            name='f_major',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rbac.MajorInfo'),
        ),
    ]
