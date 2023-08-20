from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *


# Create your views here.
class ShiftView(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer


class ProductionLineView(viewsets.ModelViewSet):
    queryset = ProductionLine.objects.all()
    serializer_class = ProductionLineSerializer


class MachineView(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OperatorView(viewsets.ModelViewSet):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer


class ProductionInfoView(viewsets.ModelViewSet):
    queryset = ProductionInfo.objects.all()
    serializer_class = ProductionInfoSerializer


class ScrapView(viewsets.ModelViewSet):
    queryset = Scrap.objects.all()
    serializer_class = ScrapSerializer


class DowntimeView(viewsets.ModelViewSet):
    queryset = Downtime.objects.all()
    serializer_class = DowntimeSerializer
