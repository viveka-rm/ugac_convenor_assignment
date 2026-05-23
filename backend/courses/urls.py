from django.urls import path

from .views import (
    get_courses,
    add_course,
    delete_course,
    edit_course
)

urlpatterns = [

    path('', get_courses),

    path('add/', add_course),

    path(
        'delete/<int:course_id>/',
        delete_course
    ),

    path(
        'edit/<int:course_id>/',
        edit_course
    ),

]