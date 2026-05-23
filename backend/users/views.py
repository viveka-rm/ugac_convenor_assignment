from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.create_user(
        username=username,
        password=password
    )

    return Response({
        "message": "User created successfully",
        "user_id": user.id
    })

@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

     return Response({
    "message": "Login successful",
    "user_id": user.id,
    "username": user.username,
    "is_admin": user.is_staff
})
    return Response({
        "error": "Invalid username or password"
    }, status=400)