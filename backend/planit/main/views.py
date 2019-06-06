from rest_framework import viewsets
from .models.course_models import Course
from .models.plan_models import Plan, Term, PlannedCourse
from .serializers import (CourseSerializer, PlanSerializer, TermSerializer,
                          PlannedCourseSerializer)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple viewset for courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class PlanViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for Plans.
    """
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class TermViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for Plans.
    """
    queryset = Term.objects.all()
    serializer_class = TermSerializer


class PlannedCourseViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for Plans.
    """
    queryset = PlannedCourse.objects.all()
    serializer_class = PlannedCourseSerializer
