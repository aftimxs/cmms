from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.db.models import Prefetch


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
        shift_number = self.request.query_params.get('shift_number')

        if area is not None and cell is not None and date is not None and shift_number is not None:
            queryset = (queryset.filter(area=area, cell=cell).
                        prefetch_related(Prefetch('shift', queryset=Shift.objects.filter(shift_number=shift_number, date=date))))
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
    queryset = ProductionInfo.objects.all()
    serializer_class = ProductionInfoSerializer


class ScrapView(viewsets.ModelViewSet):
    queryset = Scrap.objects.all()
    serializer_class = ScrapSerializer


class DowntimeView(viewsets.ModelViewSet):
    queryset = Downtime.objects.all()
    serializer_class = DowntimeSerializer
