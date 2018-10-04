from __future__ import unicode_literals

from django.db import models
from ..login.models import User
from datetime import date


class ItemManager(models.Manager):
    def add_trip(self, postData, user_id):
        errors = []
        if len(postData['destination']) < 1:
            errors.append('Must enter a destination.')

        response = {}

        if errors:
            response['status'] = False
            response['errors'] = errors
        else:
            response['status'] = True
            trip = self.create(name = postData['destination'], creator_id=user_id)
            trip.users.add(user_id)
            response['trip'] = trip
        return response

    def add_desc(self, postData, user_id):
        errors = []
        if len(postData['description']) <1:
            errors.append('Please enter travel plans.')

        response = {}

        if errors:
            response['status'] = False
            response['errors'] = errors
        else:
            response['status'] = True
            desc = self.create(name = postData['description'], creator_id=user_id)
            desc.users.add(user_id)
            response['desc'] = desc
        return response
        





    def trashit(self, item_id):
        this = self.get(id=item_id)
        this.delete()


class Item(models.Model):
    name = models.CharField(max_length=255)
    # desc = models.CharField(max_length=255)
    creator = models.ForeignKey(User, related_name='created_items')
    users = models.ManyToManyField(User, related_name='items')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ItemManager()