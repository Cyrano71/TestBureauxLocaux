from django.http import HttpResponse
from .models import Question
from django.shortcuts import render
import json 
from django.contrib.auth import authenticate

def index(request):
    if "HTTP_AUTHORIZATION" not in request.META or request.META["HTTP_AUTHORIZATION"] != "Bearer my_token":
        return HttpResponse('Unauthorized', status=401)
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
    
def login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    username = body['username']
    password = body['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        return HttpResponse({"token": "my_token"})
    else:
        return HttpResponse('Unauthorized', status=401)

def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)