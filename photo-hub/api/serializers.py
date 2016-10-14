from django.utils import timezone
from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.decorators import detail_route
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

from api.models import Album, Photo

class UserSerializer(serializers.HyperlinkedModelSerializer):
    album = serializers.HyperlinkedRelatedField(view_name='album-list', queryset=Album.objects, many=True, required=False)
    photos = serializers.HyperlinkedRelatedField(view_name='photo-list',  queryset=Photo.objects, many=True, required=False)

    class Meta:
        model = User
        fields = ('url', 'pk', 'username', 'email', 'albums', 'photos')
        read_only_fields=('albums', 'photos',)

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    album = serializers.HyperlinkedRelatedField(view_name='album-detail', queryset=Album.objects, required=False)
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects, required=False)

    class Meta:
        model = Photo
        fields = ('url', 'pk', 'name', 'image', 'creation_date', 'owner', 'album',)
        read_only_fields=('creation_date', )

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects, required=False)
    photos = serializers.HyperlinkedRelatedField(view_name='photo-list',  queryset=Photo.objects, many=True, required=False)
    name = serializers.CharField(required=False)

    class Meta:
        model = Album
        fields = ('url', 'pk', 'name', 'creation_date', 'owner', 'photos',)
        read_only_fields=('creation_date',)

class RegisterSerializer(JSONWebTokenSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(JSONWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields['email'] = serializers.CharField(write_only=True)
        self.fields['password'] = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('url', 'pk', 'username', 'email', 'password', 'confirm_password',)
        write_only_fields = ('password', 'confirm_password',)
    
    def createUser(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def registrationValidation(self, data):
        if len(data['password']) < 6:
            raise serializers.ValidationError("Too short password")
        if data['password']:
            if data['password'] != data['password']:
                raise serializers.ValidationError("The passwords have to be the same")
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("This username alredy in use")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email alredy exists")
        if len(data['username']) < 2:
            raise serializers.ValidationError("Too short username")
        



    def validate(self, attrs):
        self.registrationValidation(attrs)
        user = self.createUser(attrs)

        payload = jwt_payload_handler(user)

        return {
            'token': jwt_encode_handler(payload),
            'user': user
        }
