from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework.routers import DefaultRouter
from api.viewsets import AlbumViewSet, PhotoViewSet, UserViewSet
from api.auth.views import RegisterView, LoginView, LogoutView


router = DefaultRouter(trailing_slash=False)

router.register(r'albums', AlbumViewSet)
router.register(r'photos', PhotoViewSet)
router.register(r'users', UserViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login', LoginView.as_view()),
    url(r'^register', RegisterView.as_view()),
    url(r'^logout', LogoutView.as_view())
]