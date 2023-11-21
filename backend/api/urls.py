from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('realstates/<int:pk>/', views.RealEstateDetail.as_view()),
    path('realstates/', views.RealEstateList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)