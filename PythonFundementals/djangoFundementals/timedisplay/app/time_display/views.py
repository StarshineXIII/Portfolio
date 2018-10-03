from django.shortcuts import render, HttpResponse, redirect
from time import gmtime, strftime

def index(request):
    response = "Placeholder to display time."
    return HttpResponse(response)

def index(request):
  context = {
  "time": strftime("%Y-%m-%d %H:%M %p", gmtime())
  }
  return render(request,'time_display/index.html', context)