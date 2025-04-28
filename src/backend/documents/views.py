from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.user_type == 'ADMIN' or self.request.user.user_type == 'LAND_OFFICER':
            return Document.objects.all()
        return Document.objects.filter(uploaded_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

    @action(detail=True, methods=['post'])
    def verify_document(self, request, pk=None):
        if request.user.user_type not in ['ADMIN', 'LAND_OFFICER']:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        document = self.get_object()
        document.is_verified = True
        document.verified_by = request.user
        document.save()
        return Response({'status': 'verified'})