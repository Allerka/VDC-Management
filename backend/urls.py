from django.urls import path, re_path, include
from . import views
from knox import views as knox_views
from django.contrib import admin
from .admin import admin_site

urlpatterns = [
    re_path(r'^api/interface/$', views.APIView.vehicle_list),
    re_path(r'^api/interface/(?P<id>[0-9]+)$', views.APIView.vehicle_list),
    re_path(r'^api/upload/$', views.APIView.file_upload),
    re_path(r'^api/interface/subs/', views.APIView.submission_admin),
    re_path(r'^api/interface/data/', views.APIView.data_admin),
    re_path(r'^api/interface/changelog/', views.APIView.changelog),
    re_path(r'^api/interface/draft/', views.APIView.save_draft),
	re_path(r'^api/interface/data/', views.APIView.data_admin),
	re_path(r'^api/interface/flow_rate/', views.APIView.flow_rate),
    re_path(r'^auth/', include('knox.urls')),
    re_path(r'^auth/login/$', views.LoginView.as_view()),
    re_path(r'^auth/check/$', views.APIView.active_check),
    # re_path(r'auth/user/$', views.UserAPI.as_view()),
    path('', views.IndexView.as_view()),
    re_path(r'^dashboard/', views.IndexView.as_view()),
    re_path(r'^registration/', views.IndexView.as_view()),
    re_path(r'^details/', views.IndexView.as_view()),
    re_path(r'^logout/', views.IndexView.as_view()),
    re_path(r'^upload/', views.IndexView.as_view()),
    re_path(r'^login/', views.IndexView.as_view()),
    re_path(r'^admin/', views.IndexView.as_view()),
    re_path(r'^submissions/', views.IndexView.as_view()),
    re_path(r'^changelog/', views.IndexView.as_view()),
	re_path(r'^test_registration/', views.IndexView.as_view()),
    re_path(r'^data_admin/', views.IndexView.as_view()),
    path('api/admin/', admin_site.urls),
]