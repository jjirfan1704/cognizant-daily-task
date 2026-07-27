from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

COURSE_SERVICE = "http://127.0.0.1:5001"
STUDENT_SERVICE = "http://127.0.0.1:5002"


# ---------------- COURSES ---------------- #

@app.route("/api/courses", methods=["GET"])
def get_courses():

    response = requests.get(
        f"{COURSE_SERVICE}/api/courses"
    )

    return (
        response.content,
        response.status_code,
        response.headers.items(),
    )


@app.route("/api/courses/<int:id>", methods=["GET"])
def get_course(id):

    response = requests.get(
        f"{COURSE_SERVICE}/api/courses/{id}"
    )

    return (
        response.content,
        response.status_code,
        response.headers.items(),
    )


# ---------------- STUDENTS ---------------- #

@app.route("/api/students", methods=["GET"])
def get_students():

    response = requests.get(
        f"{STUDENT_SERVICE}/api/students"
    )

    return (
        response.content,
        response.status_code,
        response.headers.items(),
    )


@app.route("/api/students/<int:id>/enroll", methods=["POST"])

def enroll_student(id):

    data = request.get_json(silent=True)

    response = requests.post(
        f"{STUDENT_SERVICE}/api/students/{id}/enroll",
        json=data,
    )

    return (
        response.content,
        response.status_code,
        response.headers.items(),
    )

if __name__ == "__main__":
    app.run(port=5000, debug=True)