from django.db import models
from django.contrib.auth.models import User

class RealEstate(models.Model):
    title = models.CharField(max_length=200)
    addresse = models.CharField(max_length=200)
    transaction_type = models.CharField(max_length=200)
    realty_type = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    @classmethod
    def create(cls, title, addresse, transaction_type, realty_type, pub_date):
        return cls(title, 
                         addresse, 
                         transaction_type, 
                         realty_type, 
                         pub_date)
    
class UserAuth(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    token = models.CharField(max_length=228)
    expiration_date = models.DateTimeField()

    @classmethod
    def create(cls, user_id, token, expiration_date) :
        return cls(user_id, token, expiration_date)