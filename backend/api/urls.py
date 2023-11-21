from django.urls import path

from . import views

urlpatterns = [
    path('realstates/<int:pk>/', views.realestate_detail),
    path('realstates/', views.realestate_list)
]