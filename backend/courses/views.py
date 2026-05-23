from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Course
from .serializers import CourseSerializer

@api_view(['GET'])
def get_courses(request):

    courses = Course.objects.all()

    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def add_course(request):

    serializer = CourseSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_course(request, course_id):

    course = Course.objects.get(id=course_id)

    course.delete()

    return Response({
        "message": "Course deleted"
    })

@api_view(['PUT'])
def edit_course(request, course_id):

    course = Course.objects.get(id=course_id)

    serializer = CourseSerializer(
        course,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)