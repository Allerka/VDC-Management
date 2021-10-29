from .models import *
from .serializers import *
from .excel import UploadFileForm, bool_check
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from drf_multiple_model.views import ObjectMultipleModelAPIView
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.test import Client
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import redirect
from django.db.models import Q
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.views.generic import TemplateView
from django.http import HttpResponse
import regex
import logging
import datetime
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import make_msgid
import smtplib
from decimal import *

logger = logging.getLogger(__name__)

# Main response view
class IndexView(TemplateView):
	template_name = "react/index.html"

class LoginView(KnoxLoginView):
	permission_classes = (permissions.AllowAny, )

	@ensure_csrf_cookie
	def post(self, request, format=None):
		try:
			serializer = AuthTokenSerializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			username = serializer.validated_data['user']
			request.session['username'] = username
			logger.info(request.session['username'])
			return super(LoginView, self).post(request, format=None)
		except Exception as e:
			logger.exception(e)
			return Response(status=status.HTTP_400_BAD_REQUEST)


class APIView(ObjectMultipleModelAPIView):
	authentication_classes = [TokenAuthentication, ]
	permission_classes = [permissions.IsAuthenticated, ]

	@api_view(['GET', 'POST', 'PUT', 'DELETE'])
	def vehicle_list(request, id):
		response = HttpResponse()
		try:
			user = User.objects.get(username__icontains=str(request.user))
			admin = user.is_superuser

			# Get vehicle info
			if request.method == 'GET':
				choices = fieldChoices()
				if int(id) == 0: # Front page table
					if user.is_superuser:
						data = DataHandler.objects.filter(active=True).exclude(status='ARCHIVE')
						archive = DataHandler.objects.filter(active=True).filter(status='ARCHIVE')
					elif user.is_staff:
						data = DataHandler.objects.filter(active=True).exclude(status='ARCHIVE').filter(Q(anyone=True) | Q(staff=True))
						archive = DataHandler.objects.filter(active=True).filter(status='ARCHIVE').filter(Q(anyone=True) | Q(staff=True))
					else:
						data = DataHandler.objects.filter(active=True).exclude(status='ARCHIVE').filter(anyone=True)
						archive = DataHandler.objects.filter(active=True).filter(status='ARCHIVE').filter(anyone=True)
					dataSerializer = DataReaderSerializer(data, context={'request': request}, many=True)
					archiveSerializer = DataReaderSerializer(archive, context={'request': request}, many=True)
					for entry in dataSerializer.data:
						entry['status'] = fixLabel(entry, 'status')
					for entry in archiveSerializer.data:
						entry['status'] = fixLabel(entry, 'status')
					response.content = json.dumps({'data': dataSerializer.data, 'archive': archiveSerializer.data, 'admin': admin, 'choices': choices})
				else: # Specific vehicle info
					data = DataHandler.objects.filter(id=int(id))
					serializer = DataReaderSerializer(data, context={'request': request}, many=True)
					if serializer.data[0]['anyone']:
						serializer.data[0]['permission'] = 'ANYONE'
					elif serializer.data[0]['staff']:
						serializer.data[0]['permission'] = 'STAFF'
					else:
						serializer.data[0]['permission'] = 'ADMIN'
					# serializer.data[0]['coastdown'] = fixLabel(serializer.data[0], 'coastdown')
					# serializer.data[0]['dyno_mode'] = fixLabel(serializer.data[0], 'dyno_mode')
					# serializer.data[0]['front_hooks'] = fixLabel(serializer.data[0], 'front_hooks')
					# serializer.data[0]['rear_hooks'] = fixLabel(serializer.data[0], 'rear_hooks')
					# logger.info(serializer.data[0])
					response.content = json.dumps({'data': serializer.data, 'choices': choices, 'admin': admin})
				return response

			# Submitting vehicle/test data
			elif request.method == 'POST':
				logger.info(request.data)
				try:
					if request.data['r_name']:
						data = DataHandler.objects.all()
						data_handler = post_data(request.data)
						serializer = DataHandlerSerializer(data, data=data_handler[0], allow_null=True)
				except KeyError: # It's a test, not a vehicle
					# if request.data['procedure']:
					data = Tests.objects.all()
					data_handler = post_data(request.data)
					logger.info(data_handler)
					serializer = TestsSerializer(data, data=data_handler[0], allow_null=True)
				serializer.is_valid(raise_exception=True)
				if serializer.is_valid():
					logger.info(serializer.validated_data)
					serializer.create(serializer.validated_data)
					response.status_code = status.HTTP_201_CREATED
				else:
					response['message'] = serializer.errors
					response.status_code = status.HTTP_400_BAD_REQUEST
				return response

			# Editing/deleting vehicle data
			logger.info("PUT/DELETE detected!")
			try:
				vehicle = DataHandler.objects.get(test_name=request.data['test_name'])
			except DataHandler.DoesNotExist:
				response.status_code = status.HTTP_404_NOT_FOUND
				return response
			if admin:
				if request.method == 'PUT':
					logger.info("Update request received!")
					# request.data['upload'] = vehicle.upload
					request.data['spreadsheet'] = vehicle.spreadsheet
					# request.data['inertia'] = bool_check(request.data['inertia'])
					request.data['deleted_at'] = None
					request.data['deleted_by'] = None
					request.data['d_rings'] = bool_check(request.data['d_rings']) 
					if request.data['permission'] == 'ANYONE':
						request.data['anyone'] = True
						request.data['staff'] = True
					elif request.data['permission'] == 'STAFF':
						request.data['anyone'] = False
						request.data['staff'] = True
					else:
						request.data['anyone'] = False
						request.data['staff'] = False
					serializer = DataHandlerSerializer(vehicle, data=request.data,context={'request': request})
					if serializer.is_valid(raise_exception=True):
						logger.info("Serializer is valid!")
						object, created = DataHandler.objects.update_or_create(test_name=request.data['test_name'], defaults=serializer.validated_data)
						response.status_code = status.HTTP_204_NO_CONTENT
					else:
						response['message'] = serializer.errors
						response.status_code = status.HTTP_400_BAD_REQUEST
					return response

				elif request.method == 'DELETE':
					logger.info("Delete request received!")
					vehicle.active = False
					vehicle.deleted_at = datetime.date.today()
					vehicle.deleted_by = str(request.user)
					vehicle.save()
					response.status_code = status.HTTP_204_NO_CONTENT
			else:
				response['message'] = ErrorCodes.objects.get(id=2).message
				response.status_code = status.HTTP_403_FORBIDDEN
		except Exception as e:
			logger.exception(e)
			response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
			response['message'] = e
		return response
		
	# Uploading spreadsheets
	@api_view(['POST'])
	def file_upload(request):
		response = HttpResponse()
		try:
			user = User.objects.get(username__icontains=str(request.user))
			data = UploadFileForm.upload(request)
			if type(data) != dict:
				raise Exception
			logger.info("Data parsed!")
			data_handler = post_data(data)
			logger.info("post_data successful!")
			serializer = DataHandlerSerializer(data, data=data_handler[0], allow_null=True)
			serializer.is_valid(raise_exception=True)
			logger.info("Serializer is valid!")
			if DataHandler.objects.filter(test_name=data_handler[0]['test_name']):
				if user.is_superuser:
					logger.info("Updating existing records!")
				else:
					response['message'] = ErrorCodes.objects.get(id=2).message
					response.status_code = status.HTTP_403_FORBIDDEN
			else:
				logger.info("Creating new record!")
				# serializer.create(serializer.validated_data)
				response.status_code = status.HTTP_201_CREATED
			object, created = DataHandler.objects.update_or_create(test_name=data_handler[0]['test_name'], defaults=serializer.validated_data)
		except Exception as e:
			logger.error(e)
			response.status_code = status.HTTP_400_BAD_REQUEST
			if data and type(data) != dict:
				response['message'] = getError(data)
			else:    
				response['message'] = e
		return response

	# Editing vehicle status info
	@api_view(['GET', 'POST'])
	def submission_admin(request):
		response = HttpResponse()
		user = User.objects.get(username__icontains=str(request.user))
		if user.is_superuser:
			try:
				if request.method == 'GET':
					data = DataHandler.objects.exclude(status='APPROVE').exclude(status='ARCHIVE').filter(active=True)
					archive = DataHandler.objects.filter(status='ARCHIVE').filter(active=True)
					dataSerializer = DataReaderSerializer(data, context={'request': request}, many=True)
					archiveSerializer = DataReaderSerializer(archive, context={'request': request}, many=True)
					choices = {'status': {}}
					for item in FieldChoices.objects.filter(field_name='status'):
						choices['status'][item.value] = item.label
					return Response({'data': dataSerializer.data, 'archive': archiveSerializer.data, 'choices': choices})
				elif request.method == 'POST':
					vehicle = DataHandler.objects.get(id=request.data['id'])
					vehicle.status=request.data['status']
					vehicle.save()
					user = User.objects.get(username__icontains=str(request.user))
					sendEmail(vehicle.r_email, vehicle.test_name, vehicle.get_status_display(), request.data['comments'], user.username, user.email)
				logger.info("Status updated!")
				response.status_code = status.HTTP_204_NO_CONTENT
			except Exception as e:
				logger.error(e)
				response.status_code = status.HTTP_400_BAD_REQUEST
				response['message'] = e   
		else:
			response['message'] = ErrorCodes.objects.get(id=3).message
			response.status_code = status.HTTP_403_FORBIDDEN
		return response

	# Frontend interface for editing form choices
	@api_view(['GET', 'POST', 'DELETE'])
	def data_admin(request):
		response = HttpResponse()
		user = User.objects.get(username__icontains=str(request.user))
		if user.is_superuser:
			try:
				if request.method == 'GET':
					choices = fieldChoicesList()
					filters = FieldChoices.objects.values_list('field_name', flat=True).distinct()
					filterList = {}
					for x in filters:
						name = FieldChoices.objects.filter(field_name=x)[0].get_field_name_display()
						filterList[name] = name
					return Response({'choices': choices, 'filter': filterList})
				elif request.method == 'POST':
					for x in request.data:
						logger.info(x)
						for y in FieldChoices.field_name_choices: # converts display name back to internal value
							if y[1] == x['display_field_name']:
								field_name = y[0]
								break
						obj, created = FieldChoices.objects.update_or_create(
							id=x['id'],
							defaults={
								'field_name': field_name,
								'value': x['value'],
								'label': x['label']
							}
						)
				elif request.method == 'DELETE':
					logger.info(request.data)
					for x in request.data:
						FieldChoices.objects.get(id=x).delete()
				logger.info("Choices updated!")
				response.status_code = status.HTTP_204_NO_CONTENT
			except Exception as e:
				logger.error(e)
				response.status_code = status.HTTP_400_BAD_REQUEST
				response['message'] = e   
		else:
			response['message'] = ErrorCodes.objects.get(id=3).message
			response.status_code = status.HTTP_403_FORBIDDEN
		return response

	# Viewing the changelog in the frontend
	@api_view(['GET'])
	def changelog(request):
		logs = []
		i = -1
		list = 'fixes'
		with open(settings.BASE_DIR + '/CHANGELOG', 'r') as f:
			for line in f:
				if regex.match("^\|", line):
					i += 1
					logs.insert(i, {'title': '', 'date': '', 'fixes': [], 'changes': []})
					logs[i]['title'] = line[1:-1]
				elif regex.match("^Bug Fixes", line):
					list = 'fixes'
				elif regex.match("^Changes", line):
					list = 'changes'
				elif regex.match("^\s+-", line):
					logs[i][list].append(line[1:-1])
				elif regex.match("^\s+\*", line):
					logs[i][list].append(line[2:-1])
				elif regex.match("^[0-9]+", line):
					logs[i]['date'] = line[:-1]
				else:
					pass
		return Response({'data': logs})

	# Downloading a spreadsheet of a partially-completed submission form
	@api_view(['POST'])
	def save_draft(request):
		response = HttpResponse()
		try:
			data = post_data(request.data)
			filehandle = UploadFileForm.download(data[0])
			f = open(filehandle, 'rb')
			response = HttpResponse(f, content_type='application/vnd.ms-excel')
			response['Content-Disposition'] = 'attachment; filename=%s' % str('FEV_VDC_' + data[0]['test_name'] + '_DRAFT.xlsx')
			response['Content-Length'] = os.path.getsize(filehandle)
			response['filename'] = str('FEV_VDC_' + data[0]['test_name'] + '_DRAFT.xlsx')
			# response = FileResponse(open(filehandle, "rb"), as_attachment=True)
		except Exception as e:
			logger.exception(e)
			response['message'] = e
			response.status_code = status.HTTP_400_BAD_REQUEST
		return response

	# Basic authorization check for certain frontend processes
	@api_view(['GET'])
	def active_check(request):
		response = HttpResponse()
		user = User.objects.get(username__icontains=str(request.user))
		if user.is_superuser:
			response.status_code = status.HTTP_204_NO_CONTENT
		else:
			response.status_code = status.HTTP_403_FORBIDDEN
		return response
	
	# Special function for getting the length of a given test procedure type
	@api_view(['POST'])
	def flow_rate(request):
		response = HttpResponse()
		procedure = Procedures.objects.get(name__icontains=str(request.data['procedure']))
		response['length'] = procedure.length
		return response

# Parsing uploaded data
def post_data(data):
	try:
		data_handler = [{'spreadsheet': data['spreadsheet'], 'status': 'SUBMIT'}]
	except KeyError: # manual submission, so no spreadsheet
		data_handler = [{'spreadsheet': None, 'status': 'SUBMIT'}]
	for k, v in data.items():
		if k in ['test_mass_eu', 'test_mass_usa', 'mass_ro', 'mass_coc', 'cold_co1', 'cold_co2', 'cold_co3', 'f_pressure', 'r_pressure', 'fuel_cap', 'displacement', 'cylinders', 'gears', 'year', 'idle_high', 'break_time', 'all_samples', 'pre_speed', 'pre_time', 'ahead_speed', 'ahead_throttle', 'ahead_clutch', 'ahead_brake', 'procedure', 'vehicle']:
			if v == '':
				v = 0
		if k in ['procedure', 'vehicle']:
			data_handler[0][k] = v
			k = k + '_id'
		if k in DataHandler.objects.values()[0].keys() or k in Tests.objects.values()[0].keys():
			data_handler[0][k] = v
	try:
		data_handler[0]['test_name'] = data['make'] + data['model']
	except KeyError:
		pass
	
	# user option to omit color or customer from test_name
	try:
		if regex.search("\*$", data['color']):
			data_handler[0]['color'] = data['color'][0:-1]
		else:
			data_handler[0]['test_name'] += data['color']
		data_handler[0]['test_name'] += data['identifier']
		if regex.search("\*$", data['customer']):
			data_handler[0]['customer'] = data['customer'][0:-1]
		else:
			data_handler[0]['test_name'] += data['customer']
		data_handler[0]['active'] = True
	except KeyError:
		pass
	return data_handler

# Send emails
def sendEmail(recipients, testName, status, comments, username, email):
	timestamp = datetime.date.today().strftime("%Y-%m-%d")
	try:
		msg = MIMEMultipart("alternative")
		msg['Subject'] = "VDC Vehicle Registration Status Update"
		msg['From'] = settings.EMAIL_HOST_USER
		msg['To'] = recipients
		msg['Text'] = "Your vehicle registration submission, ID: " + testName + ", has had its status updated by user " + username + ". The new status is: " + status + ", with the included reasons/comments: '" + comments + "'. Please direct any follow-up communication to " + email + ", as this is an automated and unmonitored mailbox. Thank you."
		part1 = MIMEText(msg['Text'], 'plain')
		msg.attach(part1)

		# Send the message via local SMTP server.
		s = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
		s.starttls()
		s.ehlo()
		s.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
		s.send_message(msg)
		s.quit()
	except Exception as e:
		logger.error(e)
	return

# Retrieve field choices from the database
def fieldChoices():
	choices = {'vehicle': {}}
	fields = FieldChoices.objects.values_list('field_name', flat=True).distinct()
	for entry in fields:
		results = {}
		for item in FieldChoices.objects.filter(field_name=entry):
			results[item.value] = item.label
		choices[entry] = results
	for vehicle in DataHandler.objects.filter(active=True):
		choices['vehicle'][str(vehicle.test_name)] = vehicle.test_name
	return choices

# Listing all choices for frontend editing
def fieldChoicesList():
	choices = []
	for entry in FieldChoices.objects.all():
		results = {}
		results['id'] = entry.id
		results['field_name'] = entry.field_name
		results['display_field_name'] = entry.get_field_name_display()
		results['value'] = entry.value
		results['label'] = entry.label
		choices.append(results)
	return choices

# Fixes random issues with labels
def fixLabel(data, field):
	return FieldChoices.objects.filter(value=data[field]).values_list("label", flat=True)[0]

# Retrieves an error code from the database
def getError(data):
	message = ''
	# logger.info(data.__class__.__name__)
	if data.__class__.__name__ == 'InvalidOperation':
		message = ErrorCodes.objects.get(id=4).message
	elif data.__class__.__name__ == 'ValueError':
		message = ErrorCodes.objects.get(id=4).message
	return message
