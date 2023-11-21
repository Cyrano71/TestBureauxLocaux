from .serializers import RealEstateSerializer
from .models import RealEstate
from rest_framework import generics
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import permissions

class RealEstateList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = RealEstate.objects.all()
    serializer_class = RealEstateSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RealEstateDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = RealEstate.objects.all()
    serializer_class = RealEstateSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer