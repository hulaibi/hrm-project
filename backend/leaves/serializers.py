from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = LeaveRequest
        fields = ['id', 'user', 'user_username', 'start_date', 'end_date', 'reason', 'status', 'created_at']
        read_only_fields = ['status', 'user', 'created_at']
