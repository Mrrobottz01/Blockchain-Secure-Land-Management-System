from django.contrib import admin
from .models import Document

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'document_type', 'land_parcel', 'uploaded_by', 'is_verified', 'upload_date')
    list_filter = ('document_type', 'is_verified')
    search_fields = ('title', 'land_parcel__parcel_id', 'uploaded_by__username')
    readonly_fields = ('upload_date', 'verification_date', 'blockchain_reference')
