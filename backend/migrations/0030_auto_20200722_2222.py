# Generated by Django 3.0.7 on 2020-07-22 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0029_auto_20200722_2141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emissions',
            name='marmon',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, verbose_name='Marmon flange size'),
        ),
    ]