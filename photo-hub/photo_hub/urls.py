"""
Definition of urls for photo_hub.
"""
from django.contrib import admin
from django.conf.urls import include, url
import api.urls
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name='index'), 
    url(r'^(?P<path>.*)/$', TemplateView.as_view(template_name="index.html"), name='index'),  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
