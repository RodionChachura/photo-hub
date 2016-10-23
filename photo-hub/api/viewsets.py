from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, AlbumSerializer, AlbumDetailSerializer, UserSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated)

    def get_queryset(self):
        queryset = Photo.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id != None:
            return queryset.filter(user_id=user_id)
        username = self.request.query_params.get('username', None)
        if username != None:
            return queryset.filter(username=username)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated)

    def get_queryset(self):
        queryset = Album.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id != None:
            return queryset.filter(user_id=user_id)
        username = self.request.query_params.get('username', None)
        if username != None:
            return queryset.filter(username=username)
        return queryset

    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action == 'retrieve':
            return AlbumDetailSerializer
        return AlbumSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
