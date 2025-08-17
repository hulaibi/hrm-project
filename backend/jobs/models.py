from django.db import models
from django.conf import settings

class Job(models.Model):
    EMP_TYPES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('intern', 'Intern'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=120, blank=True)
    employment_type = models.CharField(max_length=20, choices=EMP_TYPES, default='full_time')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.title


def cv_upload_path(instance, filename):
    return f"cvs/job_{instance.job_id}/{filename}"

class Application(models.Model):
    STATUS = [
        ('new', 'New'),
        ('under_review', 'Under Review'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    cover_letter = models.TextField(blank=True)
    cv = models.FileField(upload_to=cv_upload_path)  # PDF/Doc
    status = models.CharField(max_length=20, choices=STATUS, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.full_name} -> {self.job.title}"
