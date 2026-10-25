from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q

from .models import StudentProfile, Project, Internship
from .serializers import (
    StudentProfileSerializer,
    GraduateStudentSerializer,
    ProjectSerializer,
    InternshipSerializer,
    PublicStudentProfileSerializer,
    AlumniSerializer,
)
from django.db import transaction
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsCommittee, IsPlacementOrCommittee


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = StudentProfile.objects.get_or_create(
            user=self.request.user
        )

        return profile



User = get_user_model()


class GraduateStudentView(APIView):
    permission_classes = [IsAuthenticated, IsCommittee]

    @transaction.atomic
    def patch(self, request, student_id):
        try:
            student = User.objects.get(id=student_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if student.role != "STUDENT":
            return Response(
                {"error": "Only students can be graduated."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = GraduateStudentSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        profile, created = StudentProfile.objects.get_or_create(
            user=student
        )

        profile.graduation_status = "GRADUATED"
        profile.graduation_date = serializer.validated_data["graduation_date"]
        profile.save()

        student.role = "ALUMNI"
        student.save(update_fields=["role"])

        return Response(
            {
                "message": "Student graduated successfully.",
                "user_id": student.id,
                "role": student.role,
                "graduation_status": profile.graduation_status,
                "graduation_date": profile.graduation_date,
            },
            status=status.HTTP_200_OK
        )    

class CommitteeStudentsView(APIView):
    permission_classes = [IsAuthenticated, IsCommittee]

    def get(self, request):
        students = User.objects.filter(role="STUDENT")

        data = []

        for student in students:
            profile = StudentProfile.objects.filter(
                user=student
            ).first()

            data.append({
                "id": student.id,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "email": student.email,
                "role": student.role,
                "graduation_status": (
                    profile.graduation_status
                    if profile
                    else "ONGOING"
                ),
                "graduation_date": (
                    profile.graduation_date
                    if profile
                    else None
                ),
            })

        return Response(data)


# =====================================================
# PROJECT VIEWS
# =====================================================

class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


# =====================================================
# INTERNSHIP VIEWS
# =====================================================

class InternshipListCreateView(generics.ListCreateAPIView):
    serializer_class = InternshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Internship.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class InternshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InternshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Internship.objects.filter(user=self.request.user)


class PublicStudentProfileView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, lookup_value):
        user_query = Q(role__in=["STUDENT", "ALUMNI"])
        if lookup_value.isdigit():
            user_query &= (Q(id=int(lookup_value)) | Q(student_profile__prn_number=lookup_value))
        else:
            user_query &= (Q(email__iexact=lookup_value) | Q(student_profile__prn_number__iexact=lookup_value))

        user = User.objects.filter(user_query).first()
        if not user:
            return Response(
                {"error": "Student profile not found.", "valid": False},
                status=status.HTTP_404_NOT_FOUND
            )

        profile, _ = StudentProfile.objects.get_or_create(user=user)
        serializer = PublicStudentProfileSerializer(profile)
        return Response({
            "valid": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class AlumniListView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        search_query = request.query_params.get("search", "").strip()
        dept_filter = request.query_params.get("department", "").strip()
        filter_type = request.query_params.get("filter", "").strip()

        # Target all users who are ALUMNI or have graduated
        alumni_users = User.objects.filter(
            Q(role="ALUMNI") | Q(student_profile__graduation_status="GRADUATED")
        ).distinct()

        # Ensure profiles exist for these alumni
        for u in alumni_users:
            StudentProfile.objects.get_or_create(user=u)

        profiles = StudentProfile.objects.filter(
            Q(user__role="ALUMNI") | Q(graduation_status="GRADUATED")
        ).select_related("user").order_by("-graduation_year", "-graduation_date", "user__first_name")

        # Distinct departments for filtering
        raw_departments = list(
            User.objects.filter(
                Q(role="ALUMNI") | Q(student_profile__graduation_status="GRADUATED")
            ).values_list("department", flat=True).distinct()
        )
        departments = sorted(list(set([d.strip() for d in raw_departments if d and d.strip()])))

        # Search across name, email, department, college, company, role, skills, location
        if search_query:
            profiles = profiles.filter(
                Q(user__first_name__icontains=search_query) |
                Q(user__last_name__icontains=search_query) |
                Q(user__email__icontains=search_query) |
                Q(user__department__icontains=search_query) |
                Q(user__college__icontains=search_query) |
                Q(current_company__icontains=search_query) |
                Q(current_role__icontains=search_query) |
                Q(location__icontains=search_query) |
                Q(skills__icontains=search_query)
            )

        # Department filter
        if dept_filter and dept_filter.lower() != "all":
            profiles = profiles.filter(user__department__iexact=dept_filter)

        # Filter by role keyword (e.g. Engineer, Designer, Scientist, Manager)
        if filter_type and filter_type.lower() != "all":
            profiles = profiles.filter(
                Q(current_role__icontains=filter_type) |
                Q(current_company__icontains=filter_type) |
                Q(user__department__icontains=filter_type)
            )

        serializer = AlumniSerializer(profiles, many=True)

        # Compute dynamic statistics
        all_alumni_count = StudentProfile.objects.filter(
            Q(user__role="ALUMNI") | Q(graduation_status="GRADUATED")
        ).count()

        unique_companies = set()
        for p in profiles:
            if p.current_company:
                unique_companies.add(p.current_company.lower().strip())
        companies_count = max(len(unique_companies), 1)

        from documents.models import Document
        verified_count = Document.objects.filter(
            user__in=alumni_users,
            status="VERIFIED"
        ).values("user").distinct().count()

        return Response({
            "count": len(serializer.data),
            "stats": {
                "total_alumni": all_alumni_count,
                "companies": companies_count,
                "departments": len(departments),
                "verified_alumni": verified_count,
            },
            "departments": departments,
            "results": serializer.data,
        }, status=status.HTTP_200_OK)


class PlacementStudentsView(APIView):
    permission_classes = [IsPlacementOrCommittee]

    def get(self, request):
        search_query = request.query_params.get("search", "").strip()
        dept_filter = request.query_params.get("department", "").strip()
        min_cgpa_str = request.query_params.get("min_cgpa", "").strip()
        status_filter = request.query_params.get("status", "").strip()
        verified_only = request.query_params.get("verified_only", "").lower() in ["true", "1"]

        candidates = User.objects.filter(role__in=["STUDENT", "ALUMNI"]).distinct()

        for u in candidates:
            StudentProfile.objects.get_or_create(user=u)

        profiles = StudentProfile.objects.filter(
            user__role__in=["STUDENT", "ALUMNI"]
        ).select_related("user").order_by("-cgpa", "user__first_name")

        raw_departments = list(candidates.values_list("department", flat=True).distinct())
        departments = sorted(list(set([d.strip() for d in raw_departments if d and d.strip()])))

        if search_query:
            profiles = profiles.filter(
                Q(user__first_name__icontains=search_query) |
                Q(user__last_name__icontains=search_query) |
                Q(user__email__icontains=search_query) |
                Q(prn_number__icontains=search_query) |
                Q(user__department__icontains=search_query) |
                Q(skills__icontains=search_query)
            )

        if dept_filter and dept_filter.lower() != "all":
            profiles = profiles.filter(user__department__iexact=dept_filter)

        if status_filter and status_filter.lower() != "all":
            profiles = profiles.filter(graduation_status__iexact=status_filter)

        if min_cgpa_str:
            try:
                min_cgpa = float(min_cgpa_str)
                profiles = profiles.filter(cgpa__gte=min_cgpa)
            except ValueError:
                pass

        from documents.models import Document

        results = []
        total_cgpa_sum = 0
        valid_cgpa_count = 0
        verified_candidates_count = 0
        placement_ready_count = 0

        for p in profiles:
            user = p.user
            verified_docs = Document.objects.filter(user=user, status="VERIFIED").count()
            proj_count = Project.objects.filter(user=user).count()
            intern_count = Internship.objects.filter(user=user).count()
            cgpa_val = float(p.cgpa) if p.cgpa else None

            if cgpa_val is not None:
                total_cgpa_sum += cgpa_val
                valid_cgpa_count += 1

            if verified_docs > 0:
                verified_candidates_count += 1

            is_ready = bool((cgpa_val and cgpa_val >= 6.5) and verified_docs > 0)
            if is_ready:
                placement_ready_count += 1

            if verified_only and verified_docs == 0:
                continue

            full_name = f"{user.first_name} {user.last_name}".strip() or user.email.split("@")[0]

            results.append({
                "id": user.id,
                "full_name": full_name,
                "email": user.email,
                "mobile_number": user.mobile_number,
                "college": user.college,
                "department": user.department,
                "prn_number": p.prn_number or f"EV-{user.id}",
                "cgpa": cgpa_val,
                "graduation_status": p.graduation_status,
                "graduation_year": p.graduation_year or (p.graduation_date.year if p.graduation_date else None),
                "verified_credentials": verified_docs,
                "projects_count": proj_count,
                "internships_count": intern_count,
                "skills": p.skills if isinstance(p.skills, list) else [],
                "placement_ready": is_ready,
                "candidate_dossier_url": f"/candidate/{user.id}",
                "public_profile_url": f"/student/{user.id}",
            })

        avg_cgpa = round(total_cgpa_sum / valid_cgpa_count, 2) if valid_cgpa_count > 0 else 0.0

        return Response({
            "count": len(results),
            "stats": {
                "total_candidates": len(results),
                "placement_ready": placement_ready_count,
                "verified_candidates": verified_candidates_count,
                "avg_cgpa": avg_cgpa,
                "departments_count": len(departments),
            },
            "departments": departments,
            "results": results,
        }, status=status.HTTP_200_OK)