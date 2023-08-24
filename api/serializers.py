from rest_framework import serializers
from .models import *


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = '__all__'


class ProductionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionInfo
        fields = '__all__'


class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrap
        fields = '__all__'


class ProductionLineSerializer(serializers.ModelSerializer):
    order = OrderSerializer(many=True, read_only=True)
    machine = MachineSerializer(many=False, read_only=True)
    operator = OperatorSerializer(many=True, read_only=True)
    info = ProductionInfoSerializer(many=True, read_only=True)
    scrap = ScrapSerializer(many=True, read_only=True)

    class Meta:
        model = ProductionLine
        fields = '__all__'


class ShiftSerializer(serializers.ModelSerializer):
    line = ProductionLineSerializer(many=True, read_only=True)

    class Meta:
        model = Shift
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class DowntimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downtime
        fields = '__all__'
