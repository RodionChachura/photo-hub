"""
Definition of urls for photo_hub.
"""
from django.contrib import admin
from django.conf.urls import include, url
import api.urls

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
]
