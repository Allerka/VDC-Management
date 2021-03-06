# Generated by Django 3.0.7 on 2020-09-23 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0044_auto_20200923_1310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='status',
            field=models.CharField(blank=True, choices=[('SUBMIT', 'Submitted'), ('REJECT', 'Rejected'), ('PEND', 'Pending'), ('APPROVE', 'Approved')], default='SUBMIT', max_length=10, verbose_name='Current status of the vehicle entry'),
        ),
    ]
