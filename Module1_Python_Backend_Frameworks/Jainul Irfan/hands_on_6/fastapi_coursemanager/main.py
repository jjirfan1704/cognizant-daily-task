from fastapi import FastAPI
from schemas import CourseCreate
from typing import Optional

app = FastAPI(
    title="Course Management API",
    version="1.0"
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
    },
    {
        "id": 3,
        "name": "Networking",
        "code": "IT101",
        "credits": 3,
        "department_id": 2
    }
]


@app.get("/")
async def root():
    return {"message": "API running"}


@app.get("/api/courses/")
async def get_courses(
    skip: int = 0,
    limit: int = 10,
    department_id: Optional[int] = None
):

    result = courses

    if department_id is not None:
        result = [
            course for course in result
            if course["department_id"] == department_id
        ]

    return result[skip:skip + limit]


@app.get("/api/courses/{course_id}")
async def get_course(course_id: int):

    for course in courses:
        if course["id"] == course_id:
            return course

    return {"message": "Course not found"}


@app.post("/api/courses/")
async def create_course(course: CourseCreate):

    new_course = course.model_dump()

    new_course["id"] = len(courses) + 1

    courses.append(new_course)

    return new_course