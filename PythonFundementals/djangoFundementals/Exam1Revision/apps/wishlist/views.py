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
        'mine': Item.objects.getMyItems(user_id),
        'others': Item.objects.getOthersItems(user_id)
    }

    return render(request, 'wishlist/index.html', context)

def item(request, item_id):
    if 'current_user' not in request.session:
        return redirect('user:index')
    context = {
        'thisItem': Item.objects.getItem(item_id),
        'wishers':Item.objects.theseWishers(item_id)
    }
    return render(request, 'wishlist/item.html', context)

def create(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']
    context = {
        'user': User.objects.getUser(user_id)
    }
    return render(request, 'wishlist/create.html', context)

def addMe(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    if request.method == 'POST':
        user_id=request.session['current_user']['id']
        newItem = Item.objects.add_item(request.POST, user_id)
        if newItem['status']:
            return redirect('wishlist:index')
        else:
            for error in newItem['errors']:
                messages.error(request, error)
                return redirect('wishlist:create')
    else:
        return redirect('user:logout')

def delete(request, item_id):
    if 'current_user' not in request.session:
        return redirect('user:index')
    Item.objects.trashit(item_id)
    return redirect('wishlist:index')

def remove(request, item_id):
    if 'current_user' not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']
    Item.objects.removeMe(item_id, user_id)
    return redirect('wishlist:index')

def addWish(request, item_id):
    if 'current_user'not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']
    Item.objects.likeMe(item_id, user_id)
    return redirect('wishlist:index')
