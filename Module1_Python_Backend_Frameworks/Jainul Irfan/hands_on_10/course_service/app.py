from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///courses.db"
db = SQLAlchemy(app)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    code = db.Column(db.String(20))


with app.app_context():
    db.create_all()

    if Course.query.count() == 0:
        db.session.add(Course(name="Python", code="CS101"))
        db.session.add(Course(name="Database", code="CS102"))
        db.session.commit()


@app.get("/api/courses")
def get_courses():
    return jsonify([
        {
            "id": c.id,
            "name": c.name,
            "code": c.code
        }
        for c in Course.query.all()
    ])


@app.get("/api/courses/<int:id>")
def get_course(id):

    course = Course.query.get(id)

    if not course:
        return jsonify({"error": "Course not found"}), 404

    return jsonify(
        {
            "id": course.id,
            "name": course.name,
            "code": course.code
        }
    )


if __name__ == "__main__":
    app.run(port=5001, debug=True)