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
