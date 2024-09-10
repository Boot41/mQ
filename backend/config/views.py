import os
from django.conf import settings
from django.http import HttpResponse


def index_view(request):
    """
    Renders the homepage, no matter the URL it's called from
    """
    index_html = ""
    with open(os.path.join(settings.STATIC_ROOT,'index.html'), 'r') as f:
        index_html = f.read()

    return HttpResponse(index_html)


def sample_api_view(request):
    return HttpResponse('{"message":"Hello World!"}')