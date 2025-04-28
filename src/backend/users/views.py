from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Allow registration without authentication
        if self.action == 'create':  # 'create' action is for user registration
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        # For anonymous users (not authenticated), only show public info
        if not self.request.user.is_authenticated:
            return User.objects.none()  # Return empty queryset for list view
            
        # For admin and land officers, show all users
        if self.request.user.user_type in ['ADMIN', 'LAND_OFFICER']:
            return User.objects.all()
            
        # For regular users, only show their own profile
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Returns the current authenticated user's data
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
        
    @action(detail=True, methods=['post'])
    def verify_user(self, request, pk=None):
        if request.user.user_type not in ['ADMIN', 'LAND_OFFICER']:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        user = self.get_object()
        user.is_verified = True
        user.save()
        return Response({'status': 'verified'})