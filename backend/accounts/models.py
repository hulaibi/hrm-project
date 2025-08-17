from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('applicant','Applicant'),
        ('employee','Employee'),
        ('manager','Manager'),
        ('hr','HR'),
        ('admin','Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='applicant')
    phone = models.CharField(max_length=20, blank=True, null=True)
    # department as FK later to employees.Department

