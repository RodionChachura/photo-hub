from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework.routers import DefaultRouter
from api import views, viewsets

from rest_framework_extensions.routers import ExtendedSimpleRouter

router = ExtendedSimpleRouter()
(
    router.register(r'users', viewsets.UserViewSet)
          .register(r'albums', viewsets.AlbumViewSet, base_name='users-albums', parents_query_lookups=['user'])
)
(
    router.register(r'users', viewsets.UserViewSet)
          .register(r'photos', viewsets.PhotoViewSet, base_name='users-photos', parents_query_lookups=['user'])
)
router.register(r'albums', viewsets.AlbumViewSet)
router.register(r'photos', viewsets.PhotoViewSet)




urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^token-verify/', verify_jwt_token),
    url(r'^login/', views.LoginView.as_view()),
    url(r'^register/', views.RegisterView.as_view()),
    url(r'^logout/', views.LogoutView.as_view())
]