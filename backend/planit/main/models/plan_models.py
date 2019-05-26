from django.db import models


class Plan(models.Model):
    """ A course plan. Each plan consists of many terms. """
    name = models.TextField()


class Term(models.Model):
    """ A term in a plan. Each term consists of many planned courses. """
    # The plan this term belongs to
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE,
                             related_name="terms")
    term = models.CharField(max_length=5)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["plan", "term"], name="unique_terms")
        ]


class PlannedCourse(models.Model):
    """ A course in a term. """
    term = models.ForeignKey(Term, on_delete=models.CASCADE,
                             related_name="courses")

    # A course code is enough for us to get information from the Course table.
    course = models.CharField(max_length=9)
