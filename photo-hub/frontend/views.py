from django.shortcuts import render

def index(request):
    """
    Renders the Angular2 SPA
    """
    return render(request, template_name='index.html')