from __future__ import unicode_literals

from django.db import models
from ..login.models import User






class Plan(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    creator = models.ForeignKey(User, related_name='created_plans')
    users = models.ManyToManyField(User, related_name='plans')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PlanManager()