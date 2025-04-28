from rest_framework import serializers
from .models import Document
from land_registry.serializers import LandParcelSerializer
from users.serializers import UserSerializer

class DocumentSerializer(serializers.ModelSerializer):
    land_parcel = LandParcelSerializer(read_only=True)
    land_parcel_id = serializers.IntegerField(write_only=True)
    uploaded_by = UserSerializer(read_only=True)
    uploaded_by_id = serializers.IntegerField(write_only=True)
    verified_by = UserSerializer(read_only=True)
    verified_by_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Document
        fields = ['id', 'title', 'document_type', 'land_parcel', 'land_parcel_id',
                 'uploaded_by', 'uploaded_by_id', 'upload_date', 'ipfs_hash',
                 'blockchain_reference', 'is_verified', 'verification_date',
                 'verified_by', 'verified_by_id', 'metadata']
        read_only_fields = ['upload_date', 'verification_date', 'blockchain_reference']