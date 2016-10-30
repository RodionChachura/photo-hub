from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.parsers import MultiPartParser, FormParser
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, AlbumSerializer, AlbumDetailSerializer, UserSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated)

    def get_queryset(self):
        queryset = Photo.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id != None:
            queryset = queryset.filter(user_id=user_id)
        album_id = self.request.query_params.get('album_id', None)
        if album_id != None:
            queryset = queryset.filter(album_id=album_id)
        return queryset

    def perform_create(self, serializer):
        # bad code
        if 'albumId' in self.request.data:
            serializer.save(user=self.request.user, album_id = self.request.data['albumId'])
        else:
            serializer.save(user=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated)

    def get_queryset(self):
        queryset = Album.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id != None:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action == 'retrieve':
            return AlbumDetailSerializer
        return AlbumSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        #serializer = AlbumSerializer(partial=True)
        serializer.save(user=self.request.user)

    #def partial_update(self, request, *args, **kwargs):
    #    instance = self.get_object()
    #    serializer = self.serialize(instance, data=request.data, partial=True)
    #    serializer.is_valid(raise_exception=True)
    #    new_instance = serializer.save()
    #    return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
