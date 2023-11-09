from django.contrib import admin

from .models import Question
from .models import RealEstate

admin.site.register(Question)
admin.site.register(RealEstate)