from django.urls import path

from .views import ProfileView, PublicStudentProfileView, AlumniListView


urlpatterns = [
    path(
        "",
        ProfileView.as_view(),
        name="profile"
    ),
    path(
        "alumni/",
        AlumniListView.as_view(),
        name="alumni_list"
    ),
    path(
        "public/<str:lookup_value>/",
        PublicStudentProfileView.as_view(),
        name="public_student_profile"
    ),
]