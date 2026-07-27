"""initial schema

Revision ID: f3a9c1d40b21
Revises:
Create Date: 2026-07-27 09:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f3a9c1d40b21"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "departments",
        sa.Column("dept_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("dept_name", sa.String(length=100), nullable=False),
        sa.Column("head_of_dept", sa.String(length=100), nullable=False),
        sa.Column("location", sa.String(length=100), nullable=True),
        sa.Column("budget", sa.Numeric(precision=12, scale=2), nullable=True),
        sa.PrimaryKeyConstraint("dept_id"),
        sa.UniqueConstraint("dept_name"),
    )

    op.create_table(
        "students",
        sa.Column("student_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("first_name", sa.String(length=50), nullable=False),
        sa.Column("last_name", sa.String(length=50), nullable=False),
        sa.Column("email", sa.String(length=100), nullable=False),
        sa.Column("dob", sa.Date(), nullable=False),
        sa.Column("dept_id", sa.Integer(), nullable=False),
        sa.Column("enrollment_year", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["dept_id"], ["departments.dept_id"]),
        sa.PrimaryKeyConstraint("student_id"),
        sa.UniqueConstraint("email"),
    )

    op.create_table(
        "courses",
        sa.Column("course_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("course_name", sa.String(length=150), nullable=False),
        sa.Column("credits", sa.Integer(), nullable=False),
        sa.Column("dept_id", sa.Integer(), nullable=False),
        sa.Column("max_seats", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["dept_id"], ["departments.dept_id"]),
        sa.PrimaryKeyConstraint("course_id"),
    )

    op.create_table(
        "professors",
        sa.Column("professor_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("first_name", sa.String(length=50), nullable=False),
        sa.Column("last_name", sa.String(length=50), nullable=False),
        sa.Column("email", sa.String(length=100), nullable=False),
        sa.Column("hire_date", sa.Date(), nullable=True),
        sa.Column("dept_id", sa.Integer(), nullable=False),
        sa.Column("salary", sa.Numeric(precision=10, scale=2), nullable=True),
        sa.ForeignKeyConstraint(["dept_id"], ["departments.dept_id"]),
        sa.PrimaryKeyConstraint("professor_id"),
        sa.UniqueConstraint("email"),
    )

    op.create_table(
        "enrollments",
        sa.Column("enrollment_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=False),
        sa.Column("enrolled_on", sa.Date(), nullable=True),
        sa.Column("grade", sa.String(length=1), nullable=True),
        sa.ForeignKeyConstraint(["course_id"], ["courses.course_id"]),
        sa.ForeignKeyConstraint(["student_id"], ["students.student_id"]),
        sa.PrimaryKeyConstraint("enrollment_id"),
        sa.UniqueConstraint("student_id", "course_id"),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("enrollments")
    op.drop_table("professors")
    op.drop_table("courses")
    op.drop_table("students")
    op.drop_table("departments")
