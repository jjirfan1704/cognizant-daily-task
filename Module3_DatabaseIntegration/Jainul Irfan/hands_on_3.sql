-- ======================
-- Task 1 — Subqueries
-- ======================

SELECT student_id, COUNT(*) AS course_count
FROM enrollments
GROUP BY student_id
HAVING COUNT(*) > (
    SELECT AVG(course_count) FROM (
        SELECT COUNT(*) AS course_count
        FROM enrollments
        GROUP BY student_id
    ) AS sub
);

SELECT c.course_name
FROM courses c
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.course_id = c.course_id
)
AND NOT EXISTS (
    SELECT 1 FROM enrollments e
    WHERE e.course_id = c.course_id
    AND (e.grade <> 'A' OR e.grade IS NULL)
);

SELECT p.*
FROM professors p
WHERE p.salary = (
    SELECT MAX(p2.salary)
    FROM professors p2
    WHERE p2.department_id = p.department_id
);

SELECT dept_avg.department_id, dept_avg.avg_salary
FROM (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM professors
    GROUP BY department_id
) AS dept_avg
WHERE dept_avg.avg_salary > 85000;

-- ======================
-- Task 2 — Views
-- ======================
CREATE VIEW vw_student_enrollment_summary AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    d.dept_name,
    COUNT(e.enrollment_id) AS total_courses,
    AVG(CASE e.grade
            WHEN 'A' THEN 4 WHEN 'B' THEN 3 WHEN 'C' THEN 2
            WHEN 'D' THEN 1 WHEN 'F' THEN 0 END) AS avg_gpa
FROM students s
JOIN departments d ON s.department_id = d.department_id
LEFT JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, full_name, d.dept_name;

CREATE VIEW vw_course_stats AS
SELECT 
    c.course_name,
    c.course_code,
    COUNT(e.enrollment_id) AS total_enrollments,
    AVG(CASE e.grade
            WHEN 'A' THEN 4 WHEN 'B' THEN 3 WHEN 'C' THEN 2
            WHEN 'D' THEN 1 WHEN 'F' THEN 0 END) AS avg_gpa
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name, c.course_code;

SELECT * FROM vw_student_enrollment_summary
WHERE avg_gpa > 3.0;

UPDATE vw_student_enrollment_summary
SET full_name = 'Test Name'
WHERE student_id = 1;

DROP VIEW IF EXISTS vw_student_enrollment_summary;
DROP VIEW IF EXISTS vw_course_stats;

CREATE VIEW vw_student_enrollment_summary AS
SELECT student_id, first_name, last_name, department_id, enrollment_year
FROM students
WHERE enrollment_year >= 2021
WITH CHECK OPTION;

-- ==============================================
-- Task 3 — Stored Procedures and Transactions
-- ==============================================
DELIMITER $$

CREATE PROCEDURE sp_enroll_student(
    IN p_student_id INT,
    IN p_course_id INT,
    IN p_enrollment_date DATE
)
BEGIN
    IF EXISTS (
        SELECT 1 FROM enrollments
        WHERE student_id = p_student_id AND course_id = p_course_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student is already enrolled in this course.';
    ELSE
        INSERT INTO enrollments (student_id, course_id, enrollment_date, grade)
        VALUES (p_student_id, p_course_id, p_enrollment_date, NULL);
    END IF;
END$$

DELIMITER ;

CALL sp_enroll_student(1, 3, '2026-06-20');  
CALL sp_enroll_student(1, 3, '2026-06-20');   

CREATE TABLE department_transfer_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    old_department_id INT,
    new_department_id INT,
    transfer_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE PROCEDURE sp_transfer_student(
    IN p_student_id INT,
    IN p_new_department_id INT
)
BEGIN
    DECLARE old_dept INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT department_id INTO old_dept
    FROM students WHERE student_id = p_student_id;

    UPDATE students
    SET department_id = p_new_department_id
    WHERE student_id = p_student_id;

    INSERT INTO department_transfer_log (student_id, old_department_id, new_department_id)
    VALUES (p_student_id, old_dept, p_new_department_id);

    COMMIT;
END$$

DELIMITER ;

CALL sp_transfer_student(1, 2);
SELECT * FROM department_transfer_log;

CALL sp_transfer_student(1, 9999);

SELECT student_id, department_id FROM students WHERE student_id = 1;
SELECT * FROM department_transfer_log WHERE student_id = 1 AND new_department_id = 9999;

START TRANSACTION;

INSERT INTO enrollments (student_id, course_id, enrollment_date, grade)
VALUES (2, 5, '2026-06-20', 'B');

SAVEPOINT after_first_insert;

INSERT INTO enrollments (student_id, course_id, enrollment_date, grade)
VALUES (2, 9999, '2026-06-20', 'A');

ROLLBACK TO SAVEPOINT after_first_insert;
COMMIT;

SELECT * FROM enrollments WHERE student_id = 2 AND enrollment_date = '2026-06-20';