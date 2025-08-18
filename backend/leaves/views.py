# backend/leaves/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import LeaveRequest
from .serializers import LeaveRequestSerializer
from .permissions import IsHR, is_hr_user

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated, IsHR]

    def get_queryset(self):
        user = self.request.user
        if is_hr_user(user):
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if not is_hr_user(request.user):
            return Response({'detail': 'Not allowed'}, status=403)
        leave = self.get_object()
        leave.status = LeaveRequest.APPROVED
        leave.save()
        return Response(LeaveRequestSerializer(leave).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        if not is_hr_user(request.user):
            return Response({'detail': 'Not allowed'}, status=403)
        leave = self.get_object()
        leave.status = LeaveRequest.REJECTED
        leave.save()
        return Response(LeaveRequestSerializer(leave).data)
