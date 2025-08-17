# jobs/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicJobList, ApplyToJob, HRJobViewSet

router = DefaultRouter()
router.register(r'hr/jobs', HRJobViewSet, basename='hr-jobs')  # ← يولّد /hr/jobs/ و /hr/jobs/{id}/

urlpatterns = [
    path('jobs/', PublicJobList.as_view(), name='jobs-list'),        # GET /api/jobs/
    path('jobs/apply/', ApplyToJob.as_view(), name='job-apply'),     # POST /api/jobs/apply/
    path('', include(router.urls)),                                  # ← مهم جداً لإضافة /api/hr/jobs/
]
