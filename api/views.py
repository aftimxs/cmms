from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *


# Create your views here.
class ShiftView(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer

    def get_queryset(self):
        queryset = Shift.objects.all()
        shift_number = self.request.query_params.get('shift_number')
        date = self.request.query_params.get('date')
        if shift_number is not None and date is not None:
            queryset = queryset.filter(shift_number=shift_number, date=date)
        return queryset


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
