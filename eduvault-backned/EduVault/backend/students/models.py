from django.conf import settings
from django.db import models


class StudentProfile(models.Model):

    class Visibility(models.TextChoices):
        INSTITUTIONAL = "INSTITUTIONAL", "Institutional"
        PUBLIC = "PUBLIC", "Public"
        PRIVATE = "PRIVATE", "Private"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="student_profile"
    )

    prn_number = models.CharField(
        max_length=50,
        blank=True
    )

    graduation_year = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    cgpa = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        null=True,
        blank=True
    )

    profile_image = models.ImageField(
        upload_to="profile_images/",
        null=True,
        blank=True
    )

    skills = models.JSONField(
        default=list,
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    github = models.URLField(
        blank=True
    )

    portfolio = models.URLField(
        blank=True
    )

    two_factor_enabled = models.BooleanField(
        default=False
    )

    visibility = models.CharField(
        max_length=20,
        choices=Visibility.choices,
        default=Visibility.INSTITUTIONAL
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class GraduationStatus(models.TextChoices):
        ONGOING = "ONGOING", "Ongoing"
        GRADUATED = "GRADUATED", "Graduated"

    graduation_status = models.CharField(
        max_length=20,
        choices=GraduationStatus.choices,
        default=GraduationStatus.ONGOING
    )

    graduation_date = models.DateField(
        null=True,
        blank=True
    )

    current_company = models.CharField(
        max_length=150,
        blank=True,
        default=""
    )

    current_role = models.CharField(
        max_length=150,
        blank=True,
        default=""
    )

    location = models.CharField(
        max_length=150,
        blank=True,
        default=""
    )

    bio = models.TextField(
        blank=True,
        default=""
    )

    is_mentor_available = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.user.email} Profile"


class Project(models.Model):
    class ProjectType(models.TextChoices):
        ACADEMIC = "Academic", "Academic"
        PERSONAL = "Personal", "Personal"
        RESEARCH = "Research", "Research"

    class Status(models.TextChoices):
        IN_PROGRESS = "In Progress", "In Progress"
        COMPLETED = "Completed", "Completed"
        VERIFIED = "Verified", "Verified"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    project_type = models.CharField(
        max_length=50,
        choices=ProjectType.choices,
        default=ProjectType.ACADEMIC
    )
    status = models.CharField(
        max_length=50,
        choices=Status.choices,
        default=Status.COMPLETED
    )
    technologies = models.JSONField(default=list, blank=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.user.email})"


class Internship(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        VERIFIED = "Verified", "Verified"
        COMPLETED = "Completed", "Completed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="internships"
    )
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True, default="Remote")
    start_date = models.CharField(max_length=100, blank=True)
    end_date = models.CharField(max_length=100, blank=True)
    duration = models.CharField(max_length=100, blank=True)
    responsibilities = models.JSONField(default=list, blank=True)
    skills = models.JSONField(default=list, blank=True)
    feedback = models.TextField(blank=True)
    reviewer = models.CharField(max_length=150, blank=True)
    reviewer_role = models.CharField(max_length=150, blank=True)
    status = models.CharField(
        max_length=50,
        choices=Status.choices,
        default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.role} at {self.company} ({self.user.email})"