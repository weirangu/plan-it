from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank
from django.db.models import Q
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
        search_vector = (SearchVector('name', weight='A')
                         + SearchVector('description', weight='C'))
        search_query = SearchQuery(query)
        unique_courses_id = self.get_unique_courses_queryset().values("id")
        ordered = (self.queryset
                   .annotate(rank=SearchRank(search_vector, search_query))
                   .filter(Q(pk__in=unique_courses_id)
                           & (Q(rank__gte=0.6) | Q(code__icontains=query)))
                   .order_by("-rank"))
        return Response(CourseSerializer(ordered, many=True).data[:20])

    def retrieve(self, request, pk=None):
        if len(pk) == 13:
            # pk is in the form CSC148H120189
            code = pk[:8]
            term = pk[8:]
            query = self.queryset.filter(code__exact=code, term__exact=term)
            course = CourseSerializer(get_object_or_404(query))
            return Response(course.data)
        elif len(pk) == 8:
            # pk is in the form CSC148H1, we'll return the most recent
            course = self.get_unique_courses_queryset().get(code=pk)
            return Response(CourseSerializer(course).data)
        else:
            raise Http404

    def get_unique_courses_queryset(self):
        """
        Returns a queryset that only contains the most recent copy of each
        course offering.
        """
        return (self.queryset.order_by("code", "-term")
                .distinct("code"))
