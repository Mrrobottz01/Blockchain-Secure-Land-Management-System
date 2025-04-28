from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class AuthenticationTests(APITestCase):
    def setUp(self):
        # Get the correct URL for user registration based on DRF's router naming
        self.register_url = reverse('user-list')
        self.token_url = reverse('token_obtain_pair')
        self.user_data = {
            'username': 'testuser',
            'password': 'TestPass123!',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'national_id': '123456789',
            'phone_number': '1234567890',
            'user_type': 'CITIZEN'
        }

    def test_user_registration(self):
        """Test user registration endpoint"""
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_user_login(self):
        """Test user login and token generation"""
        # Create a user first
        User.objects.create_user(
            username=self.user_data['username'],
            password=self.user_data['password'],
            email=self.user_data['email'],
            first_name=self.user_data['first_name'],
            last_name=self.user_data['last_name'],
            national_id=self.user_data['national_id'],
            phone_number=self.user_data['phone_number'],
            user_type=self.user_data['user_type']
        )

        # Attempt login
        login_data = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        response = self.client.post(self.token_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_invalid_registration(self):
        """Test registration with invalid data"""
        invalid_data = self.user_data.copy()
        invalid_data['password'] = '123'  # Too short password
        response = self.client.post(self.register_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_duplicate_registration(self):
        """Test registration with existing username"""
        # Create first user
        self.client.post(self.register_url, self.user_data, format='json')
        # Try to create duplicate
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
