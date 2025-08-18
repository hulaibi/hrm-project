from django.contrib import admin
from .models import LeaveRequest

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'start_date', 'end_date', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'reason')
