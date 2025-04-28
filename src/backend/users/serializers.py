from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name',
                 'user_type', 'phone_number', 'national_id', 'blockchain_address',
                 'is_verified']
        read_only_fields = ['is_verified', 'blockchain_address']
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)