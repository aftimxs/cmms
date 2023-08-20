"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'shift', views.ShiftView, 'shift')
router.register(r'production-line', views.ProductionLineView, 'production-line')
router.register(r'machine', views.MachineView, 'machine')
router.register(r'product', views.ProductView, 'product')
router.register(r'order', views.OrderView, 'order')
router.register(r'operator', views.OperatorView, 'operator')
router.register(r'product-info', views.ProductionInfoView, 'product-info')
router.register(r'scrap', views.ScrapView, 'scrap')
router.register(r'downtime', views.DowntimeView, 'downtime')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
