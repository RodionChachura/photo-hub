from django.utils import timezone
from django.contrib.auth.models import User

from rest_framework import serializers

from api.models import Album, Photo

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    album = serializers.HyperlinkedRelatedField(view_name='album-detail', queryset=Album.objects)
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects)

    class Meta:
        model = Photo
        fields = ('pk', 'name', 'image', 'creation_date', 'owner', 'album')
        read_only_fields=('creation_date')

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects)
    photos = serializers.HyperlinkedRelatedField(view_name='photo-list',  queryset=Photo.objects, many=True)

    class Meta:
        model = Album
        fields = ('pk', 'name', 'creation_date', 'owner', 'photos')
        read_only_fields=('creation_date')

class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'password', 'confirm_password')
        write_only_fields = ('password', 'confirm_password')
        read_only_fiels = ('pk')
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        user = super(UserSerializer, self).update(instance, validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate(self, data):
        if len(data['password']) < 6:
            raise serializers.ValidationError(
                "Too short password"
                )
        if data['password']:
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError(
                    "The passwords have to be the same"
                )
        return data

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    albums = serializers.HyperlinkedRelatedField(many=True, view_name='album-list', queryset=Album.objects)
    photos = serializers.HyperlinkedRelatedField(many=True, view_name='photo-list', queryset=Photo.objects)
    class Meta:
        model = User
        fields = ('pk', 'username', 'albums', 'photos')
        read_only_fiels = ('pk', 'username')