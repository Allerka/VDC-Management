import React from 'react';
import { ListSubheader, MenuItem } from "@material-ui/core";

const formData = {
	r_name: '',
	r_email: '',
	r_phone: '',
	r_mobile: '',
	t_name: '',
	t_email: '',
	t_phone: '',
	t_is_r: false,

	year: '',
	make: '',
	model: '',
	identifier: '',
	color: '',
	customer: '',
	test_name: '',
	no_vin: false,
	vin: '',
	veh_type: 'NONE',
	f_pressure: '',
	r_pressure: '',
	fuel_type: '',
	fuel_type_other: '',
	fuel_cap: '',

	regulation: 'NONE',
	cert_level: 'NONE',
	eng_family: '',
	emi_family: '',
	eng_out: false,
	cat_mid: false,
	tail_post: false,
	marmon: 2,
	marmon_distance: '0',
	usable_bat: '0',
	nom_bat: '0',
	all_range: '0',
	cscm: '0',

	country: 'NONE',
	mass_usa: '0',
	inertia: false,
	test_mass_usa: '0',
	test_mass_eu: '0',
	mass_ro: '0',
	mass_coc: '0',
	coeff1: '0',
	coeff2: '0',
	coeff3: '0',
	cold_co1: '0',
	cold_co2: '0',
	cold_co3: '0',
	wheelbase: '0',
	dyno_mode: 'NONE',
	coastdown: 'NONE',
	dyno_roll: 'NONE',
	d_rings: true,
	front_hooks: '',
	front_alt: '',
	rear_hooks: '',
	rear_alt: '',
	desc: '',

	charge_num: '',
	license: '',
	displacement: '',
	cylinders: '',
	transmission: '',
	gears: '',
};

export const testFormData = {
	test_name: '',
	fan_coeff_1: 0,
	fan_coeff_2: 0,
	fan_coeff_3: 0,
	dilution: false,
	flow_stream: '',
	heat_exchange: false,
	test_type: '',

	procedure: '',
	shift_list: '',
	test_config: '',
	sample_config: '',
	test_reg: '',
	test_fuel: '',
	vehicle: '',
	pollutant: '',
	channel: 'VDCDyno1',

	sao_offset: '',
	post_export: true,
	post_report: true,
	idle_check: false,
	check_type: '',
	idle_high: '',
	skip_first: false,
	repeat: false,
	break_time: '',
	auto_select: false,
	bag_read: false,
	dump_time: 360,
	side_leak: false,
	hang_up: false,
	blower: true,
	chassis: true,
	road_verify: false,
	road_adjust: false,
	coast_config: 'US',
	gradient: false,

	per_sample: false,
	all_samples: '',

	recharged: false,
	break_off: '',

	pre_speed: '',
	pre_time: '',
	ahead_speed: '',
	ahead_throttle: '',
	ahead_clutch: '',
	ahead_brake: '',
};


export const certUSA = { 'NONE': 'None', 'tier2': 'Tier 2', 'bin2': 'EPA Tier 2 Bin 2 (2004)', 'bin3': 'EPA Tier 2 Bin 3 (2004)', 'bin4': 'EPA Tier 2 Bin 4 (2004)', 'bin5': 'EPA Tier 2 Bin 5 (2004)', 'bin5_int': 'EPA Tier 2 Bin 5 Int (2004)', 'bin6': 'EPA Tier 2 Bin 6 (2004)', 'bin6_int': 'EPA Tier 2 Bin 6 Int (2004)', 'bin7': 'EPA Tier 2 Bin 7 (2004)', 'bin7_int': 'EPA Tier 2 Bin 7 Int (2004)', 'bin8': 'EPA Tier 2 Bin 8 (2004)', 'bin8_int': 'EPA Tier 2 Bin 8 Int', 'tier3': 'Tier 3', 'bin20': 'EPA Tier 3 Bin 20 (2017)', 'bin30': 'EPA Tier 3 Bin 30 (2017)', 'bin50': 'EPA Tier 3 Bin 50 (2017)', 'bin70': 'EPA Tier 3 Bin 70 (2017)', 'bin125': 'EPA Tier 3 Bin 125 (2017)', 'bin160': 'EPA Tier 3 Bin 160 (2017)'
}

export const certEU = { 'NONE': 'None', 'euro3': 'Euro 3', 'e3_cl_m1': 'Cl Class M1 (2000)', 'e3_cl_n1_1': 'CL Class N1_I (2000)', 'e3_cl_n1_2': 'CL Class N1_II (2000)', 'e3_cl_n1_3': 'CL Class N1_III (2000)', 'e3_pl_m1': 'Pl Class M1 (2000)', 'e3_pl_n1_1': 'PL Class N1_I (2000)', 'e3_pl_n1_2': 'PL Class N1_II (2000)', 'e3_pl_n1_3': 'PL Class N1_III (2000)', 'euro4': 'Euro 4', 'e4_cl_m1': 'Cl Class M1 (2005)', 'e4_cl_n1_1': 'CL Class N1_I (2005)', 'e4_cl_n1_2': 'CL Class N1_II (2005)', 'e4_cl_n1_3': 'CL Class N1_III (2005)', 'e4_pl_m1': 'PL Class M1 (2005)', 'e4_pl_n1_1': 'PL Class N1_I (2005)', 'e4_pl_n1_2': 'PL Class N1_II (2005)', 'e4_pl_n1_3': 'PL Class N1_III (2005)', 'euro5': 'Euro 5', '5a_cl_mn1_1': '5a Cl Class M N1_I (2009)', '5a_cl_n1_2': '5a CL Class N1_II (2009)', '5a_cl_n1_3_n2': '5a CL Class N1_III N2 (2009)', '5a_sl_mn1_1': '5a Sl Class M N1_I (2009)', '5a_sl_n1_2': '5a SL Class N1_II (2009)', '5a_sl_n1_3_n2': '5a SL Class N1_III N2 (2009)', '5b_cl_mn1_1': '5b Cl Class M N1_I (2011)', '5b_cl_n1_2': '5b CL Class N1_II (2011)', '5b_cl_n1_3_n2': '5b CL Class N1_III N2 (2011)', '5b_sl_mn1_1': '5b Sl Class M N1_I (2011)', '5b_sl_n1_2': '5b SL Class N1_II (2011)', '5b_sl_n1_3_n2': '5b SL Class N1_III N2 (2011)', 'euro6': 'Euro 6', '6a_cl_mn1_1': '6a Cl Class M N1_I (2014)', '6a_cl_n1_2': '6a CL Class N1_II (2014)', '6a_cl_n1_3_n2': '6a CL Class N1_III N2 (2014)', '6a_sl_mn1_1': '6a Sl Class M N1_I (2014)', '6a_sl_n1_2': '6a SL Class N1_II (2014)', '6a_sl_n1_3_n2': '6a SL Class N1_III N2 (2014)' }


export const massUS = [0, 763, 888, 1013, 1138, 1263, 1388, 1513, 1638, 1763, 1888, 2013, 2138, 2263, 2388, 2513, 2638, 2763, 2888, 3013, 3138, 3263, 3388, 3513, 3638, 3826, 4076, 4326, 4576, 4826, 5076, 5451, 5951, 6451, 6951, 7451, 7951, 8451, 8951, 9451, 9951, 10451, 10951, 11451, 11951, 12451, 12951, 13451]

export const etwUS = [1000, 1125, 1250, 1375, 1500, 1625, 1750, 1875, 2000, 2125, 2250, 2375, 2500, 2625, 2750, 2875, 3000, 3125, 3250, 3375, 3500, 3750, 3875, 4000, 4025, 4500, 4750, 5000, 5250, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000]

export const massUSM = [0, 346, 403, 459, 516, 573, 630, 686, 743, 800, 856, 913, 970, 1026, 1083, 1140, 1197, 1253, 1310, 1367, 1423, 1480, 1537, 1593, 1650, 1735, 1849, 1962, 2076, 2189, 2302, 2473, 2699, 2926, 3153, 3380, 3607, 3833, 4060, 4287, 4514, 4740, 4967, 5194, 5421, 5648, 5874, 6101]

export const etwUSM = [453.59240, 510.29145, 566.99050, 623.68955, 680.38860, 737.08765, 793.78670, 850.48575, 907.18480, 963.88385, 1020.58290, 1077.28195, 1133.98100, 1190.68005, 1247.37910, 1304.07815, 1360.77720, 1417.47625, 1474.17530, 1530.87435, 1587.57340, 1644.27245, 1700.97150, 1757.67055, 1814.36960, 1927.76770, 2041.16580, 2154.56390, 2267.96200, 2381.36010, 2494.75820, 2721.55440, 2948.35060, 3175.14680, 3401.94300, 3628.73920, 3855.53540, 4082.33160, 4309.12780, 4535.92400, 4762.72020, 4989.51640, 5216.31260, 5443.10880, 5669.90500, 5896.70120, 6123.49740, 6350.29360]


export const statusChoices = {'SUBMIT': 'Submitted', 'PENDING': 'Pending Changes', 'REJECTED': 'Rejected', 'APPROVE': 'Approved', 'ARCHIVE': 'Archived', 'DRAFT': 'Draft'}

export function getStatus(status) {
    for (var entry in statusChoices) {
      if (entry === status) {
        return statusChoices[entry];
      }
    }
  };


export function pageCheck(props, step, error) {
	var fields = {};
	var fieldArr = [];
	switch(step){
		case 1:
			fields = {"r_name": true, "t_name": true, "r_email": true, "r_phone": true, "t_email": true, "t_phone": true, "r_mobile": true};
			fieldArr = [error.r_name, error.r_email, error.r_phone, error.t_name, error.t_email, error.t_phone, error.r_mobile]
			break;
		case 2:
			fields = {"model": true, "year": true, "make": true, "color": true, "customer": true, "vin": true, "veh_type": true, "f_pressure": true, "r_pressure": true, "fuel_type": true, "fuel_type_other": true, "fuel_cap": true};
			fieldArr = [error.model, error.year, error.make, error.color, error.customer, error.vin, error.veh_type, error.f_pressure, error.r_pressure, error.fuel_type, error.fuel_type_other, error.fuel_cap]
			break;
		case 3:
			fields = {"regulation": true, "cert_level": true, "eng_family": true, "emi_family": true, "eng_out": true, "cat_mid": true, "tail_post": true, "marmon": true, "marmon_distance": true, "usable_bat": true, "nom_bat": true, "all_range": true, "cscm": true};
			fieldArr = [error.regulation, error.cert_level, error.eng_family, error.emi_family, error.eng_out, error.cat_mid, error.tail_post, error.marmon, error.marmon_distance, error.usable_bat, error.nom_bat, error.all_range, error.cscm]
			break;
		case 4:
			fields = {"country": true, "mass_usa": true, "test_mass_eu": true, "mass_ro": true, "mass_coc": true, "coeff1": true, "coeff2": true, "coeff3": true, "cold_co1": true, "cold_co2": true, "cold_co3": true, "wheelbase": true, "dyno_mode": true, "coastdown": true, "dyno_roll": true, "d_rings": true, "front_hooks": true, "front_alt": true, "rear_hooks": true, "rear_alt": true, "desc": true};
			fieldArr = [error.country, error.mass_usa, error.test_mass_eu, error.mass_ro, error.mass_coc, error.coeff1, error.coeff2, error.coeff3, error.cold_co1, error.cold_co2, error.cold_co3, error.wheelbase, error.dyno_mode, error.coastdown, error.dyno_roll, error.d_rings, error.front_hooks, error.front_alt, error.rear_hooks, error.rear_alt, error.desc]
			break;
		case 5:
			fields = {"charge_num": true, "license": true, "displacement": true, "cylinders": true, "transmission": true, "gears": true};
			fieldArr = [error.charge_num, error.license, error.displacement, error.cylinders, error.transmission, error.gears]
			break;
		default:
			break;
		}
						
	props.setTouched(fields);
	return fieldArr.some(Boolean)
};

export default formData;