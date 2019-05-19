from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple viewset for courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
