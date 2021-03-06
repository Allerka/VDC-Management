# Generated by Django 3.0.3 on 2020-05-06 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_auto_20200428_1638'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='emissions',
            name='cert_level',
            field=models.CharField(choices=[('EPA Tier 2', (('bin2', 'Tier 2 Bin 2'), ('bin3', 'Tier 2 Bin 3'), ('bin4', 'Tier 2 Bin 4'), ('bin5', 'Tier 2 Bin 5'), ('bin5_int', 'Tier 2 Bin 5 Int'), ('bin6', 'Tier 2 Bin 6'), ('bin6_int', 'Tier 2 Bin 6 Int'), ('bin7', 'Tier 2 Bin 7'), ('bin7_int', 'Tier 2 Bin 7 Int'), ('bin8', 'Tier 2 Bin 8'), ('bin8_int', 'Tier 2 Bin 8 Int'))), ('EPA Tier 3', (('bin20', 'Tier 3 Bin 20'), ('bin30', 'Tier 3 Bin 30'), ('bin50', 'Tier 3 Bin 50'), ('bin70', 'Tier 3 Bin 70'), ('bin125', 'Tier 3 Bin 125'), ('bin160', 'Tier 3 Bin 160'))), ('Euro 3', (('cl_m1', 'Cl Class M1'), ('cl_n1_1', 'CL Class N1_I'), ('cl_n1_2', 'CL Class N1_II'), ('cl_n1_3', 'CL Class N1_III'), ('pl_m1', 'Pl Class M1'), ('pl_n1_1', 'PL Class N1_I'), ('pl_n1_2', 'PL Class N1_II'), ('pl_n1_3', 'PL Class N1_III'))), ('Euro 4', (('cl_m1', 'Cl Class M1'), ('cl_n1_1', 'CL Class N1_I'), ('cl_n1_2', 'CL Class N1_II'), ('cl_n1_3', 'CL Class N1_III'), ('pl_m1', 'PL Class M1'), ('pl_n1_1', 'PL Class N1_I'), ('pl_n1_2', 'PL Class N1_II'), ('pl_n1_3', 'PL Class N1_III'))), ('Euro 5', (('5a_cl_mn1_1', '5a Cl Class M N1_I'), ('5a_cl_n1_2', '5a CL Class N1_II'), ('5a_cl_n1_3_n2', '5a CL Class N1_III N2'), ('5a_sl_mn1_1', '5a Sl Class M N1_I'), ('5a_sl_n1_2', '5a SL Class N1_II'), ('5a_sl_n1_3_n2', '5a SL Class N1_III N2'), ('5b_cl_mn1_1', '5b Cl Class M N1_I'), ('5b_cl_n1_2', '5b CL Class N1_II'), ('5b_cl_n1_3_n2', '5b CL Class N1_III N2'), ('5b_sl_mn1_1', '5b Sl Class M N1_I'), ('5b_sl_n1_2', '5b SL Class N1_II'), ('5b_sl_n1_3_n2', '5b SL Class N1_III N2'))), ('Euro 6', (('6a_cl_mn1_1', '6a Cl Class M N1_I'), ('6a_cl_n1_2', '6a CL Class N1_II'), ('6a_cl_n1_3_n2', '6a CL Class N1_III N2'), ('6a_sl_mn1_1', '6a Sl Class M N1_I'), ('6a_sl_n1_2', '6a SL Class N1_II'), ('6a_sl_n1_3_n2', '6a SL Class N1_III N2')))], max_length=15, verbose_name='Certification'),
        ),
        migrations.AlterField(
            model_name='emissions',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='requester',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='roadload',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='soaktag',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='vehicleinfo',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
