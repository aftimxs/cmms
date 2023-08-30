from django.contrib import admin
from .models import *


class ShiftAdmin(admin.ModelAdmin):
    list_display = ('id', 'shift_number', 'date', 'on_line')


class ProductionLineAdmin(admin.ModelAdmin):
    list_display = ('id', 'area', 'cell')


class MachineAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'make', 'machine_model', 'serial', 'line')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'part_num', 'rate')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'quantity', 'line', 'shift')


class OperatorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'worker_number', 'working_line', 'working_shift', 'full_name')


class ScrapAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'pieces', 'comments', 'production')


class DowntimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'start', 'end', 'duration')


class ProductionInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'hour', 'minute', 'item_count', 'line', 'shift')


# Register your models here.
admin.site.register(Shift, ShiftAdmin)
admin.site.register(ProductionLine, ProductionLineAdmin)
admin.site.register(Machine, MachineAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Operator, OperatorAdmin)
admin.site.register(Scrap, ScrapAdmin)
admin.site.register(Downtime, DowntimeAdmin)
admin.site.register(ProductionInfo, ProductionInfoAdmin)

