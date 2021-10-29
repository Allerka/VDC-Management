# Generated by Django 3.0.7 on 2020-09-18 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0032_auto_20200917_1014'),
    ]

    operations = [
        migrations.AddField(
            model_name='datahandler',
            name='upload',
            field=models.FileField(blank=True, upload_to='%Y/%m/'),
        ),
        migrations.AlterField(
            model_name='emissions',
            name='marmon_distance',
            field=models.PositiveSmallIntegerField(blank=True, default=0, verbose_name='Dual flange distance'),
        ),
    ]
