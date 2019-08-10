from uuid import uuid4

from django.db import models


class Plan(models.Model):
    """ A course plan. Each plan consists of many terms. """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.TextField()


class Term(models.Model):
    """ A term in a plan. Each term consists of many planned courses. """
    valid_months = [
        (1, "Winter"),
        (5, "Summer F"),
        (7, "Summer S"),
        (9, "Fall")
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE,
                             related_name='terms')
    year = models.SmallIntegerField()
    month = models.SmallIntegerField(choices=valid_months)

    class Meta:
        ordering = ['year', 'month']


class PlannerCourse(models.Model):
    """ A course in a term. """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    term = models.ForeignKey(Term, on_delete=models.CASCADE,
                             related_name='courses')
    index = models.SmallIntegerField()  # The index of this course in the Term

    # A course code is enough for us to get information from the Course table.
    course = models.CharField(max_length=9)

    class Meta:
        ordering = ['index']
