from fastapi import (
    FastAPI,
    HTTPException,
    status,
    BackgroundTasks,
    Depends,
)
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from typing import Optional

from schemas import *
from security import (
    get_password_hash,
    verify_password,
    create_access_token,
    verify_token,
)

app = FastAPI(
    title="Course Management API",
    description="RESTful Course Management API using FastAPI",
    version="1.0",
    contact={
        "name": "Student",
        "email": "student@example.com",
    },
)

# -------------------- CORS --------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)

# -------------------- SAMPLE DATA --------------------

courses = [
    {
        "id": 1,
        "name": "Python Programming",
        "code": "CS101",
        "credits": 4,
        "department_id": 1,
    },
    {
        "id": 2,
        "name": "Database Systems",
        "code": "CS102",
        "credits": 3,
        "department_id": 1,
    },
    {
        "id": 3,
        "name": "Networking",
        "code": "IT101",
        "credits": 3,
        "department_id": 2,
    },
]

students = [
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@gmail.com",
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@gmail.com",
    },
]

enrollments = []

users = []

# -------------------- HELPERS --------------------

def not_found(course_id: int):
    raise HTTPException(
        status_code=404,
        detail={
            "error": {
                "code": "NOT_FOUND",
                "message": f"Course with id {course_id} does not exist",
                "field": None,
            }
        },
    )


def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    email = payload.get("sub")

    for user in users:
        if user["email"] == email:
            return user

    raise HTTPException(
        status_code=401,
        detail="User not found",
    )


@app.get("/")
async def root():
    return {"message": "API Running"}

# -------------------- AUTH --------------------

@app.post(
    "/api/v1/auth/register",
    tags=["Authentication"],
    status_code=201,
)
async def register(user: UserRegister):

    for u in users:
        if u["email"] == user.email:
            raise HTTPException(
                status_code=409,
                detail="Email already registered",
            )

    # bcrypt is intentionally slow and secure.
    # Never store plain-text passwords.

    new_user = {
        "id": len(users) + 1,
        "email": user.email,
        "hashed_password": get_password_hash(user.password),
        "is_active": True,
    }

    users.append(new_user)

    return {
        "message": "User registered successfully"
    }


"""
OAuth2 Authorization Code Flow:

The client first receives an authorization code
from an authorization server and exchanges it
for an access token.

In this assignment we use a simpler JWT login:
email + password -> JWT token.
"""


@app.post(
    "/api/v1/auth/login",
    response_model=Token,
    tags=["Authentication"],
)
async def login(user: UserLogin):

    db_user = None

    for u in users:
        if u["email"] == user.email:
            db_user = u
            break

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not verify_password(
        user.password,
        db_user["hashed_password"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    token = create_access_token(
        {"sub": db_user["email"]}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }
    
# -------------------- COURSES -------------------- #

@app.get(
    "/api/v1/courses/",
    tags=["Courses"],
)
async def get_courses(
    page: int = 1,
    page_size: int = 2,
    search: Optional[str] = None,
):

    result = courses

    if search:
        result = [
            c
            for c in result
            if search.lower() in c["name"].lower()
            or search.lower() in c["code"].lower()
        ]

    total = len(result)

    start = (page - 1) * page_size
    end = start + page_size

    next_url = None
    previous_url = None

    if end < total:
        next_url = (
            f"/api/v1/courses/?page={page+1}&page_size={page_size}"
        )

    if page > 1:
        previous_url = (
            f"/api/v1/courses/?page={page-1}&page_size={page_size}"
        )

    return {
        "count": total,
        "next": next_url,
        "previous": previous_url,
        "results": result[start:end],
    }


@app.get(
    "/api/v1/courses/{id}",
    response_model=CourseResponse,
    tags=["Courses"],
)
async def get_course(id: int):

    for c in courses:
        if c["id"] == id:
            return c

    not_found(id)


@app.post(
    "/api/v1/courses/",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Courses"],
    summary="Create Course",
    response_description="Course Created Successfully",
)
async def create_course(
    course: CourseCreate,
    current_user=Depends(get_current_user),
):

    new_course = course.model_dump()

    new_course["id"] = len(courses) + 1

    courses.append(new_course)

    response = JSONResponse(
        status_code=201,
        content=new_course,
    )

    response.headers[
        "Location"
    ] = f"/api/v1/courses/{new_course['id']}"

    return response


@app.put(
    "/api/v1/courses/{id}",
    response_model=CourseResponse,
    tags=["Courses"],
)
async def update_course(
    id: int,
    course: CourseUpdate,
):

    for c in courses:

        if c["id"] == id:

            c.update(
                course.model_dump(
                    exclude_unset=True
                )
            )

            return c

    not_found(id)


@app.patch(
    "/api/v1/courses/{id}",
    response_model=CourseResponse,
    tags=["Courses"],
)
async def patch_course(
    id: int,
    course: CourseUpdate,
):

    for c in courses:

        if c["id"] == id:

            c.update(
                course.model_dump(
                    exclude_unset=True
                )
            )

            return c

    not_found(id)


@app.delete(
    "/api/v1/courses/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Courses"],
)
async def delete_course(
    id: int,
    current_user=Depends(get_current_user),
):

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
    status_code=status.HTTP_201_CREATED,
)
async def create_student(student: Student):

    students.append(student.model_dump())

    response = JSONResponse(
        status_code=201,
        content=student.model_dump(),
    )

    response.headers[
        "Location"
    ] = f"/api/v1/students/{student.id}"

    return response


# -------------------- BACKGROUND TASK -------------------- #

def send_confirmation_email(email: str):

    print(f"Sending confirmation to {email}")


# -------------------- ENROLLMENTS -------------------- #

@app.post(
    "/api/v1/enrollments/",
    tags=["Enrollments"],
    status_code=status.HTTP_201_CREATED,
)
async def enroll_student(
    enrollment: Enrollment,
    background_tasks: BackgroundTasks,
):

    enrollments.append(
        enrollment.model_dump()
    )

    student = next(
        (
            s
            for s in students
            if s["id"] == enrollment.student_id
        ),
        None,
    )

    if student:

        background_tasks.add_task(
            send_confirmation_email,
            student["email"],
        )

    response = JSONResponse(
        status_code=201,
        content=enrollment.model_dump(),
    )

    response.headers[
        "Location"
    ] = (
        f"/api/v1/enrollments/{len(enrollments)}"
    )

    return response


@app.get(
    "/api/v1/courses/{id}/students/",
    tags=["Courses"],
)
async def get_course_students(id: int):

    course = next(
        (
            c
            for c in courses
            if c["id"] == id
        ),
        None,
    )

    if course is None:
        not_found(id)

    result = []

    for enrollment in enrollments:

        if enrollment["course_id"] == id:

            student = next(
                (
                    s
                    for s in students
                    if s["id"] == enrollment["student_id"]
                ),
                None,
            )

            if student:
                result.append(student)

    return {
        "course_id": id,
        "students": result,
    }