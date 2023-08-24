import datetime

from django.db import models
from datetime import timedelta


# Create your models here.
class Shift(models.Model):

    number = [
        (1, 'First'),
        (2, 'Second')
    ]

    shift_number = models.IntegerField(choices=number, default=1)
    date = models.DateField()
    start = models.TimeField()
    end = models.TimeField()


class Product(models.Model):
    name = models.CharField(max_length=20, unique=True)
    part_num = models.CharField(max_length=20, unique=True)
    rate = models.IntegerField()


class ProductionLine(models.Model):
    area = models.CharField(max_length=15)
    cell = models.IntegerField()
    working_shift = models.ForeignKey(Shift, related_name='line', on_delete=models.CASCADE)
    making_product = models.ForeignKey(Product, default=0, on_delete=models.CASCADE)


class Machine(models.Model):
    code = models.CharField(max_length=5, unique=True)
    status = models.BooleanField(null=False, default=False)
    make = models.CharField(max_length=20)
    machine_model = models.CharField(max_length=20)
    serial = models.IntegerField(unique=True)
    line = models.OneToOneField(ProductionLine, related_name='machine', on_delete=models.CASCADE)


class Order(models.Model):
    target_per_hour = models.IntegerField()
    quantity = models.IntegerField()
    products = models.ManyToManyField(Product)
    line = models.ForeignKey(ProductionLine, related_name='order', on_delete=models.CASCADE)


class Operator(models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    worker_number = models.IntegerField(unique=True)
    working_line = models.ForeignKey(ProductionLine, related_name='operator', default=0, on_delete=models.CASCADE)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class ProductionInfo(models.Model):
    minute = models.TimeField()
    item_count = models.IntegerField()
    line = models.ForeignKey(ProductionLine, related_name='info', default=0, on_delete=models.CASCADE)


class Scrap(models.Model):
    title = models.CharField(max_length=50, null=True)
    pieces = models.IntegerField(null=False)
    comments = models.CharField(max_length=200, null=True)
    production = models.ForeignKey(ProductionLine, related_name='scrap', on_delete=models.CASCADE)


class Downtime(models.Model):
    title = models.CharField(max_length=50, null=True)
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField()

    @property
    def duration(self):
        return self.start - self.end
