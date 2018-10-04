# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect
from .models import Item
from ..login.models import User
from django.contrib import messages

# Create your views here.

def index(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']
    context = {
        'user': User.objects.getUser(user_id),
    }

    return render(request, 'triplist/index.html', context)

def item(request, item_id):
    if 'current_user' not in request.session:
        return redirect('user:index')
        
    return render(request, 'triplist/item.html')

def create(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']

    return render(request, 'triplist/create.html')

def addMe(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    if request.method == 'POST':
        user_id=request.session['current_user']['id']
        destination = Item.objects.add_trip(request.POST, user_id)
        if destination['status']:
            return redirect('triplist:index')
        else:
            for error in destination['errors']:
                messages.error(request, error)
                return redirect('triplist:create')
    else:
        return redirect('user:logout')

def delete(request, item_id):
    if 'current_user' not in request.session:
        return redirect('user:index')
    Item.objects.trashit(item_id)
    return redirect('triplist:index')


