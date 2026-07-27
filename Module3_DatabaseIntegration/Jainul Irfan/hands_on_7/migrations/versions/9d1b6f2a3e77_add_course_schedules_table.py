"""add course_schedules table

Revision ID: 9d1b6f2a3e77
Revises: 7c2e58a914bd
Create Date: 2026-07-27 09:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9d1b6f2a3e77"
down_revision: Union[str, Sequence[str], None] = "7c2e58a914bd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "course_schedules",
        sa.Column("schedule_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=False),
        sa.Column("day_of_week", sa.String(length=10), nullable=False),
        sa.Column("start_time", sa.Time(), nullable=False),
        sa.Column("end_time", sa.Time(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["courses.course_id"]),
        sa.PrimaryKeyConstraint("schedule_id"),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("course_schedules")
