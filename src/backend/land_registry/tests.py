from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import LandParcel, LandTransaction
from decimal import Decimal

User = get_user_model()

class LandRegistryTests(APITestCase):
    def setUp(self):
        # Create test users
        self.admin = User.objects.create_user(
            username='admin',
            password='AdminPass123!',
            email='admin@example.com',
            user_type='ADMIN',
            national_id='admin123',
            first_name='Admin',
            last_name='User',
            phone_number='1234567890'
        )
        self.citizen = User.objects.create_user(
            username='citizen',
            password='CitizenPass123!',
            email='citizen@example.com',
            user_type='CITIZEN',
            national_id='citizen123',
            first_name='Citizen',
            last_name='User',
            phone_number='0987654321'
        )
        
        # Create test land parcel
        self.land_parcel = LandParcel.objects.create(
            parcel_id='TEST123',
            address='Test Address, City',
            area=Decimal('100.00'),
            coordinates={'lat': 0.0, 'lng': 0.0},
            current_owner=self.citizen,
            blockchain_hash='0x123456789'
        )
        
        # URLs
        self.land_parcel_list_url = reverse('landparcel-list')
        self.land_transaction_list_url = reverse('landtransaction-list')
        
        # Authenticate admin
        self.client.force_authenticate(user=self.admin)

    def test_create_land_parcel(self):
        """Test creating a new land parcel"""
        data = {
            'parcel_id': 'NEW123',
            'address': 'New Address, City',
            'area': '150.00',
            'coordinates': {'lat': 1.0, 'lng': 1.0},
            'current_owner_id': self.citizen.id,
            'blockchain_hash': '0x987654321'
        }
        response = self.client.post(self.land_parcel_list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LandParcel.objects.count(), 2)

    def test_verify_land_parcel(self):
        """Test verifying a land parcel"""
        verify_url = reverse('landparcel-verify', kwargs={'pk': self.land_parcel.pk})
        response = self.client.post(verify_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.land_parcel.refresh_from_db()
        self.assertEqual(self.land_parcel.status, 'ACTIVE')

    def test_create_land_transaction(self):
        """Test creating a new land transaction"""
        new_owner = User.objects.create_user(
            username='newowner',
            password='NewOwnerPass123!',
            email='newowner@example.com',
            user_type='CITIZEN',
            national_id='newowner123',
            first_name='New',
            last_name='Owner',
            phone_number='5551234567'
        )
        
        data = {
            'land_parcel_id': self.land_parcel.id,
            'from_owner_id': self.citizen.id,
            'to_owner_id': new_owner.id,
            'price': '50000.00',
            'transaction_hash': '0xtransaction123'
        }
        response = self.client.post(self.land_transaction_list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_unauthorized_verification(self):
        """Test that non-admin users cannot verify land parcels"""
        self.client.force_authenticate(user=self.citizen)
        verify_url = reverse('landparcel-verify', kwargs={'pk': self.land_parcel.pk})
        response = self.client.post(verify_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_land_parcels(self):
        """Test listing land parcels with different user roles"""
        # Admin should see all parcels
        response = self.client.get(self.land_parcel_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        # Citizen should only see their own parcels
        self.client.force_authenticate(user=self.citizen)
        response = self.client.get(self.land_parcel_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
