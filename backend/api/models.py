from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

RENTAL = "Rental"
SALE = "Sale"
TRANSACTION_TYPES = [(RENTAL, "rental"), (SALE, "sale")]
OFFICE = "Office"
LAND_PLOT = "Land Plot"
WAREHOUSE = "Warehouse"
RETAIL = "Retail"
COWORKING = "Coworking"
REALTY_TYPES = [(OFFICE, "office"), (LAND_PLOT, "land plot"), (WAREHOUSE, "warehouse"),
                (RETAIL, "retail"), (COWORKING, "coworking")]

class RealEstate(models.Model):
    title = models.CharField(max_length=200)
    addresse = models.CharField(max_length=200)
    transaction_type = models.CharField(
        max_length=200, choices=TRANSACTION_TYPES)
    realty_type = models.CharField(max_length=200, choices=REALTY_TYPES)
    pub_date = models.DateTimeField("date published")


class RealEstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstate
        fields = ['id', 'title', 'addresse', 'transaction_type', 'realty_type', 'pub_date']


class UserAuth(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    token = models.CharField(max_length=228)
    expiration_date = models.DateTimeField()
