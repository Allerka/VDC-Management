from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *
from django.contrib.auth.models import User
import logging

logger = logging.getLogger(__name__)

# Custom field serializer to both read field labels and actually store new values, because both Django and DRF are dumb
class ReadWriteSerializerMethodField(serializers.Field):
    def __init__(self, method_name=None, **kwargs):
        self.method_name = method_name
        kwargs['source'] = '*'
        #kwargs['read_only'] = True
        super(ReadWriteSerializerMethodField, self).__init__(**kwargs)

    def bind(self, field_name, parent):
        self.field_name = field_name
        # In order to enforce a consistent style, we error if a redundant
        # 'method_name' argument has been used. For example:
        # my_field = serializer.SerializerMethodField(method_name='get_my_field')
        default_method_name = 'get_{field_name}'.format(field_name=field_name)
        assert self.method_name != default_method_name, (
            "It is redundant to specify `%s` on SerializerMethodField '%s' in "
            "serializer '%s', because it is the same as the default method name. "
            "Remove the `method_name` argument." %
            (self.method_name, field_name, parent.__class__.__name__)
        )

        # The method name should default to `get_{field_name}`.
        if self.method_name is None:
            self.method_name = default_method_name

        super(ReadWriteSerializerMethodField, self).bind(field_name, parent)

    def to_representation(self, value):
        method = getattr(self.parent, self.method_name)
        return method(value)

    def to_internal_value(self, data):
        return { self.field_name: data }

# Dummy serializer
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        depth = 1
        fields = '__all__'

# class RequesterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Requester
#         fields = '__all__'
#         extra_kwargs = {'id': {'required': False}}

# class SoakTagSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SoakTag
#         fields = '__all__'

# class EmissionSerializer(serializers.ModelSerializer):
#     cert_level = ReadWriteSerializerMethodField()
#     # marmon_distance = ReadWriteSerializerMethodField()
#     # marmon = ReadWriteSerializerMethodField()
#     # usable_bat = ReadWriteSerializerMethodField()
#     # nom_bat = ReadWriteSerializerMethodField()
#     # all_range = ReadWriteSerializerMethodField()
#     # cscm = ReadWriteSerializerMethodField()

#     def get_cert_level(self, obj):
#         return obj.get_cert_level_display()

#     class Meta:
#         model = Emissions
#         fields = '__all__'
#         # extra_kwargs = {'usable_bat': {'default': 0}, 'nom_bat': {'default': 0}, 'all_range': {'default': 0}, 'cscm': {'default': 0}}

# class RoadLoadSerializer(serializers.ModelSerializer):
#     # mass_usa = ReadWriteSerializerMethodField()
    
#     class Meta:
#         model = RoadLoad
#         fields = '__all__'
#         # extra_kwargs = {'mass_usa': {'default': 0}}

# class VehicleInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = VehicleInfo
#         fields = '__all__'

class DataHandlerSerializer(serializers.ModelSerializer):
    # requester = RequesterSerializer(required=False, allow_null=True)
    # soak_tag = SoakTagSerializer(required=False, allow_null=True)
    # emissions = EmissionSerializer(required=False, allow_null=True)
    # road_load = RoadLoadSerializer(required=False, allow_null=True)
    # vehicle_info = VehicleInfoSerializer(required=False, allow_null=True)
    # fuel_type = ReadWriteSerializerMethodField()
    # status = ReadWriteSerializerMethodField(required=False)
    # cert_level = ReadWriteSerializerMethodField()
    # regulation = ReadWriteSerializerMethodField()
    # dyno_mode = ReadWriteSerializerMethodField()
    # country = ReadWriteSerializerMethodField()
    # coastdown = ReadWriteSerializerMethodField()
    # front_hooks = ReadWriteSerializerMethodField()
    # rear_hooks = ReadWriteSerializerMethodField()
    
    # def get_fuel_type(self, obj):
    #     return obj.get_fuel_type_display()

    # def get_regulation(self, obj):
    #     return obj.get_regulation_display()

    # def get_cert_level(self, obj):
    #     return obj.get_cert_level_display()

    # def get_status(self, obj):
    #     return obj.get_status_display()

    # def get_dyno_mode(self, obj):
    #     return obj.get_dyno_mode_display()

    # def get_country(self, obj):
    #     return obj.get_country_display()

    # def get_country(self, obj):
    #     return obj.get_country_display()

    # def get_coastdown(self, obj):
    #     return obj.get_coastdown_display()

    # def get_front_hooks(self, obj):
    #     return obj.get_front_hooks_display()

    # def get_rear_hooks(self, obj):
    #     return obj.get_rear_hooks_display()
    
    class Meta:
        model = DataHandler
        depth = 1
        fields = '__all__'
    
    def create(self, validated_data):
        # requester_data = validated_data.pop('requester')
        # soak_tag_data = validated_data.pop('soak_tag')
        # emissions_data = validated_data.pop('emissions')
        # if emissions_data['marmon'] == 'none':
        #     emissions_data['marmon'] = 0
        # if emissions_data['marmon_distance'] == '':
        #     emissions_data['marmon_distance'] = 0
        # road_load_data = validated_data.pop('road_load')
        # vehicle_data = validated_data.pop('vehicle_info')
        return DataHandler.objects.create(**validated_data)
    
    # def update(self, object, validated_data):
    #     # requester_data = validated_data.pop('requester')
    #     # soak_tag_data = validated_data.pop('soak_tag')
    #     # emissions_data = validated_data.pop('emissions')
    #     # road_load_data = validated_data.pop('road_load')
    #     # vehicle_data = validated_data.pop('vehicle_info')
    #     return DataHandler.objects.filter(id=object.id).update(**validated_data)

class DataReaderSerializer(DataHandlerSerializer):
    # requester = RequesterSerializer(read_only=True)
    # soak_tag = SoakTagSerializer(read_only=True)
    # emissions = EmissionSerializer(read_only=True)
    # road_load = RoadLoadSerializer(read_only=True)
    # vehicle_info = VehicleInfoSerializer(read_only=True)
    # fuel_type = ReadWriteSerializerMethodField()
    # status = ReadWriteSerializerMethodField(required=False)
    # cert_level = ReadWriteSerializerMethodField()
    # regulation = ReadWriteSerializerMethodField()
    # dyno_mode = ReadWriteSerializerMethodField()
    # country = ReadWriteSerializerMethodField()
    # coastdown = ReadWriteSerializerMethodField()
    # front_hooks = ReadWriteSerializerMethodField()
    # rear_hooks = ReadWriteSerializerMethodField()
    
    # def get_fuel_type(self, obj):
    #     return obj.get_fuel_type_display()

    # def get_regulation(self, obj):
    #     return obj.get_regulation_display()

    # def get_cert_level(self, obj):
    #     return obj.get_cert_level_display()

    # def get_status(self, obj):
    #     return obj.get_status_display()

    # def get_dyno_mode(self, obj):
    #     return obj.get_dyno_mode_display()

    # def get_country(self, obj):
    #     return obj.get_country_display()

    # def get_country(self, obj):
    #     return obj.get_country_display()

    # def get_coastdown(self, obj):
    #     return obj.get_coastdown_display()

    # def get_front_hooks(self, obj):
    #     return obj.get_front_hooks_display()

    # def get_rear_hooks(self, obj):
    #     return obj.get_rear_hooks_display()

    class Meta:
        model = DataHandler
        depth = 1
        fields = '__all__'
        read_only_fields = []

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        # user = authenticate(**data)
        user = data['username']
        if user:
            return user
        raise serializers.ValidationError("Invalid credentials")

class TestsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tests
        depth = 1
        fields = '__all__'
    
    def create(self, validated_data):
        return Tests.objects.create(**validated_data)
    

class TestsReaderSerializer(DataHandlerSerializer):

    class Meta:
        model = Tests
        depth = 1
        fields = '__all__'
        read_only_fields = []



# def list_check(entry, list):
#     for item in list:
#         if item[1] == entry:
#             return item[0]
#     return

# def bool_check(entry):
#     logger.info(entry)
#     if entry == 'Yes' or 'Yes, labeled':
#         logger.info("True")
#         return True
#     else: 
#         logger.info("False")
#         return False