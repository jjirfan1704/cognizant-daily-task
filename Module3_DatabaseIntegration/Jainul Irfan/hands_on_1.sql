--===================================================
-- TASK : 1 - Create the Database and All Five Tables
--===================================================

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2)
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE professors (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

--===================================================
-- TASK : 2 - Normalisation Analysis
--===================================================

-- 1NF check
-- Every column in this schema holds a single value — no comma-separated lists,
-- no repeating groups. Example: students.email stores one address only.
-- If we had stored multiple phone numbers like '98765,91234' in one column,
-- that would break 1NF. The fix would be a separate student_phones table.

-- 2NF check (focus: enrollments, since it has a composite business key
-- of student_id + course_id even though enrollment_id is the surrogate PK)
-- grade and enrolled_on both depend on the combination of student_id AND
-- course_id together — not on just one of them. So 2NF holds.
-- A violation would be storing student_name in enrollments, since that
-- only depends on student_id, not the full key.

-- 3NF check
-- students stores dept_id (a foreign key) instead of dept_name directly.
-- If dept_name were stored in students, that creates a transitive
-- dependency: student_id -> dept_id -> dept_name, which violates 3NF.
-- Same logic applies to courses storing dept_id instead of dept_name.
-- Since we only store the FK and join when needed, the schema is in 3NF.

--===================================================
-- TASK : 3 - Alter and Extend the Schema
--===================================================

-- Step 10: add phone_number to students
ALTER TABLE students
ADD COLUMN phone_number VARCHAR(15);

-- Step 11: add max_seats to courses with default value
ALTER TABLE courses
ADD COLUMN max_seats INT DEFAULT 60;

-- Step 12: enforce valid grade values
ALTER TABLE enrollments
ADD CONSTRAINT chk_grade CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL);

-- Step 13: rename hod_name to head_of_dept
-- PostgreSQL:
ALTER TABLE departments
RENAME COLUMN hod_name TO head_of_dept;

-- MySQL equivalent:
-- ALTER TABLE departments CHANGE hod_name head_of_dept VARCHAR(100) NOT NULL;

-- Step 14: drop phone_number to simulate rollback
ALTER TABLE students
DROP COLUMN phone_number;

SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('departments','students','courses','professors','enrollments')
ORDER BY table_name, ordinal_position;
