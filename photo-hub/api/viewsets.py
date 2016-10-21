from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, PhotoDetailSerializer, AlbumSerializer, AlbumDetailSerializer, UserSerializer, UserDetailSerializer

from rest_framework_extensions.mixins import NestedViewSetMixin

class PhotoViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action == 'retrieve':
            return PhotoDetailSerializer
        return PhotoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AlbumViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action == 'retrieve':
            return AlbumDetailSerializer
        return AlbumSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action == 'retrieve':
            return UserDetailSerializer
        return UserSerializer
