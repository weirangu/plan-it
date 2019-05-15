from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer


class CourseList(generics.ListAPIView):
    """
    Returns data for all courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseInstance(generics.RetrieveAPIView):
    """
    Returns data for a single course.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer