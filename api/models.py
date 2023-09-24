import datetime

from django.db import models
from datetime import timedelta


# Create your models here.
class ProductionLine(models.Model):
    area = models.CharField(max_length=15)
    cell = models.IntegerField()


class Product(models.Model):
    part_num = models.CharField(max_length=20, unique=True)
    rate = models.IntegerField()


class Operator(models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    worker_number = models.IntegerField(unique=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['last_name']


class Shift(models.Model):

    number = [
        (1, 'First'),
        (2, 'Second')
    ]

    number = models.IntegerField(choices=number, default=1)
    date = models.DateField()
    line = models.ForeignKey(ProductionLine, related_name='shift',  default=0, on_delete=models.CASCADE)
    operators = models.ManyToManyField(Operator, blank=True)


class Machine(models.Model):
    code = models.CharField(max_length=5, unique=True)
    make = models.CharField(max_length=20)
    machine_model = models.CharField(max_length=20)
    serial = models.IntegerField(unique=True)
    line = models.OneToOneField(ProductionLine, related_name='machine', on_delete=models.CASCADE)


class Order(models.Model):
    quantity = models.IntegerField()
    product = models.ForeignKey(Product, related_name='order', default=1, on_delete=models.CASCADE)
    line = models.ForeignKey(ProductionLine, related_name='orderL', on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, related_name='order',  default=0, on_delete=models.CASCADE)


class ProductionInfo(models.Model):
    hour = models.TimeField(null=True)
    minute = models.TimeField()
    item_count = models.IntegerField()
    line = models.ForeignKey(ProductionLine, related_name='info', default=0, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, related_name='info',  default=0, on_delete=models.CASCADE)

    class Meta:
        ordering = ['minute']


class Scrap(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    shift = models.ForeignKey(Shift, related_name='scrap', on_delete=models.CASCADE)
    reason = models.CharField(max_length=50, null=True)
    pieces = models.IntegerField(null=True)
    comments = models.CharField(max_length=200, null=True)
    minute = models.TimeField()


class Downtime(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    shift = models.ForeignKey(Shift, related_name='downtime', on_delete=models.CASCADE)
    reason = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=150, null=True)
    start = models.TimeField()
    end = models.TimeField()

    class Meta:
        ordering = ['start']


class Speedloss(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    shift = models.ForeignKey(Shift, related_name='speedloss', on_delete=models.CASCADE)
    reason = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=150, null=True)
    start = models.TimeField()
    end = models.TimeField()

    class Meta:
        ordering = ['start']
