from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
# from .models import ServiceContact, CareerContact
from .models import ServiceContact , CareerContact
from django.core.files.storage import default_storage
import json


@csrf_exempt
def handle_service_contact(request):
    if request.method == "POST":
        # Extract form data
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        # Print form data for debugging
        print("Received data:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Phone: {phone}")
        print(f"Message: {message}")

        # Extract file if it exists
        file_upload = request.FILES.get('fileUpload')

        # Print file details for debugging
        if file_upload:
            print(f"File uploaded: {file_upload.name}")
        else:
            print("No file uploaded")

        # Create and save the CareerContact instance
        try:
            service_contact = ServiceContact(
                name=name,
                email=email,
                phone=phone,
                message=message,
                file_upload=file_upload,
            )
            service_contact.save()
            print("Service Contact instance saved successfully.")
        except Exception as e:
            print(f"Error saving Service Contact instance: {e}")
            return JsonResponse({'error': 'Failed to save Service contact'}, status=500)

        return JsonResponse({'message': 'Service contact submitted successfully.'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CareerContact

@csrf_exempt
def handle_career_contact(request):
    if request.method == "POST":
        # Extract form data
        name = request.POST.get('name')
        email = request.POST.get('email')
        country = request.POST.get('country')
        # message = request.POST.get('message')

        # Print form data for debugging
        print("Received data:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Phone: {country}")
        # print(f"Message: {message}")

        # Extract file if it exists
        file_upload = request.FILES.get('fileUpload')

        # Print file details for debugging
        if file_upload:
            print(f"File uploaded: {file_upload.name}")
        else:
            print("No file uploaded")

        # Create and save the CareerContact instance
        try:
            career_contact = CareerContact(
                career_name=name,
                career_email=email,
                country=country,
                # message=message,
                file_upload=file_upload,
            )
            career_contact.save()
            print("CareerContact instance saved successfully.")
        except Exception as e:
            print(f"Error saving CareerContact instance: {e}")
            return JsonResponse({'error': 'Failed to save career contact'}, status=500)

        return JsonResponse({'message': 'Career contact submitted successfully.'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)


