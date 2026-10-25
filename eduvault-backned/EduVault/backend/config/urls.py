"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from students.views import AlumniListView, PlacementStudentsView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/", include("accounts.urls")),

    path("api/profile/", include("students.urls")),

    path("api/students/", include("students.urls")),

    path("api/alumni/", AlumniListView.as_view(), name="alumni_network_root"),

    path("api/placement/students/", PlacementStudentsView.as_view(), name="placement_students"),

    path("api/committee/", include("students.committee_urls")),

    path("api/documents/", include("documents.urls")),

    path("api/projects/", include("students.project_urls")),

    path("api/internships/", include("students.internship_urls")),

    path(
    "api/committee/",
    include("documents.committee_urls")
    ),
]

from django.urls import re_path
from django.views.static import serve

# Serve media files in development and production
urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]