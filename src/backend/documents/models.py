from django.db import models
from django.conf import settings
from land_registry.models import LandParcel

class Document(models.Model):
    DOCUMENT_TYPES = [
        ('TITLE_DEED', 'Title Deed'),
        ('SURVEY_PLAN', 'Survey Plan'),
        ('ID_PROOF', 'Identity Proof'),
        ('TAX_RECEIPT', 'Tax Receipt'),
        ('OTHER', 'Other')
    ]
    
    title = models.CharField(max_length=255)
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    land_parcel = models.ForeignKey(LandParcel, on_delete=models.CASCADE, related_name='documents')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    upload_date = models.DateTimeField(auto_now_add=True)
    ipfs_hash = models.CharField(max_length=100)  # IPFS hash for document storage
    blockchain_reference = models.CharField(max_length=256)  # Reference on blockchain
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_documents'
    )
    metadata = models.JSONField(null=True, blank=True)  # Additional document metadata

    class Meta:
        ordering = ['-upload_date']

    def __str__(self):
        return f"{self.title} - {self.document_type} ({self.land_parcel.parcel_id})"
