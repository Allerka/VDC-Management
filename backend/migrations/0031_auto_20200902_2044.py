# Generated by Django 3.0.7 on 2020-09-02 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0030_auto_20200722_2222'),
    ]

    operations = [
        migrations.AddField(
            model_name='datahandler',
            name='anyone',
            field=models.BooleanField(default=True, verbose_name='Can any FEV employee see this vehicle?'),
        ),
        migrations.AddField(
            model_name='datahandler',
            name='staff',
            field=models.BooleanField(default=True, verbose_name="Can 'is_staff' users see this vehicle?"),
        ),
        migrations.AddField(
            model_name='datahandler',
            name='status',
            field=models.CharField(choices=[('SUBMIT', 'Submitted'), ('REJECT', 'Rejected'), ('PEND', 'Pending'), ('APPROVE', 'Approved')], default='SUBMIT', max_length=10, verbose_name='Current status of the vehicle entry'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datahandler',
            name='superuser',
            field=models.BooleanField(default=True, verbose_name="Can 'superuser' users see this vehicle?"),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='active',
            field=models.BooleanField(default=True, verbose_name='Active entry?'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='coeff1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, verbose_name='Target coeff A'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='coeff2',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, verbose_name='Target coeff B'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='cold_co1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, verbose_name='Cold Target Coeff A'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='cold_co2',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=10, verbose_name='Cold Target Coeff B'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='country',
            field=models.CharField(choices=[('US', 'Us'), ('USM', 'US Metric'), ('EU', 'Eu'), ('GTR', 'GTR 15'), ('JPN', 'Japan 1015'), ('JC08', 'Japan JC08')], max_length=10, verbose_name='Country selection'),
        ),
    ]