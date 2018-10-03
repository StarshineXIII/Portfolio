# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from ..login.models import User

# Create your models here.

class ItemManager(models.Manager):
    def add_item(self, postData, user_id):
        errors = []
        if len(postData['newItem']) < 3:
            errors.append('Item must be at least 3 characters long.')

        response = {}

        if errors:
            response['status'] = False
            response['errors'] = errors
        else:
            response['status'] = True
            item = self.create(name = postData['newItem'], creator_id=user_id)
            item.users.add(user_id)
            response['item'] = item
        return response

    def getMyItems(self, user_id):
        return self.filter(users=user_id)
    
    def getOthersItems(self, user_id):
        return self.exclude(users=user_id)
    
    def getItem(self, item_id):
        return self.get(id=item_id)
    
    def theseWishers(self, item_id):
        return self.get(id=item_id).users.all
    
    def trashit(self, item_id):
        this = self.get(id=item_id)
        this.delete()
    
    def removeMe(self, item_id, user_id):
        user = User.objects.get(id=user_id)
        item = Item.objects.get(id=item_id)
        user.items.remove(item)
    
    def likeMe(self, item_id, user_id):
        user = User.objects.get(id=user_id)
        item = Item.objects.get(id=item_id)
        user.items.add(item)

class Item(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(User, related_name='created_items')
    users = models.ManyToManyField(User, related_name='items')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ItemManager()