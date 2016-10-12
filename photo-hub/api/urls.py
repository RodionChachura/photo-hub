from django.conf.urls import include, url
from .views import RegisterView, LogoutView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'photos', views.PhotoViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login/', obtain_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^token-verify/', verify_jwt_token),
    url(r'^register/', RegisterView.as_view()),
    url(r'^logout/', LogoutView.as_view()),
]