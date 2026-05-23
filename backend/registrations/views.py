from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from courses.models import Course
from .models import Registration
from .serializers import RegistrationSerializer


@api_view(['POST'])
def register_course(request):

    user_id = request.data.get('user_id')
    course_id = request.data.get('course_id')

    user = User.objects.get(id=user_id)
    course = Course.objects.get(id=course_id)

    existing_registration = Registration.objects.filter(
        user=user,
        course=course
    ).first()

    if existing_registration:

        return Response({
            "error": "Already registered for this course"
        }, status=400)

    registration = Registration.objects.create(
        user=user,
        course=course,
        status='Pending'
    )

    serializer = RegistrationSerializer(registration)

    return Response(serializer.data)



@api_view(['GET'])
def get_registrations(request):

    registrations = Registration.objects.all()

    serializer = RegistrationSerializer(
        registrations,
        many=True
    )

    return Response(serializer.data)
@api_view(['POST'])
def update_registration_status(request, registration_id):

    registration = Registration.objects.get(id=registration_id)

    new_status = request.data.get('status')

    registration.status = new_status

    registration.save()

    return Response({
        "message": "Status updated successfully"
    })
    return Response(serializer.data)