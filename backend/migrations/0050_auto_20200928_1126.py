# Generated by Django 3.0.7 on 2020-09-28 15:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0049_auto_20200928_1035'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='datahandler',
            name='changed_by',
        ),
        migrations.RemoveField(
            model_name='historicaldatahandler',
            name='changed_by',
        ),
    ]
