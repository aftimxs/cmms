from django.urls import path
from .views import ShiftView, ProductionLineView

urlpatterns = [
    path('shift', ShiftView.as_view()),
    path('production', ProductionLineView.as_view()),
]