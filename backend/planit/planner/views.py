from django.db import transaction
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from planit.planner.models import Plan, Term, PlannerCourse
from planit.planner.serializers import PlanSerializer, TermSerializer, \
    PlannerCourseSerializer


class PlanViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for Plans.
    """
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class TermViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for Terms.
    """
    queryset = Term.objects.all()
    serializer_class = TermSerializer


class PlannerCourseViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for PlannerCourses.
    """
    queryset = PlannerCourse.objects.all()
    serializer_class = PlannerCourseSerializer

    @action(detail=True, methods=['put'])
    def move(self, request, pk=None):
        """
        Moves a PlannerCourses in the term. This updates the indices of all
        affected PlannerCourses.
        """
        course = PlannerCourse.objects.get(pk=pk)
        new_index = request.data['index']

        if 'term' not in request.data or request.data['term'] == course.term:
            self.move_course(course, new_index)
        else:
            self.move_to_new_term(course, new_index, request.data['term'])
        return Response(status=status.HTTP_200_OK)

    @transaction.atomic
    def move_to_new_term(self, course, index, term):
        """
        Moves a course to a new term.
        Returns the terms that were modified.
        """
        old_index = course.index
        old_term = course.term.id  # We'll need it when we get the old term data

        PlannerCourse.objects \
            .filter(term__exact=course.term, index__gt=old_index) \
            .update(index=F('index') - 1)

        PlannerCourse.objects \
            .filter(term__exact=term, index__gte=index) \
            .update(index=F('index') + 1)

        course.term = Term.objects.get(pk=term)
        course.index = index
        course.save()

    @transaction.atomic
    def move_course(self, course, index):
        """
        Moves a course without changing terms.
        Returns the term that was modified.
        """
        old_index = course.index

        courses_in_term = PlannerCourse.objects \
            .filter(term__exact=course.term)
        if old_index < index:
            # The course was moved forwards
            courses_in_term \
                .filter(index__lte=index, index__gt=old_index) \
                .update(index=F('index') - 1)
        else:
            # The course was moved backwards, or didn't move
            courses_in_term \
                .filter(index__lt=old_index, index__gte=index) \
                .update(index=F('index') + 1)

        course.index = index
        course.save()
