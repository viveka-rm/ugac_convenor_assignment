from django.urls import path
from .views import (
    register_course,
    get_registrations,
    update_registration_status
)

urlpatterns = [
    path('register/', register_course),
    path('all/', get_registrations),

    path(
        'update/<int:registration_id>/',
        update_registration_status
    ),
]