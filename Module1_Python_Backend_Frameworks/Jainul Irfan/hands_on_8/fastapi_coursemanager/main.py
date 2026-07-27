from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.responses import JSONResponse, Response
from typing import Optional
from schemas import *

app = FastAPI(
    title="Course Management API",
    description="RESTful Course Management API using FastAPI",
    version="1.0",
    contact={
        "name": "Sugan",
        "email": "student@example.com"
    }
)

# URL Versioning (/api/v1/)
# Alternative:
# Header Versioning
# Accept: application/vnd.api+json;version=1


courses = [
    {
        "id": 1,
        "name": "Python Programming",
        "code": "CS101",
        "credits": 4,
        "department_id": 1
    },
    {
        "id": 2,
        "name": "Database Systems",
        "code": "CS102",
        "credits": 3,
        "department_id": 1
    },
    {
        "id": 3,
        "name": "Networking",
        "code": "IT101",
        "credits": 3,
        "department_id": 2
    }
]

students = [
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@gmail.com"
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@gmail.com"
    }
]

enrollments = []


def not_found(course_id):
    raise HTTPException(
        status_code=404,
        detail={
            "error": {
                "code": "NOT_FOUND",
                "message": f"Course with id {course_id} does not exist",
                "field": None
            }
        }
    )


@app.get("/")
async def root():
    return {"message": "API Running"}


# -------------------- COURSES -------------------- #

@app.get(
    "/api/v1/courses/",
    tags=["Courses"]
)
async def get_courses(
    page: int = 1,
    page_size: int = 2,
    search: Optional[str] = None
):

    result = courses

    if search:
        result = [
            c for c in result
            if search.lower() in c["name"].lower()
            or search.lower() in c["code"].lower()
        ]

    total = len(result)

    start = (page - 1) * page_size
    end = start + page_size

    next_url = None
    previous_url = None

    if end < total:
        next_url = f"/api/v1/courses/?page={page+1}&page_size={page_size}"

    if page > 1:
        previous_url = f"/api/v1/courses/?page={page-1}&page_size={page_size}"

    return {
        "count": total,
        "next": next_url,
        "previous": previous_url,
        "results": result[start:end]
    }


@app.get(
    "/api/v1/courses/{id}",
    tags=["Courses"],
    response_model=CourseResponse
)
async def get_course(id: int):

    for c in courses:
        if c["id"] == id:
            return c

    not_found(id)


@app.post(
    "/api/v1/courses/",
    tags=["Courses"],
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Course",
    response_description="Course Created Successfully"
)
async def create_course(course: CourseCreate):

    new_course = course.model_dump()

    new_course["id"] = len(courses) + 1

    courses.append(new_course)

    response = JSONResponse(
        status_code=201,
        content=new_course
    )

    response.headers["Location"] = f"/api/v1/courses/{new_course['id']}"

    return response


@app.put(
    "/api/v1/courses/{id}",
    tags=["Courses"],
    response_model=CourseResponse
)
async def update_course(id: int, course: CourseUpdate):

    for c in courses:

        if c["id"] == id:

            data = course.model_dump(exclude_unset=True)

            c.update(data)

            return c

    not_found(id)


@app.patch(
    "/api/v1/courses/{id}",
    tags=["Courses"],
    response_model=CourseResponse
)
async def patch_course(id: int, course: CourseUpdate):

    for c in courses:

        if c["id"] == id:

            data = course.model_dump(exclude_unset=True)

            c.update(data)

            return c

    not_found(id)


@app.delete(
    "/api/v1/courses/{id}",
    tags=["Courses"],
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_course(id: int):

    for i, c in enumerate(courses):

        if c["id"] == id:

            courses.pop(i)

            return Response(
                status_code=status.HTTP_204_NO_CONTENT
            )

    not_found(id)
# -------------------- STUDENTS -------------------- #

@app.get(
    "/api/v1/students/",
    tags=["Students"]
)
async def get_students():
    return students


@app.post(
    "/api/v1/students/",
    tags=["Students"],
    status_code=status.HTTP_201_CREATED
)
async def create_student(student: Student):

    students.append(student.model_dump())

    response = JSONResponse(
        status_code=201,
        content=student.model_dump()
    )

    response.headers["Location"] = f"/api/v1/students/{student.id}"

    return response


# -------------------- ENROLLMENTS -------------------- #

def send_confirmation_email(email: str):
    print(f"Sending confirmation to {email}")


@app.post(
    "/api/v1/enrollments/",
    tags=["Enrollments"],
    status_code=status.HTTP_201_CREATED,
    summary="Enroll Student",
    response_description="Enrollment Created"
)
async def enroll_student(
    enrollment: Enrollment,
    background_tasks: BackgroundTasks
):

    enrollments.append(enrollment.model_dump())

    student = next(
        (
            s for s in students
            if s["id"] == enrollment.student_id
        ),
        None
    )

    if student:
        background_tasks.add_task(
            send_confirmation_email,
            student["email"]
        )

    response = JSONResponse(
        status_code=201,
        content=enrollment.model_dump()
    )

    response.headers["Location"] = (
        f"/api/v1/enrollments/{len(enrollments)}"
    )

    return response


# -------------------- COURSE STUDENTS -------------------- #

@app.get(
    "/api/v1/courses/{id}/students/",
    tags=["Courses"]
)
async def course_students(id: int):

    course = next(
        (
            c for c in courses
            if c["id"] == id
        ),
        None
    )

    if course is None:
        not_found(id)

    result = []

    for enrollment in enrollments:

        if enrollment["course_id"] == id:

            student = next(
                (
                    s for s in students
                    if s["id"] == enrollment["student_id"]
                ),
                None
            )

            if student:
                result.append(student)

    return {
        "course_id": id,
        "students": result
    }