from rest_framework import serializers

from .models import Registration


class RegistrationSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    course_title = serializers.CharField(
        source='course.title',
        read_only=True
    )

    class Meta:

        model = Registration

        fields = [
            'id',
            'user',
            'course',
            'username',
            'course_title',
            'status'
        ]