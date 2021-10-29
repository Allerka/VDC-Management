# Generated by Django 3.0.7 on 2020-09-22 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0039_auto_20200921_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadload',
            name='coastdown',
            field=models.CharField(choices=[('Procedure', 'Yes, procedure attached'), ('Delivered', 'Yes, as delivered'), ('No', 'No')], default='', max_length=10, verbose_name='Coastdown mode?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='country',
            field=models.CharField(blank=True, choices=[('US', 'Us'), ('USM', 'US Metric'), ('EU', 'Eu'), ('GTR', 'GTR 15'), ('JPN', 'Japan 1015'), ('JC08', 'Japan JC08'), ('', 'None')], default='', max_length=10, verbose_name='Country selection'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='d_rings',
            field=models.BooleanField(default=False, verbose_name='D-Rings present?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='dyno_roll',
            field=models.CharField(choices=[('FWD', 'Fwd'), ('RWD', 'Rwd'), ('4WD', 'Awd'), ('', 'None')], default='', max_length=3, verbose_name='Dyno roll configuration'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('Driver', 'Yes - Driver Side'), ('Passenger', 'Yes - Passenger Side'), ('Both', 'Yes - Both Sides'), ('Yes', 'Yes'), ('No', 'No'), ('', 'None')], default='', max_length=10, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('Driver', 'Yes - Driver Side'), ('Passenger', 'Yes - Passenger Side'), ('Both', 'Yes - Both Sides'), ('Yes', 'Yes'), ('No', 'No'), ('', 'None')], default='', max_length=10, verbose_name='Rear tow hooks?'),
        ),
        migrations.AlterField(
            model_name='soaktag',
            name='fuel_cap',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=4, verbose_name='Fuel capacity'),
        ),
        migrations.AlterField(
            model_name='vehicleinfo',
            name='charge_num',
            field=models.CharField(blank=True, max_length=30, verbose_name='Complete project/charge #'),
        ),
    ]