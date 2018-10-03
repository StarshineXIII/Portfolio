from django.shortcuts import render, HttpResponse, redirect
from django.utils.crypto import get_random_string

def index(request):
    word = get_random_string(length=14)
    if 'attempts' not in request.session:
        request.session['attempts'] = 0
    request.session['attempts'] += 1
    context = {
        'word': word,
        'attempts': request.session['attempts']
    }
    return render(request, 'randomWord/index.html', context)

def random_word(request):
    return redirect('/')

def reset(request):
    del request.session['attempts']
    return redirect('/')