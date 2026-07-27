from pydantic import BaseModel
from typing import Optional, List


class CourseCreate(BaseModel):
    name: str
    code: str
    credits: int
    department_id: int


class CourseUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    credits: Optional[int] = None
    department_id: Optional[int] = None


class CourseResponse(BaseModel):
    id: int
    name: str
    code: str
    credits: int
    department_id: int


class Student(BaseModel):
    id: int
    name: str
    email: str


class Enrollment(BaseModel):
    student_id: int
    course_id: int


class DepartmentResponse(BaseModel):
    id: int
    name: str
    courses: List[CourseResponse] = []
    
from pydantic import BaseModel, EmailStr
from typing import Optional


# ---------------- USERS ---------------- #

class User(BaseModel):
    id: int
    email: EmailStr
    hashed_password: str
    is_active: bool = True


class UserRegister(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str