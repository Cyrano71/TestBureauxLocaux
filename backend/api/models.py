from django.db import models

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
    owner = models.ForeignKey('auth.User', related_name='real_estates', on_delete=models.CASCADE)