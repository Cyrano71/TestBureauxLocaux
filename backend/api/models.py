from django.db import models

class RealEstate(models.Model):
    title = models.CharField(max_length=200)
    addresse = models.CharField(max_length=200)
    transaction_type = models.CharField(max_length=200)
    realty_type = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    @classmethod
    def create(cls, title, addresse, transaction_type, realty_type, pub_date):
        realestate = cls(title=title, 
                         addresse=addresse, 
                         transaction_type=transaction_type, 
                         realty_type=realty_type, 
                         pub_date=pub_date)
        return realestate