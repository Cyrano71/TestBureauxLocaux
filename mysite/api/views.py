from django.http import HttpResponse
from .models import RealEstate
import json 
from django.contrib.auth import authenticate

cutom_token = "my_token"

def guard(request):
    if "HTTP_AUTHORIZATION" not in request.META or request.META["HTTP_AUTHORIZATION"] != "Bearer " + cutom_token:
        return True
    return False

import datetime 
  
def serialize_datetime(obj): 
    if isinstance(obj, datetime.datetime): 
        return obj.isoformat() 
    raise TypeError("Type not serializable") 
    
def index(request):
    if guard(request):
        return HttpResponse('Unauthorized', status=401)
    latest_realstate_list = RealEstate.objects.order_by("-pub_date")[:5]
    data = list(latest_realstate_list.values('id', 'title')) 
    return HttpResponse(json.dumps(data), content_type="application/json")
    
def login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    username = body['username']
    password = body['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        response = HttpResponse(json.dumps({"token" : cutom_token}), content_type="application/json")
    else:
        response = HttpResponse('Unauthorized', status=401)
    return response

def detail(request, pk):
    if guard(request):
        return HttpResponse('Unauthorized', status=401)
    data = RealEstate.objects.filter(pk=pk)
    return HttpResponse(json.dumps(list(data.values()),default=serialize_datetime), content_type="application/json")

def update_realstate(request, pk):
    if guard(request):
        return HttpResponse('Unauthorized', status=401)
    try: 
        realstate = RealEstate.objects.get(pk=pk) 
    except Exception: 
        return HttpResponse({'message': 'The Reak state does not exist'}, status=400) 
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    for key in body:
        setattr(realstate, key, body[key])
    realstate.save()
    return HttpResponse("Success") 
 
def create_realstate(request):
    if guard(request):
        return HttpResponse('Unauthorized', status=401)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    required_elts = ["title", "addresse", "transaction_type", "realty_type", "pub_date"]
    for elt in required_elts:
        if elt not in body:
               return HttpResponse(json.dumps({"message": f'Invalid Request: missing {elt}'}), status=400)
    realestate = RealEstate.create(body["title"], 
                              body["addresse"], 
                              body["transaction_type"],
                              body["realty_type"],
                              body["pub_date"])
    realestate.save()
    return HttpResponse("Success") 