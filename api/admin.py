from django.contrib import admin
from .models import *


class ShiftAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'date', 'start', 'end')


class ProductionLineAdmin(admin.ModelAdmin):
    list_display = ('id', 'area', 'cell', 'working_shift')


class MachineAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code', 'status', 'make', 'machine_model', 'serial', 'line')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'part_num', 'rate', 'total_quantity')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'target_per_hour', 'quantity', 'line')


class OperatorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'worker_number', 'working_machine', 'full_name')


class ScrapAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'pieces', 'comments', 'production')


class DowntimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'start', 'end', 'duration')


# Register your models here.
admin.site.register(Shift, ShiftAdmin)
admin.site.register(ProductionLine, ProductionLineAdmin)
admin.site.register(Machine, MachineAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Operator, OperatorAdmin)
admin.site.register(Scrap, ScrapAdmin)
admin.site.register(Downtime, DowntimeAdmin)

