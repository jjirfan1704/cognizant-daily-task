from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=["get"])
    def students(self, request, pk=None):
        course = self.get_object()

        data = [
            {
                "student": f"{e.student.first_name} {e.student.last_name}",
                "email": e.student.email
            }
            for e in course.enrollment_set.all()
        ]

        return Response(data)