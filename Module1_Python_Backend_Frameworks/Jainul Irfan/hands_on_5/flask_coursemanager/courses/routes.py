from flask import Blueprint, jsonify, request
from extensions import db
from courses.models import Course

courses_bp = Blueprint(
    "courses",
    __name__,
    url_prefix="/api/courses"
)


@courses_bp.route("/", methods=["GET"])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])


@courses_bp.route("/", methods=["POST"])
def create_course():
    data = request.get_json()

    course = Course(
        name=data["name"],
        code=data["code"],
        credits=data["credits"],
        department_id=data.get("department_id")
    )

    db.session.add(course)
    db.session.commit()

    return jsonify(course.to_dict()), 201


@courses_bp.route("/<int:id>", methods=["GET"])
def get_course(id):
    course = Course.query.get_or_404(id)
    return jsonify(course.to_dict())


@courses_bp.route("/<int:id>", methods=["PUT"])
def update_course(id):
    course = Course.query.get_or_404(id)

    data = request.get_json()

    course.name = data.get("name", course.name)
    course.code = data.get("code", course.code)
    course.credits = data.get("credits", course.credits)

    db.session.commit()

    return jsonify(course.to_dict())


@courses_bp.route("/<int:id>", methods=["DELETE"])
def delete_course(id):
    course = Course.query.get_or_404(id)

    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": "Course deleted"})


@courses_bp.route("/<int:id>/students", methods=["GET"])
def get_students(id):
    course = Course.query.get_or_404(id)

    students = [
        enrollment.student.to_dict()
        for enrollment in course.enrollments
    ]

    return jsonify(students)