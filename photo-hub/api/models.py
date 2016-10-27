from django.db import models
from django.contrib.auth.models import User
import os
import uuid

def get_image_path(instance, filename):
    return '{}.{}'.format(uuid.uuid4(), filename.split('.')[-1])


class Album(models.Model):
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=80, default='New album')
    creationDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-creationDate', ]

class Photo(models.Model):
    user = models.ForeignKey(User,  related_name='photos', on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=80, default='New photo')
    image = models.ImageField(title, upload_to=get_image_path)
    creationDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-creationDate', ]