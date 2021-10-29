# Generated by Django 3.0.7 on 2020-07-08 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0025_auto_20200708_2045'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadload',
            name='coastdown',
            field=models.CharField(choices=[('P', 'Yes, procedure attached'), ('D', 'Yes, as delivered'), ('N', 'No')], max_length=1, verbose_name='Coastdown mode?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='dyno_mode',
            field=models.CharField(choices=[('P', 'Yes, procedure attached'), ('D', 'Yes, as delivered'), ('N', 'No')], max_length=1, verbose_name='Dyno mode?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('D', 'Yes - Driver Side'), ('P', 'Yes - Passenger Side'), ('B', 'Yes - Both Sides'), ('N', 'No')], max_length=1, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('D', 'Yes - Driver Side'), ('P', 'Yes - Passenger Side'), ('B', 'Yes - Both Sides'), ('N', 'No')], max_length=1, verbose_name='Rear tow hooks?'),
        ),
    ]
