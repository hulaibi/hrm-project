# backend/leaves/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

def is_hr_user(user):
    return bool(
        getattr(user, "is_staff", False) or
        getattr(user, "role", None) in ("hr", "admin")
    )

class IsHR(BasePermission):
    """
    HR = is_staff=True أو role in ('hr','admin')
    """
    def has_permission(self, request, view):
        # اسمح للكل (المصادقين) بالدخول، ونفلتر في get_queryset & actions
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if is_hr_user(request.user):
            return True
        if request.method in SAFE_METHODS:
            return obj.user_id == request.user.id
        return obj.user_id == request.user.id
