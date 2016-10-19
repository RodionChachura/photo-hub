from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets, status 
from django.contrib.auth.models import User

from api.permissions import IsOwnerOrReadOnly
from api.models import Photo, Album
from api.serializers import PhotoSerializer, AlbumSerializer, RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework_jwt.views import JSONWebTokenAPIView


class RegisterView(JSONWebTokenAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            username = serializer.object.get('username')
            pk = serializer.object.get('pk')
            token = serializer.object.get('token')

            return Response({
                'token': token,
                'username': username,
                'pk': pk
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(JSONWebTokenAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            username = serializer.object.get('username')
            pk = serializer.object.get('pk')
            token = serializer.object.get('token')

            return Response({
                'token': token,
                'username': username,
                'pk': pk
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    queryset = User.objects.all()
    def get(self, request, format=None):
        if request.user.is_authenthicated():
            request.user.auth_token.delete()
            return Response(status.HTTP_200_OK)
        else:
            return Response(status.HTTP_401_UNAUTHORIZED)

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
