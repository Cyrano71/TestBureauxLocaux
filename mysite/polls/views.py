from django.http import HttpResponse
from .models import RealEstate
import json 
from django.contrib.auth import authenticate

def index(request):
    if "HTTP_AUTHORIZATION" not in request.META or request.META["HTTP_AUTHORIZATION"] != "Bearer my_token":
        return HttpResponse('Unauthorized', status=401)
    latest_realstate_list = RealEstate.objects.order_by("-pub_date")[:5]
    data = list(latest_realstate_list.values())
    print(data)
    return HttpResponse(data, content_type="application/json")
    
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

def detail(request, realstate_id):
    if "HTTP_AUTHORIZATION" not in request.META or request.META["HTTP_AUTHORIZATION"] != "Bearer my_token":
        return HttpResponse('Unauthorized', status=401)
    print(realstate_id)
    data = RealEstate.objects.filter(pk=realstate_id)
    return HttpResponse(list(data.values()), content_type="application/json")