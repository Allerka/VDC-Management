import logging
from django.contrib import admin
from django import forms
from django.db.models import F
from django.contrib.auth.models import User
from .models import FieldChoices

logger = logging.getLogger(__name__)


class BackendAdmin(admin.AdminSite):
	site_header = "VDC Management"
	site_title = "VDC Management"
	index_title = "Dashboard"
	site_url = "/vdc/management/"



# class FieldChoicesForm(forms.ModelForm):
# 	class Meta:
# 		fields = ['field_name', 'value', 'label']

class FieldChoicesAdmin(admin.ModelAdmin):
	list_display = ('field_name', 'value', 'label')
	# readonly_fields = ['field_name']
	# form = FieldChoicesForm
	# formfield_overrides = {
	# 	'field_name' : {'widget': forms.ChoiceField(FieldChoices.admin_choices())}
	# }
	fields = ('field_name', ('value', 'label'))


class UserAdmin(admin.ModelAdmin):
	list_display = ('username', 'last_name', 'first_name', 'email', 'is_active', 'is_staff', 'is_superuser')
	fieldsets = (
		('Basic Info', {
			'fields': ('username', 'last_name', 'first_name', 'email')
		}),
		('Permissions', {
			'fields': ('is_active', 'is_staff', 'is_superuser')
		}),
	)

admin_site = BackendAdmin(name='admin')
admin_site.register(FieldChoices, FieldChoicesAdmin)
admin_site.register(User, UserAdmin)
# admin_site.register(FieldChoicesAdmin)
# BackendAdmin.register(FieldChoices, FieldChoicesAdmin)