from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'  # Allows all fields to be serialized

    def create(self, data):
        return Course.objects.create(**data)
