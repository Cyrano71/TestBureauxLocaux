from django.http import HttpResponse
from .models import RealEstate, UserAuth
from datetime import datetime
from datetime import timezone
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import re
import json

def guard(request):
    if "HTTP_AUTHORIZATION" not in request.META:
        return (False, "No authorization header in the request")
    x = re.search("Bearer (.*)", request.META["HTTP_AUTHORIZATION"])
    if not x:
        return (False, "authorization header should be of the form : Bearer \{yourtoken\}")
    try: 
          person = UserAuth.objects.get(token=x.group(1)) 
    except Exception: 
        return (False, "unknown token")
    
    now = datetime.now(timezone.utc)
    if now > person.expiration_date:
        return (False, "your token is expired, please log in to get a new one")

    return (True, "")

def login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    username = body['username']
    password = body['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        expiration = datetime.utcfromtimestamp(refresh.payload["exp"])
        token = str(refresh.access_token)
        person = UserAuth.create(refresh.payload['user_id'], 
                               token, 
                               expiration)
        person.save()
        response = HttpResponse(json.dumps({"token" : token}), content_type="application/json")
    else:
        response = HttpResponse('Failed to authenticate the user: wrong username or password', status=401)
    return response  

def index(request):
    (is_valid, error_message) = guard(request)
    if not is_valid:
        return HttpResponse('Unauthorized : ' + error_message, status=401)
    latest_realstate_list = RealEstate.objects.order_by("-pub_date")
    data = list(latest_realstate_list.values('id', 'title')) 
    return HttpResponse(json.dumps(data), content_type="application/json")

def serialize_datetime(obj): 
    if isinstance(obj, datetime): 
        return obj.isoformat() 
    raise TypeError("Type not serializable") 

def detail(request, pk):
    (is_valid, error_message) = guard(request)
    if not is_valid:
        return HttpResponse('Unauthorized : ' + error_message, status=401)
    data = RealEstate.objects.filter(pk=pk)
    return HttpResponse(json.dumps(list(data.values()),default=serialize_datetime), content_type="application/json")

def update_realstate(request, pk):
    (is_valid, error_message) = guard(request)
    if not is_valid:
        return HttpResponse('Unauthorized : ' + error_message, status=401)
    try: 
        realstate = RealEstate.objects.get(pk=pk) 
    except Exception: 
        return HttpResponse({'message': 'The Real estate does not exist'}, status=400) 
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    for key in body:
        setattr(realstate, key, body[key])
    realstate.save()
    return HttpResponse("Success") 
 
def create_realstate(request):
    (is_valid, error_message) = guard(request)
    if not is_valid:
        return HttpResponse('Unauthorized : ' + error_message, status=401)
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