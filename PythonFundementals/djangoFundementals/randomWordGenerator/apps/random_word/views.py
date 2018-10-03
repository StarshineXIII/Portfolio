# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.utils.crypto import get_random_string
# Create your views here.
def index(request):
    word = get_random_string(length=14)
    if 'attempts' not in request.session:
        request.session['attempts'] = 0
    request.session['attempts'] += 1
    context = {
        "word": word,
        "attempts": request.session['attempts']
    }
    return render(request, "random_word/index.html", context)

def generate(request):
    return redirect("/")

def reset(request):
    del request.session['attempts']
    return redirect("/")