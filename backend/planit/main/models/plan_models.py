from uuid import uuid4

from django.db import models


class Plan(models.Model):
    """ A course plan. Each plan consists of many terms. """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.TextField()


class Term(models.Model):
    """ A term in a plan. Each term consists of many planned courses. """
    # The plan this term belongs to
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE,
                             related_name="terms")
    name = models.CharField(max_length=5)  # In the form YYYYM (e.g. 20191)

    class Meta:
        ordering = ["name"]


class PlannedCourse(models.Model):
    """ A course in a term. """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    term = models.ForeignKey(Term, on_delete=models.CASCADE,
                             related_name="courses")
    index = models.IntegerField()  # The index of this course in the Term

    # A course code is enough for us to get information from the Course table.
    course = models.CharField(max_length=9)

    class Meta:
        ordering = ["index"]
        unique_together = ("index", "term")
