# jobs/permissions.py
from rest_framework import permissions

class IsHR(permissions.BasePermission):
    """
    يسمح فقط لمن دوره hr أو admin
    """
    def has_permission(self, request, view):
        u = getattr(request, "user", None)
        role = getattr(u, "role", None)
        return bool(u and getattr(u, "is_authenticated", False) and role in ("hr", "admin"))
