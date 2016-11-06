from django.db import models
from django.contrib.auth.models import User
import os
import uuid

def get_image_path(instance, filename):
    return '{}.{}'.format(uuid.uuid4(), filename.split('.')[-1])


class Album(models.Model):
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=80, default='New album')
    creation_date = models.DateField(auto_now_add=True)
    private = models.BooleanField(default=False)
    
    @property
    def total_photos(self):
        try:
            return Photo.objects.filter(album_id=self.id).count()
        except Photo.DoesNotExist:
            return 0

    @property 
    def total_likes(self):
        photos = Photo.objects.filter(album_id=self.id)
        return sum(x.total_likes for x in photos)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-creation_date', ]

class Photo(models.Model):
    user = models.ForeignKey(User,  related_name='photos', on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=80, default='New photo')
    image = models.ImageField(title, upload_to=get_image_path)
    creation_date = models.DateField(auto_now_add=True)

    @property
    def total_likes(self):
        try:
            return Like.objects.filter(photo_id=self.id).count()
        except Like.DoesNotExist:
            return 0

    @property
    def private(self):
        if self.album:
            return self.album.private
        return False

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-creation_date', ]

class Like(models.Model):
    photo = models.ForeignKey(Photo, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)
