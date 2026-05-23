from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    instructor = models.CharField(max_length=100)
    schedule = models.CharField(max_length=100)
    capacity = models.IntegerField()
    registration_status = models.CharField(
        max_length=20,
        default="Open"
    )

    def __str__(self):
        return self.title