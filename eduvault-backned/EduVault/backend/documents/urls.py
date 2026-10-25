from django.urls import path

from .views import (
    DocumentListCreateView,
    DocumentDetailView,
    PublicDocumentVerifyView,
)

urlpatterns = [
    path(
        "",
        DocumentListCreateView.as_view(),
        name="document-list-create"
    ),
    path(
        "<int:pk>/",
        DocumentDetailView.as_view(),
        name="document-detail"
    ),
    path(
        "public-verify/<str:lookup_value>/",
        PublicDocumentVerifyView.as_view(),
        name="document-public-verify"
    ),
]