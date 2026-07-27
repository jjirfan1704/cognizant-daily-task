import mysql.connector
import time

conn = mysql.connector.connect(
    host="localhost",
    user="root",          
    password="Sugii123@",
    database="college_db"
)

# -------------------------------
# Version 1: N+1 Problem
# -------------------------------
def n_plus_one():
    cursor = conn.cursor()
    query_count = 0

    cursor.execute("SELECT enrollment_id, student_id FROM enrollments")
    query_count += 1

    enrollments = cursor.fetchall()

    for enrollment_id, student_id in enrollments:
        cursor.execute(
            "SELECT first_name, last_name FROM students WHERE student_id = %s",
            (student_id,)
        )
        cursor.fetchone()
        query_count += 1

    cursor.close()
    print(f"N+1 Version: {query_count} queries executed")


# -------------------------------
# Version 2: Using JOIN
# -------------------------------
def join_version():
    cursor = conn.cursor()
    query_count = 0

    cursor.execute("""
        SELECT e.enrollment_id,
               s.first_name,
               s.last_name
        FROM enrollments e
        JOIN students s
        ON e.student_id = s.student_id
    """)

    cursor.fetchall()
    query_count += 1

    cursor.close()
    print(f"JOIN Version: {query_count} query executed")


# -------------------------------
# Compare execution time
# -------------------------------
start = time.time()
n_plus_one()
time_n1 = time.time() - start

start = time.time()
join_version()
time_join = time.time() - start

print(f"N+1 Time  : {time_n1:.6f} seconds")
print(f"JOIN Time : {time_join:.6f} seconds")