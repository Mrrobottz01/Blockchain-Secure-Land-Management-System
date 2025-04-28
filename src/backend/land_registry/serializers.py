from rest_framework import serializers
from .models import LandParcel, LandTransaction
from users.serializers import UserSerializer

class LandParcelSerializer(serializers.ModelSerializer):
    current_owner = UserSerializer(read_only=True)
    current_owner_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LandParcel
        fields = ['id', 'parcel_id', 'address', 'area', 'coordinates', 
                 'current_owner', 'current_owner_id', 'registration_date', 
                 'blockchain_hash', 'status']
        read_only_fields = ['registration_date', 'blockchain_hash']

class LandTransactionSerializer(serializers.ModelSerializer):
    from_owner = UserSerializer(read_only=True)
    to_owner = UserSerializer(read_only=True)
    from_owner_id = serializers.IntegerField(write_only=True)
    to_owner_id = serializers.IntegerField(write_only=True)
    land_parcel = LandParcelSerializer(read_only=True)
    land_parcel_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LandTransaction
        fields = ['id', 'land_parcel', 'land_parcel_id', 'from_owner', 
                 'from_owner_id', 'to_owner', 'to_owner_id', 'transaction_date', 
                 'transaction_hash', 'price', 'status', 'documents']
        read_only_fields = ['transaction_date', 'transaction_hash']