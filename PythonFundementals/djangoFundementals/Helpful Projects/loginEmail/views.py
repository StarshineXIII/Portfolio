# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect
from .models import User
from django.contrib import messages
# Create your views here.
def index(request):
    return render(request, 'login/index.html')

def register(request):
    if request.method == 'POST':
        newUser = User.objects.add_user(request.POST)
        if newUser['status']:
            request.session["current_user"] = {
                'id': newUser['user'].id,
                'first': newUser['user'].first,
                'last': newUser['user'].last
            }
            return redirect('secrets:index')

        else:
            for error in newUser['errors']:
                messages.error(request, error)
            return redirect('user:index')
    
    else:
        return redirect('user:index')

def login(request):
    if request.method == 'POST':
        user = User.objects.check_user(request.POST)
        if user['status']:
            request.session["current_user"] = {
                'id': user['user'].id,
                'first': user['user'].first,
                'last': user['user'].last
            }
            return redirect('secrets:index')
        else:
            messages.error(request, user['errors'])
            return redirect('user:index')


def logout(request):
    request.session.clear()
    return redirect('user:index')