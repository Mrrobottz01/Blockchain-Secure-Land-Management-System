from django.db import models
from django.conf import settings

class LandParcel(models.Model):
    parcel_id = models.CharField(max_length=50, unique=True)
    address = models.TextField()
    area = models.DecimalField(max_digits=10, decimal_places=2)  # in square meters
    coordinates = models.JSONField()  # Store geographical coordinates
    current_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='owned_parcels')
    registration_date = models.DateTimeField(auto_now_add=True)
    blockchain_hash = models.CharField(max_length=256)  # Hash stored on blockchain
    status = models.CharField(max_length=20, choices=[
        ('ACTIVE', 'Active'),
        ('PENDING', 'Pending Verification'),
        ('DISPUTED', 'Under Dispute'),
        ('INACTIVE', 'Inactive')
    ], default='PENDING')

    class Meta:
        ordering = ['-registration_date']

    def __str__(self):
        return f"Land Parcel {self.parcel_id} - {self.address}"

class LandTransaction(models.Model):
    land_parcel = models.ForeignKey(LandParcel, on_delete=models.PROTECT, related_name='transactions')
    from_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='land_sold')
    to_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='land_purchased')
    transaction_date = models.DateTimeField(auto_now_add=True)
    transaction_hash = models.CharField(max_length=256)  # Blockchain transaction hash
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('REJECTED', 'Rejected'),
        ('CANCELLED', 'Cancelled')
    ], default='PENDING')
    documents = models.JSONField(null=True, blank=True)  # Store IPFS hashes of related documents

    class Meta:
        ordering = ['-transaction_date']

    def __str__(self):
        return f"Transaction {self.id} - {self.land_parcel.parcel_id}"
