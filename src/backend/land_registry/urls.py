from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'parcels', views.LandParcelViewSet)
router.register(r'transactions', views.LandTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]