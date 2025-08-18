from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .models import LeaveRequest
from .serializers import LeaveRequestSerializer
from .permissions import IsHR

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated, IsHR]

    def get_queryset(self):
        user = self.request.user
        # HR يشوف الكل
        if user.is_staff:
            return LeaveRequest.objects.all()
        # موظف: يشوف طلباته فقط
        return LeaveRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'detail': 'Not allowed'}, status=403)
        leave = self.get_object()
        leave.status = LeaveRequest.APPROVED
        leave.save()
        return Response(LeaveRequestSerializer(leave).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'detail': 'Not allowed'}, status=403)
        leave = self.get_object()
        leave.status = LeaveRequest.REJECTED
        leave.save()
        return Response(LeaveRequestSerializer(leave).data)
