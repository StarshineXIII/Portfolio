from django.shortcuts import render, HttpResponse, redirect

def index(request):
    return render(request, 'surveys/index.html')

def process(request):
    if request.method == "POST":
        print "*"*50

        print request.POST['full_name']
        request.session['full_name'] = request.POST['full_name']
        print request.POST['loc']
        request.session['loc'] = request.POST['loc']
        print request.POST['lang']
        request.session['lang'] = request.POST['lang']
        print request.POST['comment']
        request.session['comment'] = request.POST['comment']

        print "*"*50
        if 'counter' not in request.session:
            request.session['counter'] = 0
        request.session['counter'] += 1
        return redirect(submittedinfo)
    else:
        return redirect('/')

def submittedinfo(request):
    return render(request, 'surveys/submittedinfo.html')