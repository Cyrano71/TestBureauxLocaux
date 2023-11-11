from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("<int:pk>/", views.detail, name="detail"),
    path("<int:pk>/update/", views.update_realstate, name="update_realstate"),
    path("create/", views.create_realstate, name="create_realstate"),
]