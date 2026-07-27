-- ============================================================
-- TASK 1 : Baseline Performance
-- ============================================================
EXPLAIN
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
    ON s.student_id = e.student_id
JOIN courses c
    ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

-- Task 1 Observations:
-- 1. EXPLAIN was executed successfully.
-- 2. Before creating indexes, MySQL performs a Full Table Scan on one or more tables.
-- 3. The rows examined and execution plan are shown in the EXPLAIN output.
-- 4. This serves as the baseline before adding indexes in Task 2.

-- =================================================
-- Task 2: Add Indexes and Compare Plans
-- =================================================
CREATE INDEX idx_students_enrollment_year
ON students(enrollment_year);

CREATE UNIQUE INDEX idx_enrollments_student_course
ON enrollments(student_id, course_id);

CREATE INDEX idx_courses_course_code
ON courses(course_code);

EXPLAIN
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
    ON s.student_id = e.student_id
JOIN courses c
    ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

CREATE INDEX idx_enrollments_student
ON enrollments(student_id);

