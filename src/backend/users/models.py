from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPES = [
        ('ADMIN', 'Administrator'),
        ('LAND_OFFICER', 'Land Officer'),
        ('CITIZEN', 'Citizen'),
        ('NOTARY', 'Notary'),
    ]
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='CITIZEN')
    phone_number = models.CharField(max_length=15, blank=True)
    national_id = models.CharField(max_length=20, unique=True)
    blockchain_address = models.CharField(max_length=42, blank=True)  # For blockchain integration
    is_verified = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['username']
        
    def __str__(self):
        return f"{self.get_full_name()} ({self.user_type})"
