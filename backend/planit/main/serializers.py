from rest_framework import serializers
from .models import Course, Plan, Term, PlannedCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'  # Allows all fields to be serialized


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = '__all__'


class PlannedCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlannedCourse
        fields = '__all__'
