from rest_framework import serializers

from .models import StudentProfile, Project, Internship


class StudentProfileSerializer(serializers.ModelSerializer):

    academic = serializers.SerializerMethodField()
    social = serializers.SerializerMethodField()
    preferences = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "academic",
            "skills",
            "social",
            "preferences",
        ]

    def get_academic(self, obj):
        return {
            "college": obj.user.college,
            "department": obj.user.department,
            "prn_number": obj.prn_number,
            "graduation_year": obj.graduation_year,
            "cgpa": obj.cgpa,
            "profile_image": (
                obj.profile_image.url
                if obj.profile_image
                else None
            ),
        }

    def get_social(self, obj):
        return {
            "linkedin": obj.linkedin,
            "github": obj.github,
            "portfolio": obj.portfolio,
        }

    def get_preferences(self, obj):
        return {
            "two_factor_enabled": obj.two_factor_enabled,
            "visibility": obj.visibility,
        }

    def update(self, instance, validated_data):

        request = self.context.get("request")

        # Academic fields
        if "prn_number" in request.data:
            instance.prn_number = request.data.get("prn_number")

        if "graduation_year" in request.data:
            instance.graduation_year = request.data.get("graduation_year")

        if "cgpa" in request.data:
            instance.cgpa = request.data.get("cgpa")

        # Skills
        if "skills" in request.data:
            instance.skills = request.data.get("skills")

        # Social links
        if "linkedin" in request.data:
            instance.linkedin = request.data.get("linkedin")

        if "github" in request.data:
            instance.github = request.data.get("github")

        if "portfolio" in request.data:
            instance.portfolio = request.data.get("portfolio")

        # Preferences
        if "two_factor_enabled" in request.data:
            instance.two_factor_enabled = request.data.get(
                "two_factor_enabled"
            )

        if "visibility" in request.data:
            instance.visibility = request.data.get("visibility")

        # Profile image
        if "profile_image" in request.FILES:
            instance.profile_image = request.FILES["profile_image"]

        instance.save()

        return instance

class GraduateStudentSerializer(serializers.Serializer):
    graduation_date = serializers.DateField()


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "project_type",
            "status",
            "technologies",
            "github_url",
            "live_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = [
            "id",
            "role",
            "company",
            "location",
            "start_date",
            "end_date",
            "duration",
            "responsibilities",
            "skills",
            "feedback",
            "reviewer",
            "reviewer_role",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class PublicStudentProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="user.id")
    full_name = serializers.SerializerMethodField()
    email = serializers.CharField(source="user.email")
    mobile_number = serializers.CharField(source="user.mobile_number")
    college = serializers.CharField(source="user.college")
    department = serializers.CharField(source="user.department")
    prn_number = serializers.CharField()
    graduation_year = serializers.IntegerField()
    cgpa = serializers.DecimalField(max_digits=4, decimal_places=2)
    profile_image = serializers.SerializerMethodField()
    skills = serializers.JSONField()
    linkedin = serializers.URLField()
    github = serializers.URLField()
    portfolio = serializers.URLField()
    graduation_status = serializers.CharField()
    graduation_date = serializers.DateField()
    verified_documents = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()
    internships = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        name = f"{obj.user.first_name} {obj.user.last_name}".strip()
        return name if name else obj.user.email

    def get_profile_image(self, obj):
        return obj.profile_image.url if obj.profile_image else None

    def get_verified_documents(self, obj):
        from documents.models import Document
        docs = Document.objects.filter(user=obj.user, status="VERIFIED").order_by("-verified_at", "-created_at")
        return [
            {
                "id": d.id,
                "title": d.title,
                "category": d.category,
                "file": d.file.url if d.file else None,
                "verification_id": d.verification_id,
                "verified_at": d.verified_at,
                "created_at": d.created_at,
            }
            for d in docs
        ]

    def get_projects(self, obj):
        projects = Project.objects.filter(user=obj.user).order_by("-created_at")
        return ProjectSerializer(projects, many=True).data

    def get_internships(self, obj):
        internships = Internship.objects.filter(user=obj.user).order_by("-created_at")
        return InternshipSerializer(internships, many=True).data

    def get_stats(self, obj):
        from documents.models import Document
        verified_count = Document.objects.filter(user=obj.user, status="VERIFIED").count()
        projects_count = Project.objects.filter(user=obj.user).count()
        internships_count = Internship.objects.filter(user=obj.user).count()
        return {
            "verified_credentials": verified_count,
            "projects": projects_count,
            "internships": internships_count,
            "verified_by_committee": verified_count > 0,
        }


class AlumniSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    full_name = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()
    email = serializers.CharField(source="user.email", read_only=True)
    college = serializers.CharField(source="user.college", read_only=True)
    department = serializers.CharField(source="user.department", read_only=True)
    role = serializers.CharField(source="user.role", read_only=True)
    profile_image = serializers.SerializerMethodField()
    graduation_display = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    current_role = serializers.SerializerMethodField()
    location_display = serializers.SerializerMethodField()
    skills_list = serializers.SerializerMethodField()
    verified_count = serializers.SerializerMethodField()
    public_profile_url = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "user_id",
            "full_name",
            "initials",
            "email",
            "college",
            "department",
            "role",
            "prn_number",
            "profile_image",
            "graduation_year",
            "graduation_status",
            "graduation_date",
            "graduation_display",
            "company",
            "current_role",
            "location_display",
            "bio",
            "skills_list",
            "linkedin",
            "github",
            "portfolio",
            "is_mentor_available",
            "verified_count",
            "public_profile_url",
        ]

    def get_full_name(self, obj):
        name = f"{obj.user.first_name} {obj.user.last_name}".strip()
        return name if name else (obj.user.username or obj.user.email.split("@")[0])

    def get_initials(self, obj):
        fn = obj.user.first_name.strip() if obj.user.first_name else ""
        ln = obj.user.last_name.strip() if obj.user.last_name else ""
        if fn and ln:
            return f"{fn[0]}{ln[0]}".upper()
        name = self.get_full_name(obj)
        parts = name.split()
        if len(parts) >= 2 and parts[0] and parts[1]:
            return f"{parts[0][0]}{parts[1][0]}".upper()
        return name[:2].upper() if name else "AL"

    def get_profile_image(self, obj):
        return obj.profile_image.url if obj.profile_image else None

    def get_graduation_display(self, obj):
        if obj.graduation_year:
            return f"Class of {obj.graduation_year}"
        if obj.graduation_date:
            return f"Class of {obj.graduation_date.year}"
        return "Graduated Alumni"

    def get_company(self, obj):
        if obj.current_company:
            return obj.current_company
        latest_internship = Internship.objects.filter(user=obj.user).order_by("-start_date", "-created_at").first()
        if latest_internship and latest_internship.company_name:
            return latest_internship.company_name
        return "Tech Industry"

    def get_current_role(self, obj):
        if obj.current_role:
            return obj.current_role
        latest_internship = Internship.objects.filter(user=obj.user).order_by("-start_date", "-created_at").first()
        if latest_internship and latest_internship.role_title:
            return latest_internship.role_title
        return "Software Engineer"

    def get_location_display(self, obj):
        if obj.location:
            return obj.location
        return "Pune, India"

    def get_skills_list(self, obj):
        if isinstance(obj.skills, list) and obj.skills:
            return obj.skills
        return ["Engineering", "Problem Solving", "Mentorship"]

    def get_verified_count(self, obj):
        from documents.models import Document
        return Document.objects.filter(user=obj.user, status="VERIFIED").count()

    def get_public_profile_url(self, obj):
        return f"/student/{obj.user.id}"