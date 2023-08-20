from rest_framework import serializers
from .models import *


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('id', 'number', 'date', 'start', 'end')


class ProductionLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionLine
        fields = ('id', 'area', 'cell', 'working_shift')


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ('id', 'name', 'code', 'status', 'make', 'machine_model', 'serial', 'line')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'part_num', 'rate', 'total_quantity')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'target_per_hour', 'quantity', 'products', 'line')


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = ('id', 'first_name', 'last_name', 'worker_number', 'working_machine', 'full_name')


class ProductionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionInfo
        fields = ('id', 'minute', 'item_count')


class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrap
        fields = ('id', 'title', 'pieces', 'comments', 'production')


class DowntimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downtime
        fields = ('id', 'title', 'start', 'end', 'duration')