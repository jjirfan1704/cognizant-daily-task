# QA Concepts, Functional Testing & Defect Lifecycle

## Task 1

### 1. Testing Types for the Course Management API

**Unit Testing (Functional)**

Unit testing is used to test a single function without involving other modules.

Example:

Test the `create_course()` function by passing valid course details and verify that the function creates the course object correctly.

---

**Integration Testing (Functional)**

Integration testing checks whether different components work properly together.

Example:

Send a POST request to `/api/courses/` with valid course details and verify that the course is successfully stored in the database.

---

**System Testing (Functional)**

System testing checks the complete application from start to finish.

Example:

Create a new course using the POST endpoint. Then retrieve the same course using the GET endpoint and verify that all the details are correct.

---

**User Acceptance Testing (Functional)**

User Acceptance Testing (UAT) is done by the actual end user to make sure the application satisfies the business requirements.

Example:

A college administrator logs into the application, creates a new course and checks whether the course appears in the list successfully.

---

All the above examples are Functional Testing because they check whether the required functionality is working correctly.

One example of Non-Functional Testing is **Performance Testing**.

Example:

Send around 100 concurrent requests to the `GET /api/courses/` endpoint and verify that the response time stays below 2 seconds without any server errors.

---

### 2. Black-Box Testing and White-Box Testing

**Black-Box Testing**

In Black-Box Testing, the tester does not know anything about the internal source code. The testing is done only by giving inputs and checking whether the output is correct. This type of testing is generally performed by QA testers.

**White-Box Testing**

In White-Box Testing, the tester knows the internal code and program logic. Different code paths, conditions and loops are tested to make sure the code works correctly. This type of testing is generally performed by developers.

---

### 3. Test Cases for POST /api/courses/

| Test Case ID | Description | Preconditions | Test Steps | Expected Result | Actual Result | Pass/Fail |
|--------------|-------------|---------------|------------|-----------------|---------------|-----------|
| TC001 | Verify course creation using valid details | API is running | Send POST request with valid course details | HTTP 201 Created is returned and the course is stored successfully | | |
| TC002 | Verify course creation without Course Name | API is running | Send POST request without Course Name | HTTP 400 Bad Request is returned with a validation error | | |
| TC003 | Verify duplicate course creation | Same course code already exists | Send POST request using an existing course code | Duplicate course error is displayed | | |

---

## Task 2

### 4. Defect Lifecycle

A defect usually goes through the following stages:

**New → Assigned → Open → Fixed → Retest → Verified → Closed**

If the reported issue is not actually a bug or cannot be reproduced, it is marked as **Rejected**.

If the bug is valid but the development team decides to fix it in a future release because of time or business reasons, it is marked as **Deferred**.

---

### 5. Severity and Priority Classification

**a) POST /api/courses/ returns HTTP 500 Internal Server Error for all requests**

Severity : Critical

Priority : P1

Reason :

This is a major issue because users cannot create any courses. The main functionality of the application is completely broken, so it should be fixed immediately.

---

**b) Course names longer than 150 characters are silently truncated**

Severity : Medium

Priority : P2

Reason :

The application still works, but the entered data is modified without informing the user. This may lead to incorrect information being stored.

---

**c) Swagger page contains a spelling mistake**

Severity : Low

Priority : P4

Reason :

This is only a documentation mistake. It does not affect the functionality of the application.

---

**d) Login sometimes returns HTTP 401 even with correct credentials**

Severity : High

Priority : P1

Reason :

Even though it happens occasionally, users are unable to log in. Since login is an important feature, this issue should be fixed as early as possible.

---

### 6. Defect Report

Defect ID : DEF-001

Title : POST /api/courses/ returns HTTP 500 Internal Server Error

Environment : QA Environment

Build Version : v1.0

Severity : Critical

Priority : P1

Steps to Reproduce

1. Open the Course Management API.
2. Send a POST request to `/api/courses/`.
3. Enter valid course details.
4. Submit the request.

Expected Result

The API should create the course successfully and return HTTP 201 Created.

Actual Result

The API returns HTTP 500 Internal Server Error and the course is not created.

Attachments

Screenshot showing the HTTP 500 Internal Server Error.

---

### 7. Severity vs Priority

Severity tells how serious the defect is and how much impact it has on the application.

Priority tells how urgently the defect should be fixed.

Example:

Suppose the company name is misspelled on the homepage. This is a Low Severity issue because the application still works normally. However, it becomes a High Priority issue because it is visible to all users and affects the company's image.

Another example is a bug that crashes the application only on an old browser that very few users use. It is a High Severity issue because the application crashes, but it may be given a Low Priority since only a small number of users are affected.