from django.db import transaction
from django.db.models import F
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models.course_models import Course
from .models.plan_models import Plan, Term, PlannedCourse
from .serializers import (CourseSerializer, PlanSerializer, TermSerializer,
                          PlannedCourseSerializer)


class CourseViewSet(viewsets.ViewSet):
    """
    A viewset for courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, pk=None, **kwargs):
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
            recent_course = query.order_by("-term").first()
            if recent_course is None:
                raise Http404
            return Response(CourseSerializer(recent_course).data)
        else:
            raise Http404


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
        course = PlannedCourse.objects.get(pk=pk)
        new_index = request.data["index"]

        if "term" not in request.data or request.data["term"] == course.term:
            terms = [self.move_course(course, new_index)]
        else:
            terms = self.move_to_new_term(course, new_index,
                                          request.data["term"])

        resp = {"updatedTerms": TermSerializer(terms, many=True).data}
        return Response(resp, status=status.HTTP_200_OK)

    @transaction.atomic
    def move_to_new_term(self, course, index, term):
        """
        Moves a course to a new term.
        Returns the terms that were modified.
        """
        old_index = course.index
        old_term = course.term.id  # We'll need it when we get the old term data

        PlannedCourse.objects \
            .filter(term__exact=course.term, index__gt=old_index) \
            .update(index=F('index') - 1)

        PlannedCourse.objects \
            .filter(term__exact=term, index__gte=index) \
            .update(index=F('index') + 1)

        course.term = Term.objects.get(pk=term)
        course.index = index
        course.save()

        return [Term.objects.get(pk=old_term),
                Term.objects.get(pk=term)]

    @transaction.atomic
    def move_course(self, course, index):
        """
        Moves a course without changing terms.
        Returns the term that was modified.
        """
        old_index = course.index

        courses_in_term = PlannedCourse.objects \
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
        return Term.objects.get(pk=course.term.id)
