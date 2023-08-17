import datetime

from django.db import models
from datetime import timedelta


# Create your models here.
class Shift(models.Model):
    number = models.IntegerField(max_length=1)
    date = models.DateField(auto_now_add=True)
    start = models.TimeField()
    end = models.TimeField()


class ProductionLine(models.Model):
    area = models.CharField(max_length=15)
    cell = models.IntegerField(max_length=2)
    working_shift = models.ForeignKey(Shift, on_delete=models.CASCADE)


class Machine(models.Model):
    name = models.CharField(max_length=15, unique=True)
    code = models.CharField(max_length=5, unique=True)
    status = models.BooleanField(null=False, default=False)
    make = models.CharField(max_length=20)
    machine_model = models.CharField(max_length=20)
    serial = models.IntegerField(max_length=20, unique=True)
    line = models.OneToOneField(ProductionLine, on_delete=models.CASCADE)


class Product(models.Model):
    name = models.CharField(max_length=20, unique=True)
    part_num = models.CharField(max_length=20, unique=True)
    rate = models.IntegerField(max_length=5)
    total_quantity = models.IntegerField(max_length=7)


class Order(models.Model):
    target_per_hour = models.IntegerField(max_length=5)
    quantity = models.IntegerField(max_length=10)
    products = models.ManyToManyField(Product)
    line = models.ForeignKey(ProductionLine, on_delete=models.CASCADE)


class Operator(models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    worker_number = models.IntegerField(max_length=15, unique=True)
    working_machine = models.ForeignKey(Machine, on_delete=models.CASCADE)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class ProductionInfo(models.Model):
    minute = models.TimeField()
    item_count = models.IntegerField(max_length=7)


class Scrap(models.Model):
    title = models.CharField(max_length=50, null=True)
    pieces = models.IntegerField(max_length=5, null=False)
    comments = models.CharField(max_length=200, null=True)
    production = models.ForeignKey(ProductionLine, on_delete=models.CASCADE)


class Downtime(models.Model):
    title = models.CharField(max_length=50, null=True)
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField()

    @property
    def duration(self):
        return self.start - self.end
