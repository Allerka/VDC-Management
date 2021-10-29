# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import date
import os
import sys, traceback
import regex

from django.conf import settings
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand
from django.db import connections
from django.db import models

from backend.models import FieldChoices

help = "Manually run various tasks"

class Command(BaseCommand):
	
	def handle(self, *args, **options):
		# timestamp = date.today().strftime("%Y-%m-%d")
		# list = ['AC17','AnalogOutputTest','BagModalTest','BEVChargeDepletion','CerSS4BagHiSpeedFCA','CerSS4BagHiSpeedFCAShort','CerSS4BagLoSpeedFCA','CerSS9BagFCA','CRC','CVS Injection 1 Bag','CVS Injection 2 Bag','CVS Injection 3 Bag','CVS Injection 4 Bag','DieselReganPromaster','DieselReganPromasterV2','DieselRegenCycleFCA','ECE 15x20','EPA 72 2 Bag','EPA 72 2 Bag ATV','EPA 72 2 Bag Cold','EPA 72 2 Bag EngineStop','EPA 72 2 Bag MSS','EPA 72 2 Bag x3 Promaster','EPA 72 Single Bag x4','EPA 75 2 Bag','EPA 75 2 Bag EngineStop','EPA 75 3 Bag','EPA 75 3 Bag ATV','EPA 75 3 Bag BEV','EPA 75 3 Bag EngineStop','EPA 75 3 Bag MSS','EPA 75 3 Bag PEMS','EPA 75 4 Bag','EPA 75 4 Bag EngineStop','EPA 75 4 Bag MSS','EPA 75 4 Bag No Soak','EPA 75 HWFET','EPA 75 HWFET US06','EPA75 505s','EPA75 505x2','EUDCx3 Prep','EUDCx3 Prep APPENG','Euro5RLD60kph','Euro5Type6Cold','Euro5Type6Precon','FTP4PhaseUS06Combo','FTP75HWFETCombo','FTP75US06Corning','FTP75US06Umicore','HEV CD WLTC Class3b','HEV CS WLTC Class3b','HillClimbTowNissan','HWFET','HWFET WU','HWFET WU Factory','HWFET WU MSS','HWFETx3','HWFETx4','IdleCo','J1634ColdFTPCD','J1634ComboUS06NoUDDS','J1634MidChargeCombo','J1634MidChargeComboUS06','J1634MidChargeComboV2','J1634MidChargeComboV2Plus2xUS06','JAPAN 1015','JAPAN 11','JC08C','JC08H','LA4US06Corning','LA4x2Umicore','LA92','LA92WU','LA92WUNoSoak','LA92WUNoSoakMSS','LA92x3NoSoak','MCT55LucidAirVIN9Lucid','MCT55PorscheTaycanFEV','MCT55TeslaModelSLucid','MCT65_CSC2h','MCT65LucidAirVIN86Lucid','MCT65LucidAirVIN86LucidEnd','MCT65RivianR1TProdRICTAdjRivian','MCT65RivianR1TVP2RICTRivian','MCT65TeslaModel3Ford','MCTAudiEtron','MCTAudiEtronCold','MCTAudiEtronShort','MCTChevyBoltTI','MCTColdFusionTest','MCTDynamic','MCTDynamicx4','MCTHyundaiKonalEPAVW','MCTNissanLeaf','MCTNissanLeafShort','MCTPractice','MCTShort','MCTTeslaModel3','MCTTeslaModel3EPAVW','MCTTeslaModel3MPGVW','MVEG AAT','MVEG AAT Low Power','MVEG A MT','MVEG A MT Low Power','MVEG B AT','MVEG B AT Low Power','MVEG B AT Low Power without DC points','MVEG B AT Nissan','MVEG B AT Nissan Cold','MVEG B AT without DC points','MVEG B COLD AT','MVEG B COLD MT','MVEG B MT','MVEG B MT Low Power','MVEG B PREP AT','MVEG B PREP MT','NEDCRoadLoadDerivation AT','NEDCRoadLoadDerivation MT','NEDCRoadLoadDerivationShort AT','New York City Cycle','OvernightRecord','PEV Shorty STP','PEV WLTC Class3b CCP','PEV WLTC Class3b STP example','PMBackgroundCheck','RDE1SUBARUQX50','RDE2SUBARUQX50','RDE3SUBARUQX50','RDE95Nissan','RDEHinoHighway','RDEPEMSFEVRoute1','RDEPEMSFEVRoute2','RDEPEMSFEVRouteGrade','RDERicardo','RDESi16AG645a','RDESi16aggrV2','RLD','RunningLoss','SC03','SC03 EngineStop','SC03 WU','SC03x5','ShortModalTest','Shorty 8 Phase','Shorty P1','Shorty P1 Hotsoak P2','Shorty P1P2 WU','Shorty P1P2P1 Split','Shorty P1P2P3P4','Shorty P1P2P3P4 ten phase','Shorty P1P2P3P4 ten phase no soak','Shorty P1P2P3P4 ten phase2','Shorty P1P2SKP3','Shorty P1P2SKP3 EngineStop','Shorty P1SKP2SKP3','Slope120kphIdleNissan','SPEEDZERO','STEADYSTATE','SteadyState1200sGradeNeg8','SteadyStateNissanAltimaUSCAR','STEADYSTATEQX50','TransFluidColdStartGM','TransFluidColdStartGM2','TransFluidColdStartGM3','UDDS HD','US06','US06 EngineStop','US06 MSS','US06 SB WU','US06 SB WU MSS','US06 SB WU USPS','US06 Split','US06 Split EngineStop','US06 Split WU','US06 US06 Split','US06 WU','US06 WU USPS','US06DynamicOnly','US06WUx2','US06x2LA4x2Corning','WLTC BW','WLTC BW NoPhases','WLTC BW Phases','WLTC Class1','WLTC Class2','WLTC Class3a','WLTC Class3a 3 Bag','WLTC Class3b','WLTC Class3b 3 Bag','WLTC Class3b MSS','WLTC Class3b PlusCity','WLTPDepletion100ProscheTaycanFEV','WLTPDepletion100TeslaModel3Ford','zCerSSFCA','zCertSSShortFCA',
		# ]
		
		
		for entry in list:
			output, created = FieldChoices.objects.update_or_create(
			value=entry, 
			label=entry,
			defaults={'field_name': 'procedure'},
			)
			print(output)

		

		return 

		