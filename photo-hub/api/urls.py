from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework.routers import DefaultRouter
from api import views, viewsets

router = DefaultRouter(trailing_slash=False)

router.register(r'albums', viewsets.AlbumViewSet)
router.register(r'photos', viewsets.PhotoViewSet)
router.register(r'users', viewsets.UserViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login', views.LoginView.as_view()),
    url(r'^register', views.RegisterView.as_view()),
    url(r'^logout', views.LogoutView.as_view())
]