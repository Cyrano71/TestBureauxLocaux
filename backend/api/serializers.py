from django.contrib.auth.models import User
from rest_framework import serializers
from .models import RealEstate

class RealEstateSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = RealEstate
        fields = ['id', 'title', 'addresse', 'transaction_type', 'realty_type', 'pub_date', "owner"]

class UserSerializer(serializers.ModelSerializer):
    real_estates = serializers.PrimaryKeyRelatedField(many=True, queryset=RealEstate.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'real_estates']