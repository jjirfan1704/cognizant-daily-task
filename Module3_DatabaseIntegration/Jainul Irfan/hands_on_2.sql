-- ==================================
-- Task 1 — Insert, Update, Delete
-- ==================================
USE college_db;


INSERT INTO departments (dept_name, head_of_dept, budget) VALUES
('Computer Science', 'Dr. Mehta', 750000),
('Mechanical', 'Dr. Rao', 550000),
('Electronics', 'Dr. Iyer', 620000);

INSERT INTO professors (prof_name, email, department_id, salary) VALUES
('Anil Sharma', 'anil.sharma@college.edu', 1, 92000),
('Priya Nair', 'priya.nair@college.edu', 1, 85000),
('Ravi Kumar', 'ravi.kumar@college.edu', 2, 78000),
('Sneha Pillai', 'sneha.pillai@college.edu', 3, 88000);

INSERT INTO courses (course_name, course_code, credits, department_id, max_seats) VALUES
('Database Systems', 'CS101', 4, 1, 60),
('Operating Systems', 'CS102', 4, 1, 60),
('Thermodynamics', 'ME101', 3, 2, 60),
('Digital Circuits', 'EC101', 3, 3, 60),
('Web Development', 'CS103', 2, 1, 60);

INSERT INTO students (first_name, last_name, email, date_of_birth, department_id, enrollment_year) VALUES
('Arjun', 'Verma', 'arjun.verma@college.edu', '2002-05-14', 1, 2022),
('Kavya', 'Reddy', 'kavya.reddy@college.edu', '2001-11-02', 1, 2021),
('Rohit', 'Singh', 'rohit.singh@college.edu', '2002-08-23', 2, 2022),
('Meera', 'Joshi', 'meera.joshi@college.edu', '2003-01-30', 3, 2023),
('Vikram', 'Das', 'vikram.das@college.edu', '2002-04-18', 1, 2022),
('Ananya', 'Gupta', 'ananya.gupta@college.edu', '2001-07-09', 2, 2021),
('Karthik', 'Menon', 'karthik.menon@college.edu', '2003-02-25', 3, 2023),
('Divya', 'Pillai', 'divya.pillai@college.edu', '2002-12-11', 1, 2022);

INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
(1, 1, '2022-08-01', 'B'),
(1, 2, '2022-08-01', 'A'),
(2, 1, '2021-08-01', 'C'),
(2, 3, '2021-08-01', NULL),
(3, 3, '2022-08-01', 'B'),
(3, 4, '2022-08-01', NULL),
(4, 4, '2023-08-01', 'A'),
(5, 1, '2022-08-01', 'C'),
(6, 2, '2021-08-01', NULL),
(7, 5, '2023-08-01', 'B');

INSERT INTO students (first_name, last_name, email, date_of_birth, department_id, enrollment_year) VALUES
('Sanjay', 'Iyer', 'sanjay.iyer@college.edu', '2002-03-19', 2, 2022),
('Pooja', 'Nambiar', 'pooja.nambiar@college.edu', '2003-06-07', 3, 2023);

UPDATE enrollments
SET grade = 'B'
WHERE student_id = 5 AND course_id = 1;

SELECT * FROM enrollments WHERE grade IS NULL;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM enrollments WHERE grade IS NULL;

SELECT COUNT(*) FROM students;     
SELECT COUNT(*) FROM enrollments;  

-- ===========================================
-- Task 2 — Single-Table Queries and Filtering
-- ===========================================
SELECT * FROM students
WHERE enrollment_year = 2022
ORDER BY last_name ASC;

SELECT * FROM courses
WHERE credits > 3
ORDER BY credits DESC;

SELECT * FROM professors
WHERE salary BETWEEN 80000 AND 95000;

SELECT * FROM students
WHERE email LIKE '%@college.edu';

SELECT enrollment_year, COUNT(*) AS student_count
FROM students
GROUP BY enrollment_year;

-- =============================
-- Task 3 — Multi-Table Joins
-- =============================
SELECT CONCAT(s.first_name, ' ', s.last_name) AS full_name, d.dept_name
FROM students s
JOIN departments d ON s.department_id = d.department_id;

SELECT CONCAT(s.first_name, ' ', s.last_name) AS student_name,
       c.course_name,
       e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id;

SELECT s.*
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;

SELECT c.course_name, COUNT(e.enrollment_id) AS enrollment_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name;

SELECT d.dept_name, p.prof_name, p.salary
FROM departments d
LEFT JOIN professors p ON d.department_id = p.department_id;

-- ===================================
-- Task 4 — Aggregations and Grouping
-- ===================================
SELECT c.course_name, COUNT(e.enrollment_id) AS enrollment_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name;

SELECT d.dept_name, ROUND(AVG(p.salary), 2) AS avg_salary
FROM departments d
JOIN professors p ON d.department_id = p.department_id
GROUP BY d.dept_name;

SELECT dept_name, budget
FROM departments
WHERE budget > 600000;

SELECT grade, COUNT(*) AS grade_count
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
WHERE c.course_code = 'CS101'
GROUP BY grade;

SELECT d.dept_name, COUNT(DISTINCT e.student_id) AS student_count
FROM departments d
JOIN courses c ON d.department_id = c.department_id
JOIN enrollments e ON c.course_id = e.course_id
GROUP BY d.dept_name
HAVING COUNT(DISTINCT e.student_id) > 2;