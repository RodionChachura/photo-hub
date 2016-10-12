from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_jwt.settings import api_settings
from .serializers import RegisterSerializer

class UserTest(TestCase):

    USERS = {
        "usertest": {
           "username": "UserTestUser",
           "email": "UsertTestUser@mail.com",
           "password": "UserTestPassword",
           "confirm_password": "UserTestPassword",
        }
    }
    def setUp(self):
        self.client = APIClient()

    def test_register_then_login(self):
        responce = self.client.post('/api/register/', self.USERS["usertest"], format="json")
        self.assertEqual(responce.status_code, status.HTTP_201_CREATED)
        responce = self.client.post('/api/login/', self.USERS["usertest"], format="json")
        self.assertEqual(responce.status_code, status.HTTP_200_OK)