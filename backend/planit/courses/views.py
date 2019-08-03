from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response

from planit.courses.models import Course
from planit.courses.serializers import CourseSerializer


class CourseViewSet(viewsets.ViewSet):
    """
    A viewset for courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def list(self, request):
        query = request.query_params.get('q', None)
        if query is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        results = self.queryset.filter(code__icontains=query).distinct("code")
        return Response(CourseSerializer(results, many=True).data[:20])

    def retrieve(self, request, pk=None):
        if len(pk) == 14:
            # pk is in the form CSC148H1F20189
            code = pk[:9]
            term = pk[9:]
            query = self.queryset.filter(code__exact=code, term__exact=term)
            course = CourseSerializer(get_object_or_404(query))
            return Response(course.data)
        elif len(pk) == 9 or len(pk) == 8:
            # pk is in the form CSC148H1F or CSC148H1, we'll return the most
            # recent
            query = self.queryset.filter(code__contains=pk)
            recent_course = query.order_by('-term').first()
            if recent_course is None:
                raise Http404
            return Response(CourseSerializer(recent_course).data)
        else:
            raise Http404
