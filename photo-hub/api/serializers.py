from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Album, Photo, Like

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
        fields = ('id', 'title', 'image', 'creation_date', 'album_id', 'private', 'album_title', 'user_id', 'username', 'total_likes')
        read_only_fields=('id', 'creation_date', 'private', 'album_title', 'user_id', 'username', 'total_likes')

    def get_album_title(self, obj):
        if obj.album_id:
            return Album.objects.get(id=obj.album_id).title
        else:
            return ''

class AlbumSerializer(RelatedToUserModelSerializer):
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
        fields = ('id', 'title', 'creation_date', 'total_photos', 'total_likes', 'private', 'user_id', 'username', 'thumbnail')
        read_only_fields=('id', 'creation_date', 'total_photos', 'total_likes', 'user_id', 'username', 'thumbnail')

class AlbumDetailSerializer(RelatedToUserModelSerializer):
    photos = PhotoSerializer(required=False, many=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'creation_date', 'photos', 'total_photos','total_likes', 'private', 'user_id', 'username')
        read_only_fields=('id', 'creation_date', 'total_photos', 'total_likes', 'user_id', 'username')

class AlbumTerseSerializer(RelatedToUserModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title')
        read_only_fields=('id', 'title')


class UserSerializer(serializers.ModelSerializer):
    '''
    return data only about public albums
    '''
    total_albums = serializers.SerializerMethodField(required=False)
    total_photos = serializers.SerializerMethodField(required=False)
    total_likes = serializers.SerializerMethodField(required=False)
    
    def get_total_albums(self, obj):
        return Album.objects.filter(user_id=obj.id, private=False).count()

    def get_total_photos(self, obj):
        photos = Photo.objects.filter(user_id=obj.id)
        return len([x for x in photos if x.private==False])
    
    def get_total_likes(self, obj):
        try:
            photos = Photo.objects.filter(user_id=obj.id)
            photos = [x for x in photos if x.private==False]
            return sum(x.total_likes for x in photos)
        except:
            return 0

    class Meta:
        model = User
        fields = ('id', 'username', 'total_albums', 'total_photos', 'total_likes')