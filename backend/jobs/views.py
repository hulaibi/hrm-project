# jobs/views.py
from rest_framework import generics, status, permissions, viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Job, Application
from .serializers import JobSerializer, ApplicationCreateSerializer
from .permissions import IsHR


# ---------- Public Jobs ----------
class PublicJobList(generics.ListAPIView):
    """
    قائمة الوظائف العامة المتاحة للجميع (is_active=True)
    GET /api/jobs/
    """
    queryset = Job.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# ---------- Apply to Job ----------
class ApplyToJob(generics.CreateAPIView):
    """
    تقديم على وظيفة (متاح للجميع). يدعم رفع CV (multipart).
    POST /api/jobs/apply/
    """
    serializer_class = ApplicationCreateSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        app = serializer.save()
        # لو المستخدم مسجل دخول، اربطه بالطلب
        if request.user and request.user.is_authenticated:
            app.applicant = request.user
            app.save(update_fields=['applicant'])
        return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)


# ---------- HR Job Admin (CRUD) ----------
class HRJobPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class HRJobViewSet(viewsets.ModelViewSet):
    """
    CRUD للوظائف — للـ HR/Admin فقط
    /api/hr/jobs/  [GET, POST]
    /api/hr/jobs/{id}/  [GET, PATCH/PUT, DELETE]
    """
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsHR]
    pagination_class = HRJobPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'location', 'description']
