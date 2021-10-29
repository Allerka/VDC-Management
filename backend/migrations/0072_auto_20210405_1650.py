# Generated by Django 3.1.5 on 2021-04-05 20:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0071_auto_20210405_1622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datahandler',
            name='cert_level',
            field=models.CharField(blank=True, choices=[('5a_ci_mn1_1', '5a CI Class M N1_I (2009)'), ('5a_ci_n1_2', '5a CI Class N1_II (2009)'), ('5a_ci_n1_3_n2', '5a CI Class N1_III N2 (2009)'), ('5a_si_mn1_1', '5a SI Class M N1_I (2009)'), ('5a_si_n1_2', '5a SI Class N1_II (2009)'), ('5a_si_n1_3_n2', '5a SI Class N1_III N2 (2009)'), ('5b_ci_mn1_1', '5b CI Class M N1_I (2011)'), ('5b_ci_n1_2', '5b CI Class N1_II (2011)'), ('5b_ci_n1_3_n2', '5b CI Class N1_III N2 (2011)'), ('5b_si_mn1_1', '5b SI Class M N1_I (2011)'), ('5b_si_n1_2', '5b SI Class N1_II (2011)'), ('5b_si_n1_3_n2', '5b SI Class N1_III N2 (2011)'), ('6a_cl_mn1_1', '6a Cl Class M N1_I (2014)'), ('6a_cl_n1_2', '6a CL Class N1_II (2014)'), ('6a_cl_n1_3_n2', '6a CL Class N1_III N2 (2014)'), ('6a_sl_mn1_1', '6a Sl Class M N1_I (2014)'), ('6a_sl_n1_2', '6a SL Class N1_II (2014)'), ('6a_sl_n1_3_n2', '6a SL Class N1_III N2 (2014)'), ('bin125', 'EPA Tier 3 Bin 125 (2017)'), ('bin160', 'EPA Tier 3 Bin 160 (2017)'), ('bin2', 'EPA Tier 2 Bin 2 (2004)'), ('bin20', 'EPA Tier 3 Bin 20 (2017)'), ('bin3', 'EPA Tier 2 Bin 3 (2004)'), ('bin30', 'EPA Tier 3 Bin 30 (2017)'), ('bin4', 'EPA Tier 2 Bin 4 (2004)'), ('bin5', 'EPA Tier 2 Bin 5 (2004)'), ('bin50', 'EPA Tier 3 Bin 50 (2017)'), ('bin5_int', 'EPA Tier 2 Bin 5 Int (2004)'), ('bin6', 'EPA Tier 2 Bin 6 (2004)'), ('bin6_int', 'EPA Tier 2 Bin 6 Int (2004)'), ('bin7', 'EPA Tier 2 Bin 7 (2004)'), ('bin70', 'EPA Tier 3 Bin 70 (2017)'), ('bin7_int', 'EPA Tier 2 Bin 7 Int (2004)'), ('bin8', 'EPA Tier 2 Bin 8 (2004)'), ('bin8_int', 'EPA Tier 2 Bin 8 Int'), ('e3_ci_m1', 'CI Class M1 (2000)'), ('e3_ci_n1_1', 'CI Class N1_I (2000)'), ('e3_ci_n1_2', 'CI Class N1_II (2000)'), ('e3_ci_n1_3', 'CI Class N1_III (2000)'), ('e3_pi_m1', 'PI Class M1 (2000)'), ('e3_pi_n1_1', 'PI Class N1_I (2000)'), ('e3_pi_n1_2', 'PI Class N1_II (2000)'), ('e3_pi_n1_3', 'PI Class N1_III (2000)'), ('e4_ci_m1', 'CI Class M1 (2005)'), ('e4_ci_n1_1', 'CI Class N1_I (2005)'), ('e4_ci_n1_2', 'CI Class N1_II (2005)'), ('e4_ci_n1_3', 'CI Class N1_III (2005)'), ('e4_pi_m1', 'PI Class M1 (2005)'), ('e4_pi_n1_1', 'PI Class N1_I (2005)'), ('e4_pi_n1_2', 'PI Class N1_II (2005)'), ('e4_pi_n1_3', 'PI Class N1_III (2005)'), ('euro3', 'Euro 3'), ('euro4', 'Euro 4'), ('euro5', 'Euro 5'), ('euro6', 'Euro 6'), ('header', 'Tier 2'), ('NONE', 'None'), ('tier3', 'Tier 3')], max_length=25, verbose_name='Certification'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='coastdown',
            field=models.CharField(choices=[('DELIVERED', 'Yes, as delivered'), ('NO', 'No'), ('NONE', 'None'), ('PROCEDURE', 'Yes, procedure attached')], default='None', max_length=20, verbose_name='Coastdown mode?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='country',
            field=models.CharField(blank=True, choices=[('EU', 'EU'), ('GTR', 'GTR 15'), ('JC08', 'Japan JC08'), ('JPN', 'Japan 1015'), ('NONE', 'None'), ('US', 'US'), ('USM', 'US Metric')], default='', max_length=10, verbose_name='Country selection'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='dyno_mode',
            field=models.CharField(blank=True, choices=[('DELIVERED', 'Yes, as delivered'), ('NO', 'No'), ('NONE', 'None'), ('PROCEDURE', 'Yes, procedure attached')], default='No', max_length=20, verbose_name='Dyno mode?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='dyno_roll',
            field=models.CharField(choices=[('AWD', '4WD'), ('FWD', 'FWD'), ('NONE', 'None'), ('RWD', 'RWD')], default='', max_length=4, verbose_name='Dyno roll configuration'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('NO', 'No'), ('NONE', 'None'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes')], default='None', max_length=10, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='fuel_type',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('CARBLEVIIIE10Prem', 'CARB LEV III E10 - Premium'), ('CARBLEVIIIE10Reg', 'CARB LEV III E10 - Regular'), ('China6E0Prem', 'China6 E0 - Premium'), ('EPADiesel2D', 'EPA Diesel 2D'), ('EPATier2E0Prem', 'EPA Tier 2 E0 - Premium'), ('EPATier2E0RegCold', 'EPA Tier 2 E0 - Regular Cold'), ('EPATier3E10Prem', 'EPA Tier 3 E10 - Premium'), ('EPATier3E10PremCold', 'EPA Tier 3 E10 - Premium Cold'), ('EPATier3E10Reg', 'EPA Tier 3 E10 - Regular'), ('EPATier3E10RegCold', 'EPA Tier 3 E10 - Regular Cold'), ('Euro6E10Prem', 'Euro6 E10 - Premium'), ('Hydrogen', 'Hydrogen'), ('NONE', 'None'), ('Other', 'Other (Please Specify)'), ('PumpE10Prem', 'Pump E10 - Premium'), ('PumpE10Reg', 'Pump E10 - Regular')], max_length=50, verbose_name='VDC fuel type'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('NO', 'No'), ('NONE', 'None'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes')], default='None', max_length=10, verbose_name='Rear tow hooks?'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('1066', 'CFR1066'), ('86', 'CFR86'), ('E3', 'Euro 3 (2000)'), ('E4', 'Euro 4 (2005)'), ('E5', 'Euro 5 (2009)'), ('E6b', 'Euro 6b (2014)'), ('E6c', 'Euro 6c'), ('E6d', 'Euro 6d (2020)'), ('E6d_T', 'Euro 6d TEMP (2017)'), ('NONE', 'None')], max_length=10, verbose_name='Regulation'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='status',
            field=models.CharField(blank=True, choices=[('APPROVE', 'Approved'), ('ARCHIVE', 'Archived'), ('DRAFT', 'Draft'), ('PENDING', 'Pending changes'), ('REJECTED', 'Rejected'), ('SUBMIT', 'Submitted')], default='SUBMIT', max_length=10, null=True, verbose_name='Current status of the vehicle entry'),
        ),
        migrations.AlterField(
            model_name='datahandler',
            name='veh_type',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('HEV', 'HEV'), ('HEV_48', 'HEV (48V)'), ('ICE', 'ICE'), ('NONE', 'None'), ('PHEV', 'PHEV')], default='None', max_length=10, verbose_name='Vehicle type'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='cert_level',
            field=models.CharField(blank=True, choices=[('5a_ci_mn1_1', '5a CI Class M N1_I (2009)'), ('5a_ci_n1_2', '5a CI Class N1_II (2009)'), ('5a_ci_n1_3_n2', '5a CI Class N1_III N2 (2009)'), ('5a_si_mn1_1', '5a SI Class M N1_I (2009)'), ('5a_si_n1_2', '5a SI Class N1_II (2009)'), ('5a_si_n1_3_n2', '5a SI Class N1_III N2 (2009)'), ('5b_ci_mn1_1', '5b CI Class M N1_I (2011)'), ('5b_ci_n1_2', '5b CI Class N1_II (2011)'), ('5b_ci_n1_3_n2', '5b CI Class N1_III N2 (2011)'), ('5b_si_mn1_1', '5b SI Class M N1_I (2011)'), ('5b_si_n1_2', '5b SI Class N1_II (2011)'), ('5b_si_n1_3_n2', '5b SI Class N1_III N2 (2011)'), ('6a_cl_mn1_1', '6a Cl Class M N1_I (2014)'), ('6a_cl_n1_2', '6a CL Class N1_II (2014)'), ('6a_cl_n1_3_n2', '6a CL Class N1_III N2 (2014)'), ('6a_sl_mn1_1', '6a Sl Class M N1_I (2014)'), ('6a_sl_n1_2', '6a SL Class N1_II (2014)'), ('6a_sl_n1_3_n2', '6a SL Class N1_III N2 (2014)'), ('bin125', 'EPA Tier 3 Bin 125 (2017)'), ('bin160', 'EPA Tier 3 Bin 160 (2017)'), ('bin2', 'EPA Tier 2 Bin 2 (2004)'), ('bin20', 'EPA Tier 3 Bin 20 (2017)'), ('bin3', 'EPA Tier 2 Bin 3 (2004)'), ('bin30', 'EPA Tier 3 Bin 30 (2017)'), ('bin4', 'EPA Tier 2 Bin 4 (2004)'), ('bin5', 'EPA Tier 2 Bin 5 (2004)'), ('bin50', 'EPA Tier 3 Bin 50 (2017)'), ('bin5_int', 'EPA Tier 2 Bin 5 Int (2004)'), ('bin6', 'EPA Tier 2 Bin 6 (2004)'), ('bin6_int', 'EPA Tier 2 Bin 6 Int (2004)'), ('bin7', 'EPA Tier 2 Bin 7 (2004)'), ('bin70', 'EPA Tier 3 Bin 70 (2017)'), ('bin7_int', 'EPA Tier 2 Bin 7 Int (2004)'), ('bin8', 'EPA Tier 2 Bin 8 (2004)'), ('bin8_int', 'EPA Tier 2 Bin 8 Int'), ('e3_ci_m1', 'CI Class M1 (2000)'), ('e3_ci_n1_1', 'CI Class N1_I (2000)'), ('e3_ci_n1_2', 'CI Class N1_II (2000)'), ('e3_ci_n1_3', 'CI Class N1_III (2000)'), ('e3_pi_m1', 'PI Class M1 (2000)'), ('e3_pi_n1_1', 'PI Class N1_I (2000)'), ('e3_pi_n1_2', 'PI Class N1_II (2000)'), ('e3_pi_n1_3', 'PI Class N1_III (2000)'), ('e4_ci_m1', 'CI Class M1 (2005)'), ('e4_ci_n1_1', 'CI Class N1_I (2005)'), ('e4_ci_n1_2', 'CI Class N1_II (2005)'), ('e4_ci_n1_3', 'CI Class N1_III (2005)'), ('e4_pi_m1', 'PI Class M1 (2005)'), ('e4_pi_n1_1', 'PI Class N1_I (2005)'), ('e4_pi_n1_2', 'PI Class N1_II (2005)'), ('e4_pi_n1_3', 'PI Class N1_III (2005)'), ('euro3', 'Euro 3'), ('euro4', 'Euro 4'), ('euro5', 'Euro 5'), ('euro6', 'Euro 6'), ('header', 'Tier 2'), ('NONE', 'None'), ('tier3', 'Tier 3')], max_length=25, verbose_name='Certification'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='coastdown',
            field=models.CharField(choices=[('DELIVERED', 'Yes, as delivered'), ('NO', 'No'), ('NONE', 'None'), ('PROCEDURE', 'Yes, procedure attached')], default='None', max_length=20, verbose_name='Coastdown mode?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='country',
            field=models.CharField(blank=True, choices=[('EU', 'EU'), ('GTR', 'GTR 15'), ('JC08', 'Japan JC08'), ('JPN', 'Japan 1015'), ('NONE', 'None'), ('US', 'US'), ('USM', 'US Metric')], default='', max_length=10, verbose_name='Country selection'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='dyno_mode',
            field=models.CharField(blank=True, choices=[('DELIVERED', 'Yes, as delivered'), ('NO', 'No'), ('NONE', 'None'), ('PROCEDURE', 'Yes, procedure attached')], default='No', max_length=20, verbose_name='Dyno mode?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='dyno_roll',
            field=models.CharField(choices=[('AWD', '4WD'), ('FWD', 'FWD'), ('NONE', 'None'), ('RWD', 'RWD')], default='', max_length=4, verbose_name='Dyno roll configuration'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='front_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('NO', 'No'), ('NONE', 'None'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes')], default='None', max_length=10, verbose_name='Front tow hooks?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='fuel_type',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('CARBLEVIIIE10Prem', 'CARB LEV III E10 - Premium'), ('CARBLEVIIIE10Reg', 'CARB LEV III E10 - Regular'), ('China6E0Prem', 'China6 E0 - Premium'), ('EPADiesel2D', 'EPA Diesel 2D'), ('EPATier2E0Prem', 'EPA Tier 2 E0 - Premium'), ('EPATier2E0RegCold', 'EPA Tier 2 E0 - Regular Cold'), ('EPATier3E10Prem', 'EPA Tier 3 E10 - Premium'), ('EPATier3E10PremCold', 'EPA Tier 3 E10 - Premium Cold'), ('EPATier3E10Reg', 'EPA Tier 3 E10 - Regular'), ('EPATier3E10RegCold', 'EPA Tier 3 E10 - Regular Cold'), ('Euro6E10Prem', 'Euro6 E10 - Premium'), ('Hydrogen', 'Hydrogen'), ('NONE', 'None'), ('Other', 'Other (Please Specify)'), ('PumpE10Prem', 'Pump E10 - Premium'), ('PumpE10Reg', 'Pump E10 - Regular')], max_length=50, verbose_name='VDC fuel type'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='rear_hooks',
            field=models.CharField(blank=True, choices=[('BOTH', 'Yes - Both Sides'), ('DRIVER', 'Yes - Driver Side'), ('NO', 'No'), ('NONE', 'None'), ('PASSENGER', 'Yes - Passenger Side'), ('YES', 'Yes')], default='None', max_length=10, verbose_name='Rear tow hooks?'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='regulation',
            field=models.CharField(blank=True, choices=[('1066', 'CFR1066'), ('86', 'CFR86'), ('E3', 'Euro 3 (2000)'), ('E4', 'Euro 4 (2005)'), ('E5', 'Euro 5 (2009)'), ('E6b', 'Euro 6b (2014)'), ('E6c', 'Euro 6c'), ('E6d', 'Euro 6d (2020)'), ('E6d_T', 'Euro 6d TEMP (2017)'), ('NONE', 'None')], max_length=10, verbose_name='Regulation'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='status',
            field=models.CharField(blank=True, choices=[('APPROVE', 'Approved'), ('ARCHIVE', 'Archived'), ('DRAFT', 'Draft'), ('PENDING', 'Pending changes'), ('REJECTED', 'Rejected'), ('SUBMIT', 'Submitted')], default='SUBMIT', max_length=10, null=True, verbose_name='Current status of the vehicle entry'),
        ),
        migrations.AlterField(
            model_name='historicaldatahandler',
            name='veh_type',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('HEV', 'HEV'), ('HEV_48', 'HEV (48V)'), ('ICE', 'ICE'), ('NONE', 'None'), ('PHEV', 'PHEV')], default='None', max_length=10, verbose_name='Vehicle type'),
        ),
        migrations.AlterField(
            model_name='historicaltests',
            name='break_off',
            field=models.CharField(blank=True, choices=[('NONE', 'None'), ('SAE J1634 PEV', 'SAE J1634 PEV'), ('SAE J1711 HEV FCT', 'SAE J1711 HEV FCT'), ('WLTP HEV CD', 'WLTP HEV CD'), ('WLTP PEV', 'WLTP PEV')], default='None', max_length=50, verbose_name='Break-off / end-of-test criterion'),
        ),
        migrations.AlterField(
            model_name='historicaltests',
            name='flow_stream',
            field=models.CharField(blank=True, choices=[('RMT', 'RMT'), ('Tunnel', 'Tunnel')], default='None', max_length=100, verbose_name='Flow Stream'),
        ),
        migrations.AlterField(
            model_name='historicaltests',
            name='test_fuel',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('CARBLEVIIIE100000029552', 'CARBLEVIIIE100000029552'), ('CARBLEVIIIE10PremFCA149223DD', 'CARBLEVIII10PremFCA149223DD'), ('CARBLEVIIIE10PremFCA150080DD', 'CARBLEVIII10PremFCA150080DD'), ('CARBLEVIIIE10PremFCA151789DD', 'CARBLEVIIIE10PremFCA151789DD'), ('CARBLEVIIIE10PremGL0503KK05', 'CARBLEVIIIE10PremGL0503KK05'), ('CARBLEVIIIE10PremTEMAS00DD29', 'CARBLEVIIIE10PremTEMAS00DD29'), ('CARBLEVIIIE10Reg0000020213', 'CARBLEVIIIE10Reg0000020213'), ('China6E0Prem13636800', 'China6E0Prem13636800'), ('CRCB0RegFEV180022', 'CRCB0RegFEV180022'), ('CRCC0PremFEV180023', 'CRCC0PremFEV180023'), ('CRCCE15PremFEV180024', 'CRCCE15PremFEV180024'), ('CRCCE30PremFEV180025', 'CRCCE30PremFEV180025'), ('EPADiesel2D13Tank3520430001', 'EPADiesel2D13Tank3520430001'), ('EPADiesel2D13Tank3635970001', 'EPADiesel2D13Tank3635970001'), ('EPADiesel2D2007FCAFK0321LT10', 'EPADiesel2D2007FCAFK0321LT10'), ('EPADiesel2D5Tank3566920001', 'EPADiesel2D5Tank3566920001'), ('EPATier2E0Prem18APU9601', 'EPATier2E0Prem18APU9601'), ('EPATier2E0Prem24799101419', 'EPATier2E0Prem24799101419'), ('EPATier2E0Prem24816101519', 'EPATier2E0Prem24816101519'), ('EPATier2E0Prem25892070920', 'EPATier2E0Prem25892070920'), ('EPATier2E0PremFCA14514600', 'EPATier2E0PremFCA14514600'), ('EPATier2E0PremFCA14629400', 'EPATier2E0PremFCA14629400'), ('EPATier2E0PremFCA14823500', 'EPATier2E0PremFCA14823500'), ('EPATier2E0PremFCA15088100', 'EPATier2E0PremFCA15088100'), ('EPATier2E0PremFCAIB0321LT10', 'EPATier2E0PremFCAIB0321LT10'), ('EPATier2E0PremMBRDNAHA1821GP10', 'EPATier2E0PremMBRDNAHA1821GP10'), ('EPATier2E0RegColdFK1421BE20', 'EPATier2E0RegColdFK1421BE20'), ('EPATier3E10Prem1319400', 'EPATier3E10Prem1319400'), ('EPATier3E10PremBosch13914800', 'EPATier3E10PremBosch13914800'), ('EPATier3E10PremBoschOld', 'EPATier3E10PremBoschOld'), ('EPATier3E10PremColdEE2421BE10', 'EPATier3E10PremColdEE2421BE10'), ('EPATier3E10PremColdFJ3121HW20', 'EPATier3E10PremColdFJ3121HW20'), ('EPATier3E10PremGH2103KG14', 'EPATier3E10PremGH2103KG14'), ('EPATier3E10PremHF2603KK03', 'EPATier3E10PremHF2603KK03'), ('EPATier3E10Reg12807100', 'EPATier3E10Reg12807100'), ('EPATier3E10Reg13109800', 'EPATier3E10Reg13109800'), ('EPATier3E10RegColdFCA14665800', 'EPATier3E10RegColdFCA14665800'), ('EPATier3E10RegColdFCA15156400', 'EPATier3E10RegColdFCA15156400'), ('EPATier3E10RegColdGA1521HW10', 'EPATier3E10RegColdGA1521HW10'), ('EPATier3E10RegColdGL032BE19', 'EPATier3E10RegColdGL032BE19'), ('EPATier3E10RegFCA14489100', 'EPATier3E10RegFCA14489100'), ('EPATier3E10RegFCA14762200', 'EPATier3E10RegFCA14762200'), ('EPATier3E10RegFCA14941200', 'EPATier3E10RegFCA14941200'), ('EPATier3E10RegFCA15105300', 'EPATier3E10RegFCA15105300'), ('EPATier3E10RegFCA15289200', 'EPATier3E10RegFCA15289200'), ('EPATier3E10RegFCA15310600', 'EPATier3E10RegFCA15310600'), ('EPATier3E10RegFCAHL1321LT20', 'EPATier3E10RegFCAHL1321LT20'), ('EPATier3E10RegGH0903T454', 'EPATier3E10RegGH0903T454'), ('EPATier3E10RegGH2203T454', 'EPATier3E10RegGH2203T454'), ('EPATier3E10RegHE2203T454', 'EPATier3E10RegHE2203T454'), ('EPATier3E10RegHE2203T454_2', 'EPATier3E10RegHE2203T454_2'), ('EPATier3E10RegUmicoreHB2021GP10', 'EPATier3E10RegUmicoreHB2021GP10'), ('EPATier3E10RegVWHL1421BE10', 'EPATier3E10RegVWHL1421BE10'), ('EPATier3E85RegFCA14774000', 'EPATier3E85RegFCA14774000'), ('Euro5E5Prem0000023551', 'Euro5E5Prem0000023551'), ('Euro5E5PremG12621GP03', 'Euro5E5PremG12621GP03'), ('Euro5PremS000087', 'Euro5PremS000087'), ('Euro6E10Prem0000024388', 'Euro6E10Prem0000024388'), ('Euro6E10Prem0000026857', 'Euro6E10Prem0000026857'), ('Euro6E10PremColdFD1021GP03', 'Euro6E10PremColdFD1021GP03'), ('Hydrogen', 'Hydrogen'), ('NoFuel', 'NoFuel'), ('PumpE10Prem', 'PumpE10Prem'), ('PumpE10Reg', 'PumpE10Reg')], default='None', max_length=100, verbose_name='Fuel type to be used'),
        ),
        migrations.AlterField(
            model_name='historicaltests',
            name='test_reg',
            field=models.CharField(blank=True, choices=[('Brazil L6', 'Brazil L6'), ('CFR1066_AC17_FEV', 'CFR1066_AC17_FEV'), ('CFR1066_Cold_FEV', 'CFR1066_Cold_FEV'), ('CFR1066_FEV', 'CFR1066_FEV'), ('CFR1066_FTPCold_FEV', 'CFR1066_FTPCold_FEV'), ('CFR1066_FTPCombo_FEV', 'CFR1066_FTPCombo_FEV'), ('CFR1066_FTP_FEV', 'CFR1066_FTP_FEV'), ('CFR1066_HEV_FEV', 'CFR1066_HEV_FEV'), ('CFR86', 'CFR86'), ('CFR86_FTP', 'CFR_86_FTP'), ('CFR86_SC03', 'CFR86_SC03'), ('Euro 3', 'Euro 3'), ('Euro 4', 'Euro 4'), ('Euro 5', 'Euro 5'), ('Euro 5 Cold', 'Euro 5 Cold'), ('Euro 6b', 'Euro 6b'), ('Euro 6c', 'Euro 6c'), ('Euro 6d Cold', 'Euro 6d Cold'), ('Euro 6d HEV', 'Euro 6d HEV'), ('Euro 6d N20', 'Euro 6d N20'), ('Euro 6d TEMP', 'Euro 6d TEMP'), ('Japan 1015', 'Japan 1015'), ('Japan JC08', 'Japan JC08'), ('WLTP 1b JP', 'WLTP 1b JP'), ('WLTP HEV', 'WLTP HEV'), ('WLTP PEV', 'WLTP PEV'), ('zzzCRF1066_BP', 'CFR1066_BP')], default='None', max_length=100, verbose_name='Regulation selection'),
        ),
        migrations.AlterField(
            model_name='historicaltests',
            name='test_type',
            field=models.CharField(blank=True, choices=[('CFO', 'CFO'), ('EmissionsTest', 'Emissions Test')], default='None', max_length=100, verbose_name='Test Type'),
        ),
        migrations.AlterField(
            model_name='procedures',
            name='name',
            field=models.CharField(blank=True, choices=[('AC17', 'AC17'), ('AnalogOutputTest', 'AnalogOutputTest'), ('BagModalTest', 'BagModalTest'), ('BEVChargeDepletion', 'BEVChargeDepletion'), ('CerSS4BagHiSpeedFCA', 'CerSS4BagHiSpeedFCA'), ('CerSS4BagHiSpeedFCAShort', 'CerSS4BagHiSpeedFCAShort'), ('CerSS4BagLoSpeedFCA', 'CerSS4BagLoSpeedFCA'), ('CerSS9BagFCA', 'CerSS9BagFCA'), ('CRC', 'CRC'), ('CVS Injection 1 Bag', 'CVS Injection 1 Bag'), ('CVS Injection 2 Bag', 'CVS Injection 2 Bag'), ('CVS Injection 3 Bag', 'CVS Injection 3 Bag'), ('CVS Injection 4 Bag', 'CVS Injection 4 Bag'), ('DieselReganPromaster', 'DieselReganPromaster'), ('DieselReganPromasterV2', 'DieselReganPromasterV2'), ('DieselRegenCycleFCA', 'DieselRegenCycleFCA'), ('ECE 15x20', 'ECE 15x20'), ('EPA 72 2 Bag', 'EPA 72 2 Bag'), ('EPA 72 2 Bag ATV', 'EPA 72 2 Bag ATV'), ('EPA 72 2 Bag Cold', 'EPA 72 2 Bag Cold'), ('EPA 72 2 Bag EngineStop', 'EPA 72 2 Bag EngineStop'), ('EPA 72 2 Bag MSS', 'EPA 72 2 Bag MSS'), ('EPA 72 2 Bag x3 Promaster', 'EPA 72 2 Bag x3 Promaster'), ('EPA 72 Single Bag x4', 'EPA 72 Single Bag x4'), ('EPA 75 2 Bag', 'EPA 75 2 Bag'), ('EPA 75 2 Bag EngineStop', 'EPA 75 2 Bag EngineStop'), ('EPA 75 3 Bag', 'EPA 75 3 Bag'), ('EPA 75 3 Bag ATV', 'EPA 75 3 Bag ATV'), ('EPA 75 3 Bag BEV', 'EPA 75 3 Bag BEV'), ('EPA 75 3 Bag EngineStop', 'EPA 75 3 Bag EngineStop'), ('EPA 75 3 Bag MSS', 'EPA 75 3 Bag MSS'), ('EPA 75 3 Bag PEMS', 'EPA 75 3 Bag PEMS'), ('EPA 75 4 Bag', 'EPA 75 4 Bag'), ('EPA 75 4 Bag EngineStop', 'EPA 75 4 Bag EngineStop'), ('EPA 75 4 Bag MSS', 'EPA 75 4 Bag MSS'), ('EPA 75 4 Bag No Soak', 'EPA 75 4 Bag No Soak'), ('EPA 75 HWFET', 'EPA 75 HWFET'), ('EPA 75 HWFET US06', 'EPA 75 HWFET US06'), ('EPA75 505s', 'EPA75 505s'), ('EPA75 505x2', 'EPA75 505x2'), ('EUDCx3 Prep', 'EUDCx3 Prep'), ('EUDCx3 Prep APPENG', 'EUDCx3 Prep APPENG'), ('Euro5RLD60kph', 'Euro5RLD60kph'), ('Euro5Type6Cold', 'Euro5Type6Cold'), ('Euro5Type6Precon', 'Euro5Type6Precon'), ('FTP4PhaseUS06Combo', 'FTP4PhaseUS06Combo'), ('FTP75HWFETCombo', 'FTP75HWFETCombo'), ('FTP75US06Corning', 'FTP75US06Corning'), ('FTP75US06Umicore', 'FTP75US06Umicore'), ('HEV CD WLTC Class3b', 'HEV CD WLTC Class3b'), ('HEV CS WLTC Class3b', 'HEV CS WLTC Class3b'), ('HillClimbTowNissan', 'HillClimbTowNissan'), ('HWFET', 'HWFET'), ('HWFET WU', 'HWFET WU'), ('HWFET WU Factory', 'HWFET WU Factory'), ('HWFET WU MSS', 'HWFET WU MSS'), ('HWFETx3', 'HWFETx3'), ('HWFETx4', 'HWFETx4'), ('IdleCo', 'IdleCo'), ('J1634ColdFTPCD', 'J1634ColdFTPCD'), ('J1634ComboUS06NoUDDS', 'J1634ComboUS06NoUDDS'), ('J1634MidChargeCombo', 'J1634MidChargeCombo'), ('J1634MidChargeComboUS06', 'J1634MidChargeComboUS06'), ('J1634MidChargeComboV2', 'J1634MidChargeComboV2'), ('J1634MidChargeComboV2Plus2xUS06', 'J1634MidChargeComboV2Plus2xUS06'), ('JAPAN 1015', 'JAPAN 1015'), ('JAPAN 11', 'JAPAN 11'), ('JC08C', 'JC08C'), ('JC08H', 'JC08H'), ('LA4US06Corning', 'LA4US06Corning'), ('LA4x2Umicore', 'LA4x2Umicore'), ('LA92', 'LA92'), ('LA92WU', 'LA92WU'), ('LA92WUNoSoak', 'LA92WUNoSoak'), ('LA92WUNoSoakMSS', 'LA92WUNoSoakMSS'), ('LA92x3NoSoak', 'LA92x3NoSoak'), ('MCT55LucidAirVIN9Lucid', 'MCT55LucidAirVIN9Lucid'), ('MCT55PorscheTaycanFEV', 'MCT55PorscheTaycanFEV'), ('MCT55TeslaModelSLucid', 'MCT55TeslaModelSLucid'), ('MCT65LucidAirVIN86Lucid', 'MCT65LucidAirVIN86Lucid'), ('MCT65LucidAirVIN86LucidEnd', 'MCT65LucidAirVIN86LucidEnd'), ('MCT65RivianR1TProdRICTAdjRivian', 'MCT65RivianR1TProdRICTAdjRivian'), ('MCT65RivianR1TVP2RICTRivian', 'MCT65RivianR1TVP2RICTRivian'), ('MCT65TeslaModel3Ford', 'MCT65TeslaModel3Ford'), ('MCT65_CSC2h', 'MCT65_CSC2h'), ('MCTAudiEtron', 'MCTAudiEtron'), ('MCTAudiEtronCold', 'MCTAudiEtronCold'), ('MCTAudiEtronShort', 'MCTAudiEtronShort'), ('MCTChevyBoltTI', 'MCTChevyBoltTI'), ('MCTColdFusionTest', 'MCTColdFusionTest'), ('MCTDynamic', 'MCTDynamic'), ('MCTDynamicx4', 'MCTDynamicx4'), ('MCTHyundaiKonalEPAVW', 'MCTHyundaiKonalEPAVW'), ('MCTNissanLeaf', 'MCTNissanLeaf'), ('MCTNissanLeafShort', 'MCTNissanLeafShort'), ('MCTPractice', 'MCTPractice'), ('MCTShort', 'MCTShort'), ('MCTTeslaModel3', 'MCTTeslaModel3'), ('MCTTeslaModel3EPAVW', 'MCTTeslaModel3EPAVW'), ('MCTTeslaModel3MPGVW', 'MCTTeslaModel3MPGVW'), ('MVEG A MT', 'MVEG A MT'), ('MVEG A MT Low Power', 'MVEG A MT Low Power'), ('MVEG AAT', 'MVEG AAT'), ('MVEG AAT Low Power', 'MVEG AAT Low Power'), ('MVEG B AT', 'MVEG B AT'), ('MVEG B AT Low Power', 'MVEG B AT Low Power'), ('MVEG B AT Low Power without DC points', 'MVEG B AT Low Power without DC points'), ('MVEG B AT Nissan', 'MVEG B AT Nissan'), ('MVEG B AT Nissan Cold', 'MVEG B AT Nissan Cold'), ('MVEG B AT without DC points', 'MVEG B AT without DC points'), ('MVEG B COLD AT', 'MVEG B COLD AT'), ('MVEG B COLD MT', 'MVEG B COLD MT'), ('MVEG B MT', 'MVEG B MT'), ('MVEG B MT Low Power', 'MVEG B MT Low Power'), ('MVEG B PREP AT', 'MVEG B PREP AT'), ('MVEG B PREP MT', 'MVEG B PREP MT'), ('NEDCRoadLoadDerivation AT', 'NEDCRoadLoadDerivation AT'), ('NEDCRoadLoadDerivation MT', 'NEDCRoadLoadDerivation MT'), ('NEDCRoadLoadDerivationShort AT', 'NEDCRoadLoadDerivationShort AT'), ('New York City Cycle', 'New York City Cycle'), ('OvernightRecord', 'OvernightRecord'), ('PEV Shorty STP', 'PEV Shorty STP'), ('PEV WLTC Class3b CCP', 'PEV WLTC Class3b CCP'), ('PEV WLTC Class3b STP example', 'PEV WLTC Class3b STP example'), ('PMBackgroundCheck', 'PMBackgroundCheck'), ('RDE1SUBARUQX50', 'RDE1SUBARUQX50'), ('RDE2SUBARUQX50', 'RDE2SUBARUQX50'), ('RDE3SUBARUQX50', 'RDE3SUBARUQX50'), ('RDE95Nissan', 'RDE95Nissan'), ('RDEHinoHighway', 'RDEHinoHighway'), ('RDEPEMSFEVRoute1', 'RDEPEMSFEVRoute1'), ('RDEPEMSFEVRoute2', 'RDEPEMSFEVRoute2'), ('RDEPEMSFEVRouteGrade', 'RDEPEMSFEVRouteGrade'), ('RDERicardo', 'RDERicardo'), ('RDESi16AG645a', 'RDESi16AG645a'), ('RDESi16aggrV2', 'RDESi16aggrV2'), ('RLD', 'RLD'), ('RunningLoss', 'RunningLoss'), ('SC03', 'SC03'), ('SC03 EngineStop', 'SC03 EngineStop'), ('SC03 WU', 'SC03 WU'), ('SC03x5', 'SC03x5'), ('ShortModalTest', 'ShortModalTest'), ('Shorty 8 Phase', 'Shorty 8 Phase'), ('Shorty P1', 'Shorty P1'), ('Shorty P1 Hotsoak P2', 'Shorty P1 Hotsoak P2'), ('Shorty P1P2 WU', 'Shorty P1P2 WU'), ('Shorty P1P2P1 Split', 'Shorty P1P2P1 Split'), ('Shorty P1P2P3P4', 'Shorty P1P2P3P4'), ('Shorty P1P2P3P4 ten phase', 'Shorty P1P2P3P4 ten phase'), ('Shorty P1P2P3P4 ten phase no soak', 'Shorty P1P2P3P4 ten phase no soak'), ('Shorty P1P2P3P4 ten phase2', 'Shorty P1P2P3P4 ten phase2'), ('Shorty P1P2SKP3', 'Shorty P1P2SKP3'), ('Shorty P1P2SKP3 EngineStop', 'Shorty P1P2SKP3 EngineStop'), ('Shorty P1SKP2SKP3', 'Shorty P1SKP2SKP3'), ('Slope120kphIdleNissan', 'Slope120kphIdleNissan'), ('SPEEDZERO', 'SPEEDZERO'), ('STEADYSTATE', 'STEADYSTATE'), ('SteadyState1200sGradeNeg8', 'SteadyState1200sGradeNeg8'), ('SteadyStateNissanAltimaUSCAR', 'SteadyStateNissanAltimaUSCAR'), ('STEADYSTATEQX50', 'STEADYSTATEQX50'), ('TransFluidColdStartGM', 'TransFluidColdStartGM'), ('TransFluidColdStartGM2', 'TransFluidColdStartGM2'), ('TransFluidColdStartGM3', 'TransFluidColdStartGM3'), ('UDDS HD', 'UDDS HD'), ('US06', 'US06'), ('US06 EngineStop', 'US06 EngineStop'), ('US06 MSS', 'US06 MSS'), ('US06 SB WU', 'US06 SB WU'), ('US06 SB WU MSS', 'US06 SB WU MSS'), ('US06 SB WU USPS', 'US06 SB WU USPS'), ('US06 Split', 'US06 Split'), ('US06 Split EngineStop', 'US06 Split EngineStop'), ('US06 Split WU', 'US06 Split WU'), ('US06 US06 Split', 'US06 US06 Split'), ('US06 WU', 'US06 WU'), ('US06 WU USPS', 'US06 WU USPS'), ('US06DynamicOnly', 'US06DynamicOnly'), ('US06WUx2', 'US06WUx2'), ('US06x2LA4x2Corning', 'US06x2LA4x2Corning'), ('WLTC BW', 'WLTC BW'), ('WLTC BW NoPhases', 'WLTC BW NoPhases'), ('WLTC BW Phases', 'WLTC BW Phases'), ('WLTC Class1', 'WLTC Class1'), ('WLTC Class2', 'WLTC Class2'), ('WLTC Class3a', 'WLTC Class3a'), ('WLTC Class3a 3 Bag', 'WLTC Class3a 3 Bag'), ('WLTC Class3b', 'WLTC Class3b'), ('WLTC Class3b 3 Bag', 'WLTC Class3b 3 Bag'), ('WLTC Class3b MSS', 'WLTC Class3b MSS'), ('WLTC Class3b PlusCity', 'WLTC Class3b PlusCity'), ('WLTPDepletion100ProscheTaycanFEV', 'WLTPDepletion100ProscheTaycanFEV'), ('WLTPDepletion100TeslaModel3Ford', 'WLTPDepletion100TeslaModel3Ford'), ('zCerSSFCA', 'zCerSSFCA'), ('zCertSSShortFCA', 'zCertSSShortFCA')], default='None', max_length=100, verbose_name='Test Procedure name'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='break_off',
            field=models.CharField(blank=True, choices=[('NONE', 'None'), ('SAE J1634 PEV', 'SAE J1634 PEV'), ('SAE J1711 HEV FCT', 'SAE J1711 HEV FCT'), ('WLTP HEV CD', 'WLTP HEV CD'), ('WLTP PEV', 'WLTP PEV')], default='None', max_length=50, verbose_name='Break-off / end-of-test criterion'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='flow_stream',
            field=models.CharField(blank=True, choices=[('RMT', 'RMT'), ('Tunnel', 'Tunnel')], default='None', max_length=100, verbose_name='Flow Stream'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='procedure',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='backend.procedures'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='test_fuel',
            field=models.CharField(blank=True, choices=[('BEV', 'BEV'), ('CARBLEVIIIE100000029552', 'CARBLEVIIIE100000029552'), ('CARBLEVIIIE10PremFCA149223DD', 'CARBLEVIII10PremFCA149223DD'), ('CARBLEVIIIE10PremFCA150080DD', 'CARBLEVIII10PremFCA150080DD'), ('CARBLEVIIIE10PremFCA151789DD', 'CARBLEVIIIE10PremFCA151789DD'), ('CARBLEVIIIE10PremGL0503KK05', 'CARBLEVIIIE10PremGL0503KK05'), ('CARBLEVIIIE10PremTEMAS00DD29', 'CARBLEVIIIE10PremTEMAS00DD29'), ('CARBLEVIIIE10Reg0000020213', 'CARBLEVIIIE10Reg0000020213'), ('China6E0Prem13636800', 'China6E0Prem13636800'), ('CRCB0RegFEV180022', 'CRCB0RegFEV180022'), ('CRCC0PremFEV180023', 'CRCC0PremFEV180023'), ('CRCCE15PremFEV180024', 'CRCCE15PremFEV180024'), ('CRCCE30PremFEV180025', 'CRCCE30PremFEV180025'), ('EPADiesel2D13Tank3520430001', 'EPADiesel2D13Tank3520430001'), ('EPADiesel2D13Tank3635970001', 'EPADiesel2D13Tank3635970001'), ('EPADiesel2D2007FCAFK0321LT10', 'EPADiesel2D2007FCAFK0321LT10'), ('EPADiesel2D5Tank3566920001', 'EPADiesel2D5Tank3566920001'), ('EPATier2E0Prem18APU9601', 'EPATier2E0Prem18APU9601'), ('EPATier2E0Prem24799101419', 'EPATier2E0Prem24799101419'), ('EPATier2E0Prem24816101519', 'EPATier2E0Prem24816101519'), ('EPATier2E0Prem25892070920', 'EPATier2E0Prem25892070920'), ('EPATier2E0PremFCA14514600', 'EPATier2E0PremFCA14514600'), ('EPATier2E0PremFCA14629400', 'EPATier2E0PremFCA14629400'), ('EPATier2E0PremFCA14823500', 'EPATier2E0PremFCA14823500'), ('EPATier2E0PremFCA15088100', 'EPATier2E0PremFCA15088100'), ('EPATier2E0PremFCAIB0321LT10', 'EPATier2E0PremFCAIB0321LT10'), ('EPATier2E0PremMBRDNAHA1821GP10', 'EPATier2E0PremMBRDNAHA1821GP10'), ('EPATier2E0RegColdFK1421BE20', 'EPATier2E0RegColdFK1421BE20'), ('EPATier3E10Prem1319400', 'EPATier3E10Prem1319400'), ('EPATier3E10PremBosch13914800', 'EPATier3E10PremBosch13914800'), ('EPATier3E10PremBoschOld', 'EPATier3E10PremBoschOld'), ('EPATier3E10PremColdEE2421BE10', 'EPATier3E10PremColdEE2421BE10'), ('EPATier3E10PremColdFJ3121HW20', 'EPATier3E10PremColdFJ3121HW20'), ('EPATier3E10PremGH2103KG14', 'EPATier3E10PremGH2103KG14'), ('EPATier3E10PremHF2603KK03', 'EPATier3E10PremHF2603KK03'), ('EPATier3E10Reg12807100', 'EPATier3E10Reg12807100'), ('EPATier3E10Reg13109800', 'EPATier3E10Reg13109800'), ('EPATier3E10RegColdFCA14665800', 'EPATier3E10RegColdFCA14665800'), ('EPATier3E10RegColdFCA15156400', 'EPATier3E10RegColdFCA15156400'), ('EPATier3E10RegColdGA1521HW10', 'EPATier3E10RegColdGA1521HW10'), ('EPATier3E10RegColdGL032BE19', 'EPATier3E10RegColdGL032BE19'), ('EPATier3E10RegFCA14489100', 'EPATier3E10RegFCA14489100'), ('EPATier3E10RegFCA14762200', 'EPATier3E10RegFCA14762200'), ('EPATier3E10RegFCA14941200', 'EPATier3E10RegFCA14941200'), ('EPATier3E10RegFCA15105300', 'EPATier3E10RegFCA15105300'), ('EPATier3E10RegFCA15289200', 'EPATier3E10RegFCA15289200'), ('EPATier3E10RegFCA15310600', 'EPATier3E10RegFCA15310600'), ('EPATier3E10RegFCAHL1321LT20', 'EPATier3E10RegFCAHL1321LT20'), ('EPATier3E10RegGH0903T454', 'EPATier3E10RegGH0903T454'), ('EPATier3E10RegGH2203T454', 'EPATier3E10RegGH2203T454'), ('EPATier3E10RegHE2203T454', 'EPATier3E10RegHE2203T454'), ('EPATier3E10RegHE2203T454_2', 'EPATier3E10RegHE2203T454_2'), ('EPATier3E10RegUmicoreHB2021GP10', 'EPATier3E10RegUmicoreHB2021GP10'), ('EPATier3E10RegVWHL1421BE10', 'EPATier3E10RegVWHL1421BE10'), ('EPATier3E85RegFCA14774000', 'EPATier3E85RegFCA14774000'), ('Euro5E5Prem0000023551', 'Euro5E5Prem0000023551'), ('Euro5E5PremG12621GP03', 'Euro5E5PremG12621GP03'), ('Euro5PremS000087', 'Euro5PremS000087'), ('Euro6E10Prem0000024388', 'Euro6E10Prem0000024388'), ('Euro6E10Prem0000026857', 'Euro6E10Prem0000026857'), ('Euro6E10PremColdFD1021GP03', 'Euro6E10PremColdFD1021GP03'), ('Hydrogen', 'Hydrogen'), ('NoFuel', 'NoFuel'), ('PumpE10Prem', 'PumpE10Prem'), ('PumpE10Reg', 'PumpE10Reg')], default='None', max_length=100, verbose_name='Fuel type to be used'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='test_reg',
            field=models.CharField(blank=True, choices=[('Brazil L6', 'Brazil L6'), ('CFR1066_AC17_FEV', 'CFR1066_AC17_FEV'), ('CFR1066_Cold_FEV', 'CFR1066_Cold_FEV'), ('CFR1066_FEV', 'CFR1066_FEV'), ('CFR1066_FTPCold_FEV', 'CFR1066_FTPCold_FEV'), ('CFR1066_FTPCombo_FEV', 'CFR1066_FTPCombo_FEV'), ('CFR1066_FTP_FEV', 'CFR1066_FTP_FEV'), ('CFR1066_HEV_FEV', 'CFR1066_HEV_FEV'), ('CFR86', 'CFR86'), ('CFR86_FTP', 'CFR_86_FTP'), ('CFR86_SC03', 'CFR86_SC03'), ('Euro 3', 'Euro 3'), ('Euro 4', 'Euro 4'), ('Euro 5', 'Euro 5'), ('Euro 5 Cold', 'Euro 5 Cold'), ('Euro 6b', 'Euro 6b'), ('Euro 6c', 'Euro 6c'), ('Euro 6d Cold', 'Euro 6d Cold'), ('Euro 6d HEV', 'Euro 6d HEV'), ('Euro 6d N20', 'Euro 6d N20'), ('Euro 6d TEMP', 'Euro 6d TEMP'), ('Japan 1015', 'Japan 1015'), ('Japan JC08', 'Japan JC08'), ('WLTP 1b JP', 'WLTP 1b JP'), ('WLTP HEV', 'WLTP HEV'), ('WLTP PEV', 'WLTP PEV'), ('zzzCRF1066_BP', 'CFR1066_BP')], default='None', max_length=100, verbose_name='Regulation selection'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='test_type',
            field=models.CharField(blank=True, choices=[('CFO', 'CFO'), ('EmissionsTest', 'Emissions Test')], default='None', max_length=100, verbose_name='Test Type'),
        ),
        migrations.AlterField(
            model_name='tests',
            name='vehicle',
            field=models.ForeignKey(limit_choices_to={'status': 'APPROVE'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='backend.datahandler'),
        ),
    ]
