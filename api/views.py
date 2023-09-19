from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.db.models import Prefetch
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request


# Create your views here.
class ShiftView(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()


class ProductionLineView(viewsets.ModelViewSet):
    serializer_class = ProductionLineSerializer

    def get_queryset(self):
        queryset = ProductionLine.objects.all()
        area = self.request.query_params.get('area')
        cell = self.request.query_params.get('cell')
        date = self.request.query_params.get('date')
        number = self.request.query_params.get('number')

        if area is not None and cell is not None and date is not None and number is not None:
            queryset = (queryset.filter(area=area, cell=cell).
                        prefetch_related(Prefetch('shift', queryset=Shift.objects.filter(number=number, date=date))))
        return queryset


class MachineView(viewsets.ModelViewSet):
    serializer_class = MachineSerializer

    def get_queryset(self):
        queryset = Machine.objects.all()
        line = self.request.query_params.get('line')

        if line is not None:
            queryset = queryset.filter(line=line)
        return queryset


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
    queryset = ProductionInfo.objects.all().order_by('minute')
    serializer_class = ProductionInfoSerializer


class ScrapView(viewsets.ModelViewSet):
    queryset = Scrap.objects.all()
    serializer_class = ScrapSerializer


class DowntimeView(viewsets.ModelViewSet):
    queryset = Downtime.objects.all()
    serializer_class = DowntimeSerializer

    def get_queryset(self):
        queryset = Downtime.objects.all()
        shift = self.request.query_params.get('shift')

        if shift is not None:
            queryset = (queryset.filter(shift=shift))
        return queryset
