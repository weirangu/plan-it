from django.db import models


class Course(models.Model):
    CAMPUS = (
        ('UTSG', 'St. George'),
        ('UTM', 'Mississauga'),
        ('UTSC', 'Scarborough')
    )

    # The ID is really the course code + term
    id = models.CharField(max_length=14, primary_key=True)

    code = models.CharField(max_length=9)
    name = models.TextField()
    description = models.TextField()
    faculty = models.TextField()
    department = models.TextField()
    prerequisites = models.TextField()
    exclusions = models.TextField()
    level = models.PositiveSmallIntegerField()
    campus = models.CharField(max_length=4, choices=CAMPUS)
    term = models.CharField(max_length=5)
    breadth1 = models.PositiveSmallIntegerField()

    # Some courses have 2 breadth requirements
    breadth2 = models.PositiveSmallIntegerField(null=True)


# The following models are for the course planner.
class Plan(models.Model):
    """ A course plan. Each plan consists of many terms. """
    name = models.TextField()


class Term(models.Model):
    """ A term in a plan. Each term consists of many planned courses. """
    # The plan this term belongs to
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    term = models.CharField(max_length=5)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["plan", "term"], name="unique_terms")
        ]


class PlannedCourse(models.Model):
    """ A course in a term. """
    term = models.ForeignKey(Term, models.CASCADE)

    # A course code is enough for us to get information from the Course table.
    course = models.CharField(max_length=9)
