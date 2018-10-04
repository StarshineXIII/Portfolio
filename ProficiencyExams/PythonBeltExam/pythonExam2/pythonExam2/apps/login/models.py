from __future__ import unicode_literals
import re, bcrypt
from django.db import models
from datetime import date


class UserManager(models.Manager):
    def add_user(self, data):
        errors = []
        if len(data['name']) < 3:
            errors.append('Name must be at least 3 characters long.')
        if len(data['alias']) < 3:
            errors.append('Username must be at least 3 characters long.')
        if len(data['password']) < 8:
            errors.append('Password must be at least 8 characters long.')
        if data['password'] != data['confirm']:
            errors.append('Password did not match Confirm')
        if self.filter(alias=data['alias']):
            errors.append('Username already exists')
        if not data['theDate'] <= str(date.today()):
            errors.append('Hire Date must be in past')
        if not data['theDate']:
            errors.append('Hire Date must be entered')

        response = {}

        if errors:
            response['status'] = False
            response['errors'] = errors
        else:
            response['status'] = True
            hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
            user = self.create(name = data['name'], alias = data['alias'], password = hashed_password, dob=data['dob'])
            response['user'] = user
        return response
    def check_user(self, data):
        user = self.filter(alias=data['alias'])
        response = {}
        if user:
            if bcrypt.checkpw(data['password'].encode(), user[0].password.encode()):
                response['status'] = True
                response['user'] = user[0]
            else:
                response['status'] = False
                response['errors'] = 'Invalid Username/password combination.'
        else:
            response['status'] = False
            response['errors'] = 'Username does not exist'
        return response

    def getUser(self, user_id):
        return self.get(id=user_id)
        
class User(models.Model):
    name = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    theDate = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()