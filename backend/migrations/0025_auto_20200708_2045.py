# Generated by Django 3.0.7 on 2020-07-08 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0024_auto_20200615_1013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadload',
            name='coastdown',
            field=models.CharField(choices=[('Yes, procedure attached', 'Procedure'), ('Yes, as delivered', 'Delivered'), ('No', 'No')], max_length=25, verbose_name='Coastdown mode?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='dyno_mode',
            field=models.CharField(choices=[('Yes, procedure attached', 'Procedure'), ('Yes, as delivered', 'Delivered'), ('No', 'No')], max_length=25, verbose_name='Dyno mode?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('Yes - Driver Side', 'Driver'), ('Yes - Passenger Side', 'Passenger'), ('Yes - Both Sides', 'Both'), ('No', 'Nffo')], max_length=20, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('Yes - Driver Side', 'Driver'), ('Yes - Passenger Side', 'Passenger'), ('Yes - Both Sides', 'Both'), ('No', 'Nffo')], max_length=20, verbose_name='Rear tow hooks?'),
        ),
    ]
