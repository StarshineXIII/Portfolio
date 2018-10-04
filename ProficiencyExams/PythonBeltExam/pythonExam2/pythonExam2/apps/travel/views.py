from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect


def index(request):
    if 'current_user' not in request.session:
        return redirect('user:index')
    user_id=request.session['current_user']['id']

    return render(request, 'travel/plans.html')