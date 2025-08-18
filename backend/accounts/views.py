# backend/accounts/views.py
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()


# 🔹 تسجيل مستخدم جديد
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔹 تسجيل الدخول (JWT)
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': getattr(user, 'username', None),
                'email': getattr(user, 'email', None),
                'role': getattr(user, 'role', None),
                'phone': getattr(user, 'phone', None),
                'is_staff': bool(getattr(user, 'is_staff', False)),
            }
        }, status=status.HTTP_200_OK)


# 🔹 معلومات المستخدم الحالي (لاستخدامها في الواجهة مثل /hr/leaves)
#    Requires: Authorization: Bearer <access_token>  أو جلسة مصادقة صالحة
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        u = request.user
        data = {
            "id": u.pk,
            "username": getattr(u, "username", None),
            "email": getattr(u, "email", None),
            "role": getattr(u, "role", None),
            "phone": getattr(u, "phone", None),
            "is_staff": bool(getattr(u, "is_staff", False)),
        }
        return Response(data, status=status.HTTP_200_OK)


# 🔹 عرض/تعديل بروفايل المستخدم الحالي
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
