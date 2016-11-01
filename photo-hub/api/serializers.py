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
    while objects.filter(title=new_name).exists():
        index += 1
        new_name = name + ' ' + str(index)
    return new_name


class RelatedToUserModelSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    def get_username(self, obj):
        return User.objects.get(id=obj.user_id).username

class PhotoSerializer(RelatedToUserModelSerializer):
    album_id = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, queryset=Album.objects)
    album_title = serializers.SerializerMethodField(read_only=True, required=False)

    def create(self, validated_data):
        validated_data['title'] = getUniqueTitle(Photo.objects, validated_data['title'])
        return super().create(validated_data)

    class Meta:
        model = Photo
        fields = ('id', 'title', 'image', 'creation_date', 'album_id', 'album_title', 'user_id', 'username')
        read_only_fields=('id', 'creation_date', 'album_title', 'user_id', 'username')

    def get_album_title(self, obj):
        if obj.album_id:
            return Album.objects.get(id=obj.album_id).title
        else:
            return ''


class AlbumBaseSerializer(RelatedToUserModelSerializer):
    total_photos = serializers.SerializerMethodField()

    def get_total_photos(self, obj):
        try:
            return Photo.objects.filter(album_id=obj.id).count()
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
            return photo.image.url
        return None

    class Meta:
        model = Album
        fields = ('id', 'title', 'creation_date', 'total_photos', 'user_id', 'username', 'thumbnail')
        read_only_fields=('id', 'creation_date', 'total_photos', 'user_id', 'username', 'thumbnail')

class AlbumDetailSerializer(AlbumBaseSerializer):
    photos = PhotoSerializer(required=False, many=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'creation_date', 'photos', 'total_photos', 'user_id', 'username')
        read_only_fields=('id', 'creation_date', 'total_photos', 'user_id', 'username')


class UserSerializer(serializers.ModelSerializer):
    total_albums = serializers.SerializerMethodField(required=False)
    total_photos = serializers.SerializerMethodField(required=False)
    
    def get_total_albums(self, obj):
        return Album.objects.filter(user_id=obj.id).count()

    def get_total_photos(self, obj):
        return Photo.objects.filter(user_id=obj.id).count()

    class Meta:
        model = User
        fields = ('id', 'username', 'total_albums', 'total_photos')


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