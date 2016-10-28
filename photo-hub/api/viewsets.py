from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, AlbumSerializer, AlbumDetailSerializer, UserSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    #parser_classes = (FormParser, MultiPartParser,)
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
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
        serializer.save(user=self.request.user)

    @detail_route(methods=['post'])
    #def upload_photo(self, request, format=None):
    #    serializer = PhotoSerializer(data=request.data)
    #    if serializer.is_valid():
    #        return Response(serializer.data, status=status.HTTP_201_CREATED)
    #    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def pre_save(self, obj):
        obj.image = self.request.FILES.get('image')

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

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
