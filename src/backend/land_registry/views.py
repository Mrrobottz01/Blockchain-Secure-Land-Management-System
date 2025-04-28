from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import LandParcel, LandTransaction
from .serializers import LandParcelSerializer, LandTransactionSerializer

class LandParcelViewSet(viewsets.ModelViewSet):
    queryset = LandParcel.objects.all()
    serializer_class = LandParcelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.user_type == 'ADMIN' or self.request.user.user_type == 'LAND_OFFICER':
            return LandParcel.objects.all()
        return LandParcel.objects.filter(current_owner=self.request.user)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        if request.user.user_type not in ['ADMIN', 'LAND_OFFICER']:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        parcel = self.get_object()
        parcel.status = 'ACTIVE'
        parcel.save()
        return Response({'status': 'verified'})

class LandTransactionViewSet(viewsets.ModelViewSet):
    queryset = LandTransaction.objects.all()
    serializer_class = LandTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.user_type == 'ADMIN' or self.request.user.user_type == 'LAND_OFFICER':
            return LandTransaction.objects.all()
        return LandTransaction.objects.filter(
            models.Q(from_owner=self.request.user) | 
            models.Q(to_owner=self.request.user)
        )

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if request.user.user_type not in ['ADMIN', 'LAND_OFFICER']:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        transaction = self.get_object()
        transaction.status = 'COMPLETED'
        transaction.save()
        
        # Update land parcel ownership
        land_parcel = transaction.land_parcel
        land_parcel.current_owner = transaction.to_owner
        land_parcel.save()
        
        return Response({'status': 'approved'})