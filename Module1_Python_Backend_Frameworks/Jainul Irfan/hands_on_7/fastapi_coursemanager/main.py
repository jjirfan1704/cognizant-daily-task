from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.responses import Response
from typing import Optional
from schemas import *

app = FastAPI(
    title="Course Management API",
    description="FastAPI CRUD API for Course Management",
    version="1.0",
    contact={
        "name": "john",
        "email": "student@example.com"
    }
)

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


@app.get("/")
async def root():
    return {"message": "API Running"}


# ---------------- COURSES ---------------- #

@app.get(
    "/api/courses/",
    tags=["Courses"],
    response_model=list[CourseResponse]
)
async def get_courses(
    skip: int = 0,
    limit: int = 10,
    department_id: Optional[int] = None
):

    result = courses

    if department_id:
        result = [
            c for c in result
            if c["department_id"] == department_id
        ]

    return result[skip:skip + limit]


@app.get(
    "/api/courses/{id}",
    tags=["Courses"],
    response_model=CourseResponse
)
async def get_course(id: int):

    for c in courses:
        if c["id"] == id:
            return c

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )


@app.post(
    "/api/courses/",
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

    return new_course


@app.put(
    "/api/courses/{id}",
    tags=["Courses"],
    response_model=CourseResponse
)
async def update_course(
    id: int,
    course: CourseUpdate
):

    for c in courses:

        if c["id"] == id:

            data = course.model_dump(exclude_unset=True)

            c.update(data)

            return c

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )


@app.delete(
    "/api/courses/{id}",
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

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )


# ---------------- STUDENTS ---------------- #

@app.get(
    "/api/students/",
    tags=["Students"]
)
async def get_students():

    return students


@app.post(
    "/api/students/",
    tags=["Students"]
)
async def create_student(student: Student):

    students.append(student.model_dump())

    return student


# ------------ ENROLLMENTS ---------------- #

def send_confirmation_email(email: str):

    print(f"Sending confirmation to {email}")


@app.post(
    "/api/enrollments/",
    tags=["Enrollments"],
    status_code=status.HTTP_201_CREATED
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

    return enrollment


@app.get(
    "/api/courses/{id}/students/",
    tags=["Courses"]
)
async def course_students(id: int):

    result = []

    for e in enrollments:

        if e["course_id"] == id:

            student = next(
                s for s in students
                if s["id"] == e["student_id"]
            )

            result.append(student)

    return result