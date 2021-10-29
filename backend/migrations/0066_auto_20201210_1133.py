# Generated by Django 3.0.7 on 2020-12-10 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0065_auto_20201209_1528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='spreadsheet',
            field=models.FileField(blank=True, upload_to='uploads/%Y/%m/'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='spreadsheet',
            field=models.TextField(blank=True),
        ),
    ]
