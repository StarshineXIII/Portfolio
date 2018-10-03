from __future__ import unicode_literals
from django.db import models
import bcrypt
from datetime import date

#validations

class UserManager(models.Manager):
    def add_user(self, postData):
        errors = {}

        if len(postData['name']) < 2:
            errors['name'] = "Name must have more than two characters."

        if len(postData['username']) < 2:
            errors['username'] = "Username must have more than two characters."
        if self.filter(username = postData['username']):
            errors['username'] = "Username already exists."

        if len(postData['password']) < 8:
            errors['password'] = "Name must be at least eight characters."

        if postData['password'] != postData['confirm_password']:
            errors['confirm_password'] = "Passwords do not match."

        if not postData['hire_date'] <= str(date.today()):
            errors['hire_date'] = "You are not from the future."

        if not postData['hire_date']:
            errors['hire_date'] = "Must enter a date."
        
        else:
            hashed_password = bcrypt.hashpw(postData['password'].encode(), bcrypt.gensalt())
            user = self.create(name = postData['name'], username = postData['username'], password = hashed_password, hire_date = postData['hire_date'])

        return errors

#methods for making and checking a password

    def hash_new_PW(self, password_in):
        return bcrypt.hashpw(password_in.encode(), bcrypt.gensalt())

    def check_PW_DB(self, password_in, hashed_DB_password):
        return bcrypt.checkpw(password_in.encode(), hashed_DB_password.encode())

    def check_user(self, postData):
        errors = {}
        if not postData['username']:
            error['blankUsername'] = "Must enter a username."

        if not postData['password']:
            errors['password'] = "Must enter a username."
        
        if errors:
            return errors

        else:
            try:
                tryMe = User.objects.filter(username = postData['username'])
            except:
                errors['noUsername'] = "Username does not exist."
                return errors

        if User.objects.check_PW_DB(postData['password'], tryMe.password):
            return tryMe
        else:
            errors['wrongInfo'] = "Invalid information."
        return errors

#class, objects, dictionary... things I am calling and having the program look for.

class User(models.Model):
    name = models.CharField(max_length = 255)
    username = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)
    hire_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    objects = UserManager()