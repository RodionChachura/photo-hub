from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

from api.models import Album, Photo


def getUniqueTitle(objects, name):
    index = 0
    new_name = name
    while objects.filter(title=name).exists():
        index += 1
        new_name = name + ' ' + index
    return new_name


class RelatedToUserModelSerializer(serializers.ModelSerializer):
    userId = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    def get_userId(self, obj):
        return obj.user_id

    def get_username(self, obj):
        return User.objects.get(id=obj.user_id).username

class PhotoSerializer(RelatedToUserModelSerializer):
    albumId = serializers.SerializerMethodField(read_only=True, required=False)
    albumTitle = serializers.SerializerMethodField(read_only=True, required=False)

    def create(self, validated_data):
        validated_data['title'] = getUniqueTitle(Photo.objects, validated_data['title'])
        return super().create(validated_data)

    class Meta:
        model = Photo
        fields = ('id', 'title', 'image', 'creationDate', 'albumId', 'albumTitle', 'userId', 'username')
        read_only_fields=('id', 'creationDate', 'albumId', 'albumTitle', 'userId', 'username')

    def get_albumId(self, obj):
        return obj.album_id

    def get_albumTitle(self, obj):
        if obj.album_id:
            return Album.objects.get(id=album_id).title
        else:
            return ''


class AlbumBaseSerializer(RelatedToUserModelSerializer):
    totalPhotos = serializers.SerializerMethodField()

    def get_totalPhotos(self, obj):
        try:
            return Photo.objects.get(album_id=obj.id).count()
        except Photo.DoesNotExist:
            return 0

class AlbumSerializer(AlbumBaseSerializer):
    thumbnail = serializers.SerializerMethodField(required=False)

    def create(self, validated_data):
        validated_data['title'] = getUniqueTitle(Album.objects, validated_data['title'])
        return super().create(validated_data)

    def get_thumbnail(self, obj):
        photo = Photo.objects.filter(album_id=obj.id).first()
        if photo != None:
            return photo.image
        return None

    class Meta:
        model = Album
        fields = ('id', 'title', 'creationDate', 'totalPhotos', 'userId', 'username', 'thumbnail')
        read_only_fields=('id', 'creationDate', 'totalPhotos', 'userId', 'username', 'thumbnail')

class AlbumDetailSerializer(AlbumBaseSerializer):
    photos = serializers.PrimaryKeyRelatedField(required=False, queryset=Photo.objects, many=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'creationDate', 'photos', 'totalPhotos', 'userId', 'username')
        read_only_fields=('id', 'creationDate', 'totalPhotos', 'userId', 'username')


class UserSerializer(serializers.ModelSerializer):
    totalAlbums = serializers.SerializerMethodField(required=False)
    totalPhotos = serializers.SerializerMethodField(required=False)
    
    def get_totalAlbums(self, obj):
        return Album.objects.filter(user_id=obj.id).count()

    def get_totalPhotos(self, obj):
        return Photo.objects.filter(user_id=obj.id).count()

    class Meta:
        model = User
        fields = ('id', 'username', 'totalAlbums', 'totalPhotos')


class RegisterSerializer(JSONWebTokenSerializer):
    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(JSONWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields['email'] = serializers.EmailField()
        self.fields['password'] = serializers.CharField(write_only=True)
    
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
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("This username alredy in use")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email alredy exists")
        if len(data['username']) < 5:
            raise serializers.ValidationError("Too short username")
        if len(data['username']) > 20:
            raise serializers.ValidationError("Too long username")
        if '@' in data['username']:
            raise serializers.ValidationError("Username cannot contain '@' cymbol")
 
    def validate(self, attrs):
        self.registrationValidation(attrs)
        user = self.createUser(attrs)

        payload = jwt_payload_handler(user)

        return { 
            'token': jwt_encode_handler(payload),
            'username': user.username,
            'id': user.id
        }

class LoginSerializer(JSONWebTokenSerializer):
    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(JSONWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField(required=False)
        self.fields['email'] = serializers.CharField(required=False)
        self.fields['password'] = serializers.CharField(write_only=True)
 
    def validate(self, attrs):
        '''
            login with username or email
        '''
        if 'username' in attrs:
            username = attrs['username']
        if 'email' in attrs:
            user = User.objects.get(email=attrs['email'])
            if user == None:
                raise serializers.ValidationError("Email is invalid")
            username = user.username

        credentials = {
            'username': username,
            'password': attrs.get('password')
        }

        if all(credentials.values()):
            user = authenticate(**credentials)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')

                payload = jwt_payload_handler(user)

                return {
                    'token': jwt_encode_handler(payload),
                    'username': user.username,
                    'id': user.id
                }
            else:
                raise serializers.ValidationError('Unable to login with provided credentials.')
        else:
            raise serializers.ValidationError('Credentials are invalid')