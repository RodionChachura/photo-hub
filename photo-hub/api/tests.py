from django.contrib.auth.models import User
from api.models import Album, Photo
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_jwt.settings import api_settings
from .auth.serializers import RegisterSerializer
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
import os


class Test(TestCase):

    testUser = {
           "username": "TestUser",
           "email": "TestUser@mail.com",
           "password": "TestUserPassword"
        }
    loginTestUserWithUsername = {
           "username": "TestUser",
           "password": "TestUserPassword"
        }
    loginTestUserWithEmail = {
            "email": "TestUser@mail.com",
            "password": "TestUserPassword"
        }
    testAlbum = {
            "title": "Test Album"
        }
    testLike = {
            "userId": User.objects.last().id
        }
    
    def get_testPhoto(self):
        return {
            "title" : "Test Photo",
            "image" : open(os.path.join(settings.BASE_DIR, 'test_image_folder/test_image.jpg'), 'rb')
        }

    def setUp(self):
        self.client = APIClient()
        self.registerTestUser()

    def registerTestUser(self):
        response = self.client.post('/api/register', self.testUser, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        if response.status_code == status.HTTP_200_OK:
            self.client.credentials(
                HTTP_AUTHORIZATION="{0} {1}".format(api_settings.JWT_AUTH_HEADER_PREFIX, response.data['token']))

    def test_logout_login(self):
        response = self.client.post('/api/logout', format="json")
        response = self.client.post('/api/login', self.loginTestUserWithUsername, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        response = self.client.post('/api/logout', format="json")
        response = self.client.post('/api/login', self.loginTestUserWithEmail, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)

    def test_album_urls(self):
        response = self.client.post('/api/albums', self.testAlbum, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.content)
        response = self.client.get('/api/albums', format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        response = self.client.get('/api/albums/{}'.format(Album.objects.last().id), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        return True

    def test_photos_urls(self):
        response = self.client.post('/api/photos', self.get_testPhoto())
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.content)
        response = self.client.get('/api/photos', format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        response = self.client.get('/api/photos/{}'.format(Photo.objects.last().id), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        response = self.client.post('/api/photos/{}/set_like'.format(Photo.objects.last().id), self.testLike, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        return True

    def test_users_urls(self):
        response = self.client.get('/api/users', format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        response = self.client.get('/api/users/{}'.format(User.objects.last().id), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.content)
        return True
