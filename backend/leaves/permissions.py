from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsHR(BasePermission):
    """
    اعتبرنا HR هو أي مستخدم عنده is_staff=True.
    تقدر تغيّرها لاحقًا لمجموعة/Role.
    """
    def has_permission(self, request, view):
        # HR يقدر يوصل لكل الـactions
        if request.user and request.user.is_authenticated and request.user.is_staff:
            return True
        # غير الـHR: يسمح له بالـlist/create/retrieve الخاصة به فقط عبر get_queryset
        # نرجّع True هنا و ننظّم عبر get_queryset
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        # المستخدم العادي فقط على طلباته
        if request.method in SAFE_METHODS:
            return obj.user_id == request.user.id
        # تعديل/حذف لمالكه فقط (لو حبيت تفتحهم)
        return obj.user_id == request.user.id
