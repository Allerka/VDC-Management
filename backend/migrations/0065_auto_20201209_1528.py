# Generated by Django 3.0.7 on 2020-12-09 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0064_auto_20201124_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='spreadsheet',
            field=models.FilePathField(blank=True, path='/home/hudson/vdc-management/uploads/%Y/%m/', recursive=True),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='spreadsheet',
            field=models.FilePathField(blank=True, path='/home/hudson/vdc-management/uploads/%Y/%m/', recursive=True),
        ),
    ]