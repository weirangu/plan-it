from django.db import models


class Course(models.Model):
    LENGTH = (
        ("H", "Half Year"),
        ("Y", 'Full Year')
    )

    CAMPUS = (
        ("UTSG", "St. George"),
        ('UTM', "Mississauga"),
        ("UTSC", "Scarborough")
    )

    BREADTH = (
        (1, "Creative and Cultural Representations"),
        (2, "Thought, Belief, and Behaviour"),
        (3, "Society and Its Institutions"),
        (4, "Living Things and Their Environment"),
        (5, "The Physical and Mathematical Universes")
    )
    # The 3 letter department code (e.g. CSC)
    department = models.CharField(max_length=3)

    # The course number (e.g. 148 for CSC148, or B07 for CSCB07)
    number = models.CharField(max_length=3)
    length = models.CharField(choices=LENGTH)
    name = models.TextField()
    description = models.TextField()
    prerequisites = models.TextField()
    exclusions = models.TextField()
    campus = models.CharField(choices=CAMPUS)

    # The year and month offered. Represented in the format YYYYM (e.g. 20191)
    term = models.CharField(max_length=5)
    breadth1 = models.PositiveSmallIntegerField(null=True, choices=BREADTH)

    # Some courses have 2 breadth requirements
    breadth2 = models.PositiveSmallIntegerField(null=True, choices=BREADTH)

    class Meta:
        unique_together = [["department", "number", "term"]]
