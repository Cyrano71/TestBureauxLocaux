import datetime

from django.db import models
from django.utils import timezone

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
        # do something with the book
        return realestate

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")
    def __str__(self):
        return self.question_text
    
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)



class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text