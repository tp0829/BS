# Generated by Django 2.1.2 on 2019-06-03 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name': '课程管理', 'verbose_name_plural': '课程管理'},
        ),
        migrations.AlterModelOptions(
            name='sc',
            options={'verbose_name': '选课管理', 'verbose_name_plural': '选课管理'},
        ),
        migrations.AddField(
            model_name='course',
            name='cap',
            field=models.IntegerField(default=0, verbose_name='人数上限'),
        ),
        migrations.AddField(
            model_name='course',
            name='num',
            field=models.IntegerField(default=0, verbose_name='已选人数'),
        ),
        migrations.AlterField(
            model_name='course',
            name='code',
            field=models.CharField(max_length=32, verbose_name='课程代码'),
        ),
        migrations.AlterField(
            model_name='course',
            name='name',
            field=models.CharField(max_length=64, verbose_name='课程名称'),
        ),
        migrations.AlterField(
            model_name='course',
            name='place',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='上课地点'),
        ),
        migrations.AlterField(
            model_name='course',
            name='school',
            field=models.CharField(max_length=32, verbose_name='开课院系'),
        ),
        migrations.AlterField(
            model_name='course',
            name='score',
            field=models.FloatField(blank=True, default=0, null=True, verbose_name='分数'),
        ),
        migrations.AlterField(
            model_name='course',
            name='time',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='上课时间'),
        ),
        migrations.AlterField(
            model_name='sc',
            name='score',
            field=models.FloatField(blank=True, default=0, null=True, verbose_name='分数'),
        ),
        migrations.AlterField(
            model_name='sc',
            name='type',
            field=models.CharField(max_length=32, verbose_name='类型'),
        ),
    ]