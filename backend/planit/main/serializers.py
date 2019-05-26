from rest_framework import serializers
from .models.course_models import Course
from .models.plan_models import Plan, Term, PlannedCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'  # Allows all fields to be serialized


class PlannedCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlannedCourse
        fields = '__all__'


class TermSerializer(serializers.ModelSerializer):
    courses = PlannedCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Term
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    terms = TermSerializer(many=True, read_only=True)

    class Meta:
        model = Plan
        fields = '__all__'

