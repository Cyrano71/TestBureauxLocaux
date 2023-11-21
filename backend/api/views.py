from rest_framework.parsers import JSONParser
from .models import RealEstateSerializer
from django.http import HttpResponse, JsonResponse
from .models import RealEstate
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def realestate_list(request):
    if request.method == 'GET':
        realestates = RealEstate.objects.all()
        serializer = RealEstateSerializer(realestates, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RealEstateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def realestate_detail(request, pk):
    try:
        realestate = RealEstate.objects.get(pk=pk)
    except RealEstate.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RealEstateSerializer(realestate)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RealEstateSerializer(realestate, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
