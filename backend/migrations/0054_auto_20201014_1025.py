# Generated by Django 3.0.7 on 2020-10-14 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0053_auto_20201009_1130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='deleted_by',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='User who deleted the entry'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('86', 'Cfr86'), ('1066', 'Cfr1066'), ('E3', 'Euro3'), ('E4', 'Euro4'), ('E5', 'Euro5'), ('E6b', 'Euro6B'), ('E6c', 'Euro6C'), ('E6d_T', 'Euro6D Temp'), ('E6d', 'Euro6D'), ('None', 'None')], max_length=10, verbose_name='Regulation'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='upload',
            field=models.FileField(blank=True, upload_to='uploads/%Y/%m/'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='deleted_by',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='User who deleted the entry'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('86', 'Cfr86'), ('1066', 'Cfr1066'), ('E3', 'Euro3'), ('E4', 'Euro4'), ('E5', 'Euro5'), ('E6b', 'Euro6B'), ('E6c', 'Euro6C'), ('E6d_T', 'Euro6D Temp'), ('E6d', 'Euro6D'), ('None', 'None')], max_length=10, verbose_name='Regulation'),
        ),
    ]
