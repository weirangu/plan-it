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
    # The full course code (e.g. CSC148H1F, or CSCB07H3S), grad courses are 10
    # chars long
    code = models.CharField(max_length=10)
    length = models.CharField(max_length=1, choices=LENGTH)
    name = models.TextField()
    description = models.TextField()
    prerequisites = models.TextField()
    exclusions = models.TextField()

    # The faculty (e.g. Faculty of Arts and Sciences)
    faculty = models.TextField()
    campus = models.CharField(max_length=4, choices=CAMPUS)

    # The year and month offered. Represented in the format YYYYM (e.g. 20191)
    term = models.CharField(max_length=5)
    breadth1 = models.PositiveSmallIntegerField(null=True, choices=BREADTH)

    # Some courses have 2 breadth requirements
    breadth2 = models.PositiveSmallIntegerField(null=True, choices=BREADTH)
