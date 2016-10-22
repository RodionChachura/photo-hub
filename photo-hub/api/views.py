from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status 
from django.contrib.auth.models import User

from api.serializers import RegisterSerializer, LoginSerializer, UserSerializer
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
