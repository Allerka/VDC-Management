# Generated by Django 3.0.7 on 2020-10-21 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0057_historicalfieldchoices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='cert_level',
            field=models.CharField(blank=True, choices=[('header', 'Tier 2'), ('bin2', 'EPA Tier 2 Bin 2 (2004)'), ('bin3', 'EPA Tier 2 Bin 3 (2004)'), ('bin4', 'EPA Tier 2 Bin 4 (2004)'), ('bin5', 'EPA Tier 2 Bin 5 (2004)'), ('bin5_int', 'EPA Tier 2 Bin 5 Int (2004)'), ('bin6', 'EPA Tier 2 Bin 6 (2004)'), ('bin6_int', 'EPA Tier 2 Bin 6 Int (2004)'), ('bin7', 'EPA Tier 2 Bin 7 (2004)'), ('bin7_int', 'EPA Tier 2 Bin 7 Int (2004)'), ('bin8', 'EPA Tier 2 Bin 8 (2004)'), ('bin8_int', 'EPA Tier 2 Bin 8 Int'), ('bin20', 'EPA Tier 3 Bin 20 (2017)'), ('bin30', 'EPA Tier 3 Bin 30 (2017)'), ('bin50', 'EPA Tier 3 Bin 50 (2017)'), ('bin70', 'EPA Tier 3 Bin 70 (2017)'), ('bin125', 'EPA Tier 3 Bin 125 (2017)'), ('bin160', 'EPA Tier 3 Bin 160 (2017)'), ('e3_ci_m1', 'CI Class M1 (2000)'), ('e3_ci_n1_1', 'CI Class N1_I (2000)'), ('e3_ci_n1_2', 'CI Class N1_II (2000)'), ('e3_ci_n1_3', 'CI Class N1_III (2000)'), ('e3_pi_m1', 'PI Class M1 (2000)'), ('e3_pi_n1_1', 'PI Class N1_I (2000)'), ('e3_pi_n1_2', 'PI Class N1_II (2000)'), ('e3_pi_n1_3', 'PI Class N1_III (2000)'), ('e4_ci_m1', 'CI Class M1 (2005)'), ('e4_ci_n1_1', 'CI Class N1_I (2005)'), ('e4_ci_n1_2', 'CI Class N1_II (2005)'), ('e4_ci_n1_3', 'CI Class N1_III (2005)'), ('e4_pi_m1', 'PI Class M1 (2005)'), ('e4_pi_n1_1', 'PI Class N1_I (2005)'), ('e4_pi_n1_2', 'PI Class N1_II (2005)'), ('e4_pi_n1_3', 'PI Class N1_III (2005)'), ('5a_ci_mn1_1', '5a CI Class M N1_I (2009)'), ('5a_ci_n1_2', '5a CI Class N1_II (2009)'), ('5a_ci_n1_3_n2', '5a CI Class N1_III N2 (2009)'), ('5a_si_mn1_1', '5a SI Class M N1_I (2009)'), ('5a_si_n1_2', '5a SI Class N1_II (2009)'), ('5a_si_n1_3_n2', '5a SI Class N1_III N2 (2009)'), ('5b_ci_mn1_1', '5b CI Class M N1_I (2011)'), ('5b_ci_n1_2', '5b CI Class N1_II (2011)'), ('5b_ci_n1_3_n2', '5b CI Class N1_III N2 (2011)'), ('5b_si_mn1_1', '5b SI Class M N1_I (2011)'), ('5b_si_n1_2', '5b SI Class N1_II (2011)'), ('5b_si_n1_3_n2', '5b SI Class N1_III N2 (2011)'), ('6a_cl_mn1_1', '6a Cl Class M N1_I (2014)'), ('6a_cl_n1_2', '6a CL Class N1_II (2014)'), ('6a_cl_n1_3_n2', '6a CL Class N1_III N2 (2014)'), ('6a_sl_mn1_1', '6a Sl Class M N1_I (2014)'), ('6a_sl_n1_2', '6a SL Class N1_II (2014)'), ('6a_sl_n1_3_n2', '6a SL Class N1_III N2 (2014)'), ('NONE', 'None')], max_length=25, verbose_name='Certification'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='dyno_roll',
            field=models.CharField(choices=[('FWD', 'FWD'), ('RWD', 'RWD'), ('AWD', '4WD'), ('NONE', 'None')], default='', max_length=4, verbose_name='Dyno roll configuration'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes'), ('NO', 'No'), ('NONE', 'None')], default='None', max_length=10, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes'), ('NO', 'No'), ('NONE', 'None')], default='None', max_length=10, verbose_name='Rear tow hooks?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('86', 'CFR 86'), ('1066', 'CFR 1066'), ('E3', 'Euro 3 (2000)'), ('E4', 'Euro 4 (2005)'), ('E5', 'Euro 5 (2009)'), ('E6b', 'Euro 6b (2014)'), ('E6c', 'Euro 6c'), ('E6d_T', 'Euro 6d TEMP (2017)'), ('E6d', 'Euro 6d (2020)'), ('NONE', 'None')], max_length=10, verbose_name='Regulation'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='status',
            field=models.CharField(blank=True, choices=[], default='SUBMIT', max_length=10, null=True, verbose_name='Current status of the vehicle entry'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='wheelbase',
            field=models.CharField(blank=True, max_length=10, verbose_name='Wheelbase size'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='cert_level',
            field=models.CharField(blank=True, choices=[('header', 'Tier 2'), ('bin2', 'EPA Tier 2 Bin 2 (2004)'), ('bin3', 'EPA Tier 2 Bin 3 (2004)'), ('bin4', 'EPA Tier 2 Bin 4 (2004)'), ('bin5', 'EPA Tier 2 Bin 5 (2004)'), ('bin5_int', 'EPA Tier 2 Bin 5 Int (2004)'), ('bin6', 'EPA Tier 2 Bin 6 (2004)'), ('bin6_int', 'EPA Tier 2 Bin 6 Int (2004)'), ('bin7', 'EPA Tier 2 Bin 7 (2004)'), ('bin7_int', 'EPA Tier 2 Bin 7 Int (2004)'), ('bin8', 'EPA Tier 2 Bin 8 (2004)'), ('bin8_int', 'EPA Tier 2 Bin 8 Int'), ('bin20', 'EPA Tier 3 Bin 20 (2017)'), ('bin30', 'EPA Tier 3 Bin 30 (2017)'), ('bin50', 'EPA Tier 3 Bin 50 (2017)'), ('bin70', 'EPA Tier 3 Bin 70 (2017)'), ('bin125', 'EPA Tier 3 Bin 125 (2017)'), ('bin160', 'EPA Tier 3 Bin 160 (2017)'), ('e3_ci_m1', 'CI Class M1 (2000)'), ('e3_ci_n1_1', 'CI Class N1_I (2000)'), ('e3_ci_n1_2', 'CI Class N1_II (2000)'), ('e3_ci_n1_3', 'CI Class N1_III (2000)'), ('e3_pi_m1', 'PI Class M1 (2000)'), ('e3_pi_n1_1', 'PI Class N1_I (2000)'), ('e3_pi_n1_2', 'PI Class N1_II (2000)'), ('e3_pi_n1_3', 'PI Class N1_III (2000)'), ('e4_ci_m1', 'CI Class M1 (2005)'), ('e4_ci_n1_1', 'CI Class N1_I (2005)'), ('e4_ci_n1_2', 'CI Class N1_II (2005)'), ('e4_ci_n1_3', 'CI Class N1_III (2005)'), ('e4_pi_m1', 'PI Class M1 (2005)'), ('e4_pi_n1_1', 'PI Class N1_I (2005)'), ('e4_pi_n1_2', 'PI Class N1_II (2005)'), ('e4_pi_n1_3', 'PI Class N1_III (2005)'), ('5a_ci_mn1_1', '5a CI Class M N1_I (2009)'), ('5a_ci_n1_2', '5a CI Class N1_II (2009)'), ('5a_ci_n1_3_n2', '5a CI Class N1_III N2 (2009)'), ('5a_si_mn1_1', '5a SI Class M N1_I (2009)'), ('5a_si_n1_2', '5a SI Class N1_II (2009)'), ('5a_si_n1_3_n2', '5a SI Class N1_III N2 (2009)'), ('5b_ci_mn1_1', '5b CI Class M N1_I (2011)'), ('5b_ci_n1_2', '5b CI Class N1_II (2011)'), ('5b_ci_n1_3_n2', '5b CI Class N1_III N2 (2011)'), ('5b_si_mn1_1', '5b SI Class M N1_I (2011)'), ('5b_si_n1_2', '5b SI Class N1_II (2011)'), ('5b_si_n1_3_n2', '5b SI Class N1_III N2 (2011)'), ('6a_cl_mn1_1', '6a Cl Class M N1_I (2014)'), ('6a_cl_n1_2', '6a CL Class N1_II (2014)'), ('6a_cl_n1_3_n2', '6a CL Class N1_III N2 (2014)'), ('6a_sl_mn1_1', '6a Sl Class M N1_I (2014)'), ('6a_sl_n1_2', '6a SL Class N1_II (2014)'), ('6a_sl_n1_3_n2', '6a SL Class N1_III N2 (2014)'), ('NONE', 'None')], max_length=25, verbose_name='Certification'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='dyno_roll',
            field=models.CharField(choices=[('FWD', 'FWD'), ('RWD', 'RWD'), ('AWD', '4WD'), ('NONE', 'None')], default='', max_length=4, verbose_name='Dyno roll configuration'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes'), ('NO', 'No'), ('NONE', 'None')], default='None', max_length=10, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes'), ('NO', 'No'), ('NONE', 'None')], default='None', max_length=10, verbose_name='Rear tow hooks?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('86', 'CFR 86'), ('1066', 'CFR 1066'), ('E3', 'Euro 3 (2000)'), ('E4', 'Euro 4 (2005)'), ('E5', 'Euro 5 (2009)'), ('E6b', 'Euro 6b (2014)'), ('E6c', 'Euro 6c'), ('E6d_T', 'Euro 6d TEMP (2017)'), ('E6d', 'Euro 6d (2020)'), ('NONE', 'None')], max_length=10, verbose_name='Regulation'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='status',
            field=models.CharField(blank=True, choices=[], default='SUBMIT', max_length=10, null=True, verbose_name='Current status of the vehicle entry'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='wheelbase',
            field=models.CharField(blank=True, max_length=10, verbose_name='Wheelbase size'),
        ),
    ]
