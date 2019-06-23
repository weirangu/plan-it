from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

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

    @action(detail=True, methods=['put'])
    def move(self, request, pk=None):
        """
        Moves a PlannedCourse in the term. This updates the indices of all
        affected PlannedCourses.
        """
        course = PlannedCourse.objects.get(id__exact=pk)
        new_index = request.data["index"]

        if "term" not in request.data:
            terms = [self.move_course(course, new_index)]
        else:
            terms = self.move_to_new_term(course, new_index,
                                          request.data["term"])

        resp = {"updatedTerms": TermSerializer(terms, many=True).data}
        return Response(resp, status=status.HTTP_200_OK)

    def move_to_new_term(self, course, index, term):
        """
        Moves a course to a new term.
        Returns the terms that were modified.
        """
        old_term = course.term.id  # We'll need it when we get the old term data
        PlannedCourse.objects \
            .filter(term__exact=course.term, index__gt=course.index) \
            .update(index=F('index') - 1)

        PlannedCourse.objects \
            .filter(term__exact=term, index__gte=index) \
            .update(index=F('index') + 1)
        course.term = Term.objects.get(id__exact=term)
        course.index = index
        course.save()

        return [Term.objects.get(id__exact=old_term),
                Term.objects.get(id__exact=term)]

    def move_course(self, course, index):
        """
        Moves a course without changing terms.
        Returns the term that was modified.
        """
        courses_in_term = PlannedCourse.objects \
            .filter(term__exact=course.term)
        if course.index < index:
            # The course was moved forwards
            courses_in_term \
                .filter(index__lte=index, index__gt=course.index) \
                .update(index=F('index') - 1)
        else:
            # The course was moved backwards, or didn't move
            courses_in_term \
                .filter(index__lt=course.index, index__gte=index) \
                .update(index=F('index') + 1)

        course.index = index
        course.save()
        return Term.objects.get(id__exact=course.term.id)
