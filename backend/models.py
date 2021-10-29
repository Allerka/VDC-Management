import datetime
from django.db import models
from django.db.models.deletion import DO_NOTHING
from django.utils.translation import gettext_lazy as _
from django.contrib import auth
from simple_history.models import HistoricalRecords
from django.conf import settings
import os


# class FuelInfo(models.Model):
#     id = models.AutoField(primary_key=True, unique=True)
#     density = models.DecimalField("Fuel density", max_digits=2, decimal_places=1)
#     carbon = models.DecimalField("Carbon rate", max_digits=4, decimal_places=1)
#     caloric = models.CharField("Caloric power", max_length=10)
#     h_rate = models.DecimalField("H-Rate", max_digits=6, decimal_places=3)
#     o_rate = models.DecimalField("O-Rate", max_digits=6, decimal_places=3)
#     updated = models.DateField("Last updated", auto_now=True)
#     active = models.BooleanField("Visible entry?", default=True)
#     deleted_at = models.CharField("Entry soft-delete date", max_length=50)
#     deleted_by = models.CharField("User who deleted the entry", max_length=50)


class FieldChoices(models.Model):
	field_name_choices = (
		('veh_type', 'Vehicle Type'),
		('fuel_type', 'Fuel Type'),
		('regulation', 'Regulation'),
		('cert_level', 'Certification Level'),
		('marmon', 'Marmon Distance'),
		('dyno_roll', 'Dyno Roll Mode'),
		('mode', 'Mode Selection'),
		('hooks', 'Front/Rear Hooks'),
		('country', 'Country'),
		('massUS', 'Vehicle Mass (Standard)'),
		('etwUS', 'Test Mass (Standard)'),
		('massUSM', 'Vehicle Mass (Metric)'),
		('etwUSM', 'Test Mass (Metric)'),
		('status', 'Submission Status'),
		('procedure', 'Test Procedure'),
		('shift_list', 'Shift List'),
		('test_config', 'Test Configuration'),
		('sample_config', 'Sample Line Configuration'),
		('test_reg', 'Test Regulation'),
		('test_fuel', 'Test Fuel Type'),
		('pollutant', 'Pollutant Limits'),
		('channel', 'Channel Set'),
		('sao_offset', 'SAO Offset'),
		('check_type', 'Idle Check Type'),
		('coast_config', 'Coastdown Configuration'),
		('flow_stream', 'Flow Stream'),
		('test_type', 'Test Type'),
		('flow_rates', 'Flow Rate Samples'),
		('break_off', 'Break-off/End-of-Test Criterion'),
	)
	id = models.AutoField(primary_key=True, unique=True)
	field_name = models.CharField("Form field name", max_length=255, choices=field_name_choices)
	value = models.CharField("Internal storage value", max_length=255)
	label = models.CharField("Displayed name", max_length=255)
	history = HistoricalRecords()

	class Meta:
		unique_together = ['field_name', 'value', 'label']
		verbose_name_plural = "Field Choices"

	def get_options(field_name):
		data = FieldChoices.objects.filter(field_name=field_name)
		options = []
		for entry in data:
			options.append((entry.value, entry.label))
		return options


class DataHandler(models.Model):
	id = models.AutoField(primary_key=True, unique=True)
	spreadsheet = models.FileField(upload_to='uploads/%Y/%m/', blank=True, null=True, max_length=255)
	# upload = models.FileField(upload_to='uploads/%Y/%m/', blank=True, max_length=None)
	status = models.CharField("Current status of the vehicle entry", max_length=10, choices=FieldChoices.get_options('status'), default='SUBMIT', blank=True, null=True)
	anyone = models.BooleanField("Can any FEV employee see this vehicle?", default=True)
	staff = models.BooleanField("Can 'is_staff' users (VDC team) see this vehicle?", default=True)
	superuser = models.BooleanField("Can 'superuser' (Admins) users see this vehicle?", default=True)
	active = models.BooleanField("Active entry?", default=True)

	r_name = models.CharField("Name of requester", max_length=50)
	r_email = models.EmailField("Requester's e-mail", blank=True)
	r_phone = models.CharField("Requester's phone number", max_length=12, blank=True)
	r_mobile = models.CharField("Requester's mobile (if different)", max_length=12, blank=True)
	t_name = models.CharField("Name of testing engineer", max_length=50, blank=True)
	t_email = models.EmailField("Tester's e-mail", max_length=50, blank=True)
	t_phone = models.CharField("Tester's phone number", max_length=12, blank=True)

	year = models.PositiveSmallIntegerField("Model Year")
	make = models.CharField("Make ", max_length=50, blank=True)
	model = models.CharField("Model ", max_length=50, blank=True)
	identifier = models.CharField("Additional Naming", max_length=50, blank=True)
	color = models.CharField("Exterior Color", max_length=20, blank=True)
	customer = models.CharField("Customer", max_length=50, blank=True)
	test_name = models.CharField("Test Vehicle Naming", max_length=100)
	vin = models.CharField("Vehicle VIN", max_length=17, blank=True)
	veh_type = models.CharField("Vehicle type", max_length=10, choices=FieldChoices.get_options('veh_type'), blank=True, default='None')
	f_pressure = models.DecimalField("Front tire pressure", max_digits=5, decimal_places=2, blank=True)
	r_pressure = models.DecimalField("Rear tire pressure", max_digits=5, decimal_places=2, blank=True)
	fuel_type = models.CharField("VDC fuel type", max_length=50, choices=FieldChoices.get_options('fuel_type'), blank=True)
	# for connecting to cert portal later. Maybe. #
	# fuel_type = models.ForeignKey(FuelInfo, to_field='id', on_delete=models.DO_NOTHING, limit_choices_to={'active': True}, verbose_name="VDC fuel type")
	fuel_type_other = models.CharField("Other fuel type", max_length=50, blank=True)
	fuel_cap = models.DecimalField("Fuel capacity", max_digits=4, decimal_places=1, blank=True)

	regulation = models.CharField("Regulation", max_length=10, choices=FieldChoices.get_options('regulation'), blank=True)
	cert_level = models.CharField("Certification", max_length=25, choices=FieldChoices.get_options('cert_level'), blank=True)
	eng_family = models.CharField("Engine family", max_length=100, blank=True)
	emi_family = models.CharField("Emission family", max_length=100, blank=True)
	eng_out = models.BooleanField("Engine out/Feedgas/Precat", default=False)
	cat_mid = models.BooleanField("Catalyst Midbed", default=False)
	tail_post = models.BooleanField("Tailpipe/Postcat", default=False)
	marmon = models.DecimalField("Marmon flange size", max_digits=2, decimal_places=1, blank=True)
	marmon_distance = models.DecimalField("Dual flange distance", max_digits=6, decimal_places=2, default=0, blank=True)
	usable_bat = models.DecimalField("Usable battery energy", max_digits=6, decimal_places=2, blank=True)
	nom_bat = models.DecimalField("Nominal battery voltage", max_digits=6, decimal_places=2, blank=True)
	all_range = models.DecimalField("All-electric range", max_digits=6, decimal_places=2, blank=True)
	cscm = models.CharField("CSCm Distance", max_length=10, blank=True)

	country = models.CharField("Country selection", max_length=10, choices=FieldChoices.get_options('country'), blank=True, default='')
	mass_usa = models.CharField("Mass (EPA)", max_length=10, blank=True)
	inertia = models.BooleanField("Inertia table lookup?", default=False)
	test_mass_usa = models.DecimalField("Test mass (EPA)", max_digits=12, decimal_places=8, blank=True)
	mass_ro = models.PositiveSmallIntegerField("MassRO", blank=True)
	mass_coc = models.PositiveSmallIntegerField("Mass #13 - 75kg", blank=True)
	test_mass_eu = models.DecimalField("Test mass (EU/COC)", max_digits=12, decimal_places=6, blank=True)
	coeff1 = models.DecimalField("Target coeff A", max_digits=10, decimal_places=4, blank=True)
	coeff2 = models.DecimalField("Target coeff B", max_digits=10, decimal_places=6, blank=True)
	coeff3 = models.DecimalField("Target coeff C", max_digits=10, decimal_places=7, blank=True)
	cold_co1 = models.DecimalField("Cold Target Coeff A", max_digits=10, decimal_places=2, blank=True)
	cold_co2 = models.DecimalField("Cold Target Coeff B", max_digits=10, decimal_places=4, blank=True)
	cold_co3 = models.DecimalField("Cold Target Coeff C", max_digits=10, decimal_places=5, blank=True)
	wheelbase = models.CharField("Wheelbase size", max_length=10, blank=True)
	dyno_mode = models.CharField("Dyno mode?", max_length=20, choices=FieldChoices.get_options('mode'), blank=True, default='No')
	coastdown = models.CharField("Coastdown mode?", max_length=20, choices=FieldChoices.get_options('mode'), default='None')
	dyno_roll = models.CharField("Dyno roll configuration", max_length=4, choices=FieldChoices.get_options('dyno_roll'), default='')
	d_rings = models.BooleanField("D-Rings present?", default=False)
	front_hooks = models.CharField("Front tow hooks?", max_length=10, blank=True, choices=FieldChoices.get_options('hooks'), default='None')
	front_alt = models.CharField("Alternate front tie-down", max_length=100, blank=True)
	rear_hooks = models.CharField("Rear tow hooks?", max_length=10, blank=True, choices=FieldChoices.get_options('hooks'), default='None')
	rear_alt = models.CharField("Alternate rear tie-down", max_length=100, blank=True)
	desc = models.CharField("Additional notes", max_length=512, blank=True)
	
	charge_num = models.CharField("Complete project/charge #", max_length=50, blank=True)
	license = models.CharField("Vehicle license #", max_length=10, blank=True)
	displacement = models.DecimalField("Engine Displacement", max_digits=4, decimal_places=1, blank=True)
	cylinders = models.PositiveSmallIntegerField("Number of cylinders")
	transmission = models.CharField("Transmission type", max_length=20, blank=True)
	gears = models.PositiveSmallIntegerField("Number of gears")
	updated = models.DateField("Last updated", auto_now=True)
	deleted_at = models.DateField("Entry soft-delete date", blank=True, null=True)
	deleted_by = models.CharField("User who deleted the entry", max_length=50, blank=True, null=True)

	history = HistoricalRecords()
	# changed_by = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)

	# @property
	# def _history_user(self):
	#     return self.changed_by

	# @_history_user.setter
	# def _history_user(self, value):
	#     self.changed_by = value


class ErrorCodes(models.Model):
	id = models.AutoField(primary_key=True, unique=True)
	location = models.CharField("Associated class or function where the error happens", max_length=50)
	message = models.CharField("Error message to be returned to the user", max_length=255)


class Procedures(models.Model):
	id = models.AutoField(primary_key=True, unique=True)
	name = models.CharField("Test Procedure name", max_length=100, blank=True, choices=FieldChoices.get_options('procedure'), default='None')
	length = models.PositiveSmallIntegerField("Sample length")
	

class Tests(models.Model):
	id = models.AutoField(primary_key=True, unique=True)
	active = models.BooleanField("Active entry?", default=True)
	test_name = models.CharField("Reference name for the test", max_length=100)

	# Custom Fields
	fan_coeff_1 = models.PositiveSmallIntegerField("Fan Coefficient A")
	fan_coeff_2 = models.PositiveSmallIntegerField("Fan Coefficient B")
	fan_coeff_3 = models.PositiveSmallIntegerField("Fan Coefficient C")
	dilution = models.BooleanField("Dilution Air Heater")
	flow_stream = models.CharField("Flow Stream", max_length=100, blank=True, choices=FieldChoices.get_options('flow_stream'), default='None')
	heat_exchange = models.BooleanField("Heat Exchanger")
	test_type = models.CharField("Test Type", max_length=100, blank=True, choices=FieldChoices.get_options('test_type'), default='None')


	# Settings
	procedure = models.ForeignKey(Procedures, on_delete=models.DO_NOTHING, null=True)
	shift_list = models.CharField("Shift List", max_length=100, blank=True, choices=FieldChoices.get_options('shift_list'), default='None')
	test_config = models.CharField("Test Configuration", max_length=100, blank=True, choices=FieldChoices.get_options('test_config'), default='None')
	sample_config = models.CharField("Sample Line Configuration", max_length=100, blank=True, choices=FieldChoices.get_options('sample_config'), default='None')
	test_reg = models.CharField("Regulation selection", max_length=100, blank=True, choices=FieldChoices.get_options('test_reg'), default='None')
	test_fuel = models.CharField("Fuel type to be used", max_length=100, blank=True, choices=FieldChoices.get_options('test_fuel'), default='None')
	vehicle = models.ForeignKey(DataHandler, on_delete=DO_NOTHING, limit_choices_to={'status': 'APPROVE'}, null=True)
	pollutant = models.CharField("Pollutant Limits", max_length=100, blank=True, choices=FieldChoices.get_options('pollutant'), default='None')
	channel = models.CharField("Channel Set", max_length=100, blank=True, choices=FieldChoices.get_options('channel'), default='None')

	sao_offset = models.CharField("SAO Offset", max_length=100, blank=True, choices=FieldChoices.get_options('sao_offset'), default='None')
	post_export = models.BooleanField("Run export after test?")
	post_report = models.BooleanField("Run report after test?")
	idle_check = models.BooleanField("Run idle check?")
	check_type = models.CharField("Idle check type", max_length=100, blank=True, choices=FieldChoices.get_options('check_type'), default='None')
	idle_high = models.PositiveSmallIntegerField("Idle high minimum value (rpm)")
	skip_first = models.BooleanField("Skip first bag pair?")
	repeat = models.BooleanField("Prompt to repeat test proceudre?")
	break_time = models.PositiveSmallIntegerField("Maximum break time (min)")
	auto_select = models.BooleanField("Auto select bag pairs?")
	bag_read = models.BooleanField("Wait for bag reads?")
	dump_time = models.PositiveSmallIntegerField("Bag pair dump duration (s)")
	side_leak = models.BooleanField("Run vacuum side leak check?")
	hang_up = models.BooleanField("Run hang-up check?")
	blower = models.BooleanField("Run CVS blower?")
	chassis = models.BooleanField("Control chassis dynamometer?")
	road_verify = models.BooleanField("Run road load verification?")
	road_adjust = models.BooleanField("Run road load adjustment?")
	coast_config = models.CharField("Coastdown Configuration", max_length=25, blank=True, choices=FieldChoices.get_options('coast_config'), default='None')
	gradient = models.BooleanField("Control gradient demand?")


	# Flow Rates
	per_sample = models.BooleanField("Set individual sample rates?")
	all_samples = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
	samples = models.CharField("Individual sample rates, stored as a string until JSON support is added", max_length=255, blank=True, null=True)

	# Electrified Vehicles
	recharged = models.BooleanField("Enter recharged electrical energy after test")
	break_off = models.CharField("Break-off / end-of-test criterion", max_length=50, blank=True, choices=FieldChoices.get_options('break_off'), default='None')

	# RDE+
	# dyno_mode = models.
	pre_speed = models.SmallIntegerField("Pre-pull away speed (km/h)", blank=True, default=0)
	pre_time = models.SmallIntegerField("Pre-pull away time (s)", blank=True, default=0)
	ahead_speed = models.SmallIntegerField("Look ahead speed (s)", blank=True, default=0)
	ahead_throttle = models.SmallIntegerField("Look ahead throttle position (s)", blank=True, default=0)
	ahead_clutch = models.SmallIntegerField("Look ahead clutch position (s)", blank=True, default=0)
	ahead_brake = models.SmallIntegerField("Look ahead brake position (s)", blank=True, default=0)

	history = HistoricalRecords()


# dummy class
class Vehicle(models.Model):
	id = models.AutoField(primary_key=True, unique=True)
	make = models.CharField("manufacturer of the vehicle", max_length=30)
	model = models.CharField("vehicle model", max_length=100)
	year = models.PositiveSmallIntegerField("model year or year of manufacture")
	color = models.CharField("color of the vehicle", max_length=30)
	vin = models.CharField("vehicle VIN", max_length=30, unique=True)
	# requester = models.ForeignKey(Requester, related_name='requester', to_field='id', on_delete=models.CASCADE)

	def __str__(self):
		return '%s, %s, %s, %s, %s, %s' % (self.id, self.make, self.model, self.year, self.color, self.vin)


# class User(auth.models.User):
#     active = models.BooleanField()