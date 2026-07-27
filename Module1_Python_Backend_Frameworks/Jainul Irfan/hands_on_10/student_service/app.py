from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///students.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))


with app.app_context():
    db.create_all()

    if Student.query.count() == 0:
        db.session.add(Student(name="Alice", email="alice@gmail.com"))
        db.session.add(Student(name="Bob", email="bob@gmail.com"))
        db.session.commit()


@app.get("/api/students")
def get_students():

    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "email": s.email
        }
        for s in Student.query.all()
    ])


@app.post("/api/students/<int:id>/enroll")
def enroll_student(id):

    data = request.get_json()

    course_id = data.get("course_id")

    try:

        response = requests.get(
            f"http://127.0.0.1:5001/api/courses/{course_id}"
        )

    except requests.exceptions.ConnectionError:

        return jsonify(
            {
                "error": "Course Service unavailable"
            }
        ), 503

    if response.status_code != 200:

        return jsonify(
            {
                "error": "Course not found"
            }
        ), 404

    student = Student.query.get(id)

    if not student:

        return jsonify(
            {
                "error": "Student not found"
            }
        ), 404

    return jsonify(
        {
            "message": f"{student.name} enrolled successfully",
            "course": response.json()
        }
    )


if __name__ == "__main__":
    app.run(port=5002, debug=True)