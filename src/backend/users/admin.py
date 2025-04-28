from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

User = get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_type', 'is_verified')
    list_filter = ('user_type', 'is_verified', 'is_staff')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('user_type', 'phone_number', 'national_id', 'blockchain_address', 'is_verified')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('user_type', 'phone_number', 'national_id')}),
    )
