from rest_framework import serializers
from .models import Job, Application

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id','title','description','location','employment_type','is_active','created_at']

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id','job','full_name','email','phone','cover_letter','cv']
        extra_kwargs = {
            'cv': {'write_only': True},
        }

    def validate_cv(self, file):
        allowed = ['application/pdf',
                   'application/msword',
                   'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if file.size > 5*1024*1024:
            raise serializers.ValidationError("Max CV size is 5MB.")
        if file.content_type not in allowed:
            raise serializers.ValidationError("CV must be PDF or Word file.")
        return file
