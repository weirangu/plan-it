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
        exclude = ('term',)  # Term is set by the Term serializer, not the user


class TermSerializer(serializers.ModelSerializer):
    courses = PlannedCourseSerializer(many=True)

    class Meta:
        model = Term
        exclude = ('plan',)  # Plan is set by the Plan serializer, not the user

    def create(self, validated_data):
        courses = validated_data.pop('courses')
        term = Term.objects.create(**validated_data)
        for course in courses:
            PlannedCourse.objects.create(term=term, **course)
        return term

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['courses'] = {course.pop('id'): course for course in res['courses']}
        return res


class PlanSerializer(serializers.ModelSerializer):
    terms = TermSerializer(many=True)

    class Meta:
        model = Plan
        fields = '__all__'

    def create(self, validated_data):
        terms = validated_data.pop('terms')
        plan = Plan.objects.create(**validated_data)
        for term in terms:
            # Terms themselves have nested properties, so we need to create a
            # TermSerializer and have it create a Term for us.
            serializer = TermSerializer(data=term)

            # calling is_valid is required before calling save
            serializer.is_valid()
            serializer.save(plan=plan)
        return plan

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['terms'] = {term.pop('id'): term for term in res['terms']}
        return res
