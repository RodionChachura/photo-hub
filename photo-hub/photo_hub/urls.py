"""
Definition of urls for photo_hub.
"""
from django.contrib import admin
from django.conf.urls import include, url
import api.urls
import frontend.urls

from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
    url(r'^', include(frontend.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
