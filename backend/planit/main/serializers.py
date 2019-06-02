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
        fields = ('course',)


class TermSerializer(serializers.ModelSerializer):
    courses = PlannedCourseSerializer(many=True)

    class Meta:
        model = Term
        fields = ('name', 'courses')

    def create(self, validated_data):
        courses = validated_data.pop('courses')
        term = Term.objects.create(**validated_data)
        for course in courses:
            PlannedCourse.objects.create(term=term, **course)
        return term


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
