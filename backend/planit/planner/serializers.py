from rest_framework import serializers

from planit.planner.models import Plan, Term, PlannerCourse


class PlannerCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlannerCourse
        fields = '__all__'


class TermSerializer(serializers.ModelSerializer):
    courses = PlannerCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Term
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    terms = TermSerializer(many=True, read_only=True)

    class Meta:
        model = Plan
        fields = '__all__'
