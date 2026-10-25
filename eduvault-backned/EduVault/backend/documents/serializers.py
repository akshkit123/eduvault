from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = [
            "id",
            "verification_id",
            "title",
            "category",
            "file",
            "status",
            "rejection_reason",
            "verified_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "verification_id",
            "status",
            "rejection_reason",
            "verified_at",
            "created_at",
            "updated_at",
        ]

class CommitteeDocumentSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = Document
        fields = [
            "id",
            "verification_id",
            "student_name",
            "student_email",
            "title",
            "category",
            "file",
            "status",
            "rejection_reason",
            "verified_at",
            "created_at",
            "updated_at",
        ]

    def get_student_name(self, obj):
        return obj.user.get_full_name()


class RejectDocumentSerializer(serializers.Serializer):
    rejection_reason = serializers.CharField(
        required=True,
        allow_blank=False
    )


class PublicDocumentVerifySerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    college = serializers.CharField(source="user.college", read_only=True)
    department = serializers.CharField(source="user.department", read_only=True)

    class Meta:
        model = Document
        fields = [
            "id",
            "verification_id",
            "title",
            "category",
            "file",
            "status",
            "verified_at",
            "created_at",
            "student_name",
            "college",
            "department",
        ]

    def get_student_name(self, obj):
        return obj.user.get_full_name() or obj.user.email
        