from django.db import models
from django.contrib.auth.models import User
import os


def get_image_path(instance, filename):
    return os.path.join('photos', '-'.join(str(instance.owner.pk, instance.album.pk, instance.pk)))


class Album(models.Model):
    owner = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    name = models.CharField(max_length=80, default='New album')
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['creation_date', ]


class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    owner = models.ForeignKey(User,  related_name='user_photos', on_delete=models.CASCADE)
    name = models.CharField(max_length=80, default='New photo')
    image = models.ImageField(name, upload_to=get_image_path)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['creation_date', ]