from django.db import models
from django.contrib.auth.models import User

class Album(models.Model):
    owner = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['creation_date',]

class Photo(models.Model):
    owner = models.ForeignKey(User, related_name='user_photos', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/%Y/%m/%d')
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return name
    class Meta:
        ordering = ['creation_date',]

