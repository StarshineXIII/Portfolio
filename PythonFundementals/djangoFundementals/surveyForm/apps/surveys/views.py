# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect

# Create your views here.
def index(request):
    return render(request, 'surveys/index.html')
def process(request):
    if request.method == "POST":
        request.session['name'] = request.POST['name']
        request.session['location'] = request.POST['location']
        request.session['language'] = request.POST['language']
        request.session['comment'] = request.POST['comment']
        if 'times' not in request.session:
            request.session['times'] = 0
        request.session['times'] += 1 
        return redirect(results)
    else:
        return redirect("/")
def results(request):
    return render(request, 'surveys/results.html')
def start(request):
    return redirect('/')