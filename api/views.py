from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *


# Create your views here.
class ShiftView(generics.ListCreateAPIView):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer


class ProductionLineView(generics.ListCreateAPIView):
    queryset = ProductionLine.objects.all()
    serializer_class = ProductionLineSerializer