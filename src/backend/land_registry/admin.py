from django.contrib import admin
from .models import LandParcel, LandTransaction

@admin.register(LandParcel)
class LandParcelAdmin(admin.ModelAdmin):
    list_display = ('parcel_id', 'address', 'current_owner', 'status', 'registration_date')
    list_filter = ('status',)
    search_fields = ('parcel_id', 'address', 'current_owner__username')
    readonly_fields = ('registration_date', 'blockchain_hash')

@admin.register(LandTransaction)
class LandTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'land_parcel', 'from_owner', 'to_owner', 'status', 'transaction_date')
    list_filter = ('status',)
    search_fields = ('land_parcel__parcel_id', 'from_owner__username', 'to_owner__username')
    readonly_fields = ('transaction_date', 'transaction_hash')
