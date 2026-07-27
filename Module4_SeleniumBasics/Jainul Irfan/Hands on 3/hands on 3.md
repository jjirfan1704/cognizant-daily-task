# Test Automation Process, Lifecycle & Framework Types

## Task 1

### 1. Automation Criteria (Applied to POST /api/courses/)

1. **Repetitive Test**
   Tests that are executed frequently should be automated. The `POST /api/courses/` endpoint is tested after every build, so automating it saves time.

2. **Business Critical Feature**
   Creating a course is one of the main features of the application. If this feature fails, the system cannot be used properly, so it should be automated.

3. **Data-Driven Testing**
   The same API can be tested with different inputs like valid data, invalid data, missing fields and duplicate course codes. Automation makes this easy.

4. **Stable Feature**
   The course creation functionality does not change often, making it a good candidate for automation.

5. **Clear Expected Result**
   The API always returns a predictable response like HTTP 201 for successful creation, so it is easy to verify automatically.

---

### 2. Automate or Manual

**a) Regression test for all CRUD endpoints after every code change**

**Decision:** Automate

Reason: These tests are repetitive and need to run after every update.

---

**b) Exploratory testing of a new search feature**

**Decision:** Manual

Reason: Human thinking and exploration are required to discover unexpected issues.

---

**c) Performance test with 100 concurrent users**

**Decision:** Automate

Reason: Performance testing requires tools like JMeter or Locust and cannot be done manually.

---

**d) UI test for the login page**

**Decision:** Automate

Reason: Login functionality is tested frequently and can easily be automated using Selenium.

---

**e) Verify Swagger documentation**

**Decision:** Manual

Reason: Documentation accuracy is easier to verify manually since it involves reading and understanding the content.

---

**f) Smoke test after deployment**

**Decision:** Automate

Reason: Smoke tests should run immediately after deployment without manual effort.

---

### 3. Test Automation ROI

Test Automation ROI is the benefit gained by automating a test compared to the time and cost required to build and maintain it.

Automation Time = 4 hours = 240 minutes

Manual Execution Time = 30 minutes

Break-even Point = 240 ÷ 30 = **8 runs**

So the automation starts saving time after the **8th execution**.

The maintenance overhead starts only after the 10th run, so it does not affect the initial break-even point.

---

### 4. Flaky Tests

A flaky test is a test that sometimes passes and sometimes fails even though the application has not changed.

**Example:**

A Selenium test clicks the Submit button and immediately checks for the success message. Sometimes the page loads slowly, causing the test to fail randomly.

Ways to reduce flaky tests:

1. Use Explicit Waits instead of `time.sleep()`.
2. Use fresh test data for every test.
3. Avoid depending on unstable external services.

---

# Task 2

### 5. Framework Types

### Linear Framework

**Description**

All the test steps are written in a single script from beginning to end.

**Advantage**

Very easy to create.

**Disadvantage**

No code reusability. Any change requires updating every script.

**Example**

Automating a simple login test.

---

### Modular Framework

**Description**

The application is divided into separate modules and each module has its own reusable functions.

**Advantage**

Easy to maintain and reuse.

**Disadvantage**

Requires good programming knowledge.

**Example**

Creating separate modules for Login, Dashboard and Course pages.

---

### Data-Driven Framework

**Description**

The test logic is separated from the test data. Test data is stored in files like Excel or CSV.

**Advantage**

The same script can test many different inputs.

**Disadvantage**

Managing external data files adds extra work.

**Example**

Testing course creation using multiple sets of course details stored in a CSV file.

---

### Keyword-Driven Framework

**Description**

Test cases are written using predefined keywords like Click, Enter Text and Verify.

**Advantage**

Even non-programmers can create test cases.

**Disadvantage**

Initial setup is complex.

**Example**

Writing test steps in Excel using keywords.

---

### Hybrid Framework

**Description**

Hybrid Framework combines two or more framework types such as Modular and Data-Driven.

**Advantage**

Provides better flexibility, reusability and maintainability.

**Disadvantage**

More complex to design compared to other frameworks.

**Example**

Using Page Object Model together with Data-Driven Testing for the Course Management application.

---

### 6. Framework Recommendation

For the given scenario, I would recommend a **Hybrid Framework**.

Reason:

- Login with 50 users can be handled using Data-Driven Testing.
- Login steps can be reused using Modular or Page Object Model.
- Non-technical members can write scenarios using Keyword-Driven or BDD concepts.

A Hybrid Framework combines all these advantages, making it the best choice.

---

### 7. Hybrid Framework Folder Structure

```text
course_management_framework/
│
├── config/
│   └── config.py
│
├── test_data/
│   └── login_data.csv
│
├── pages/
│   ├── login_page.py
│   ├── dashboard_page.py
│   └── course_page.py
│
├── utils/
│   ├── logger.py
│   └── helpers.py
│
├── tests/
│   ├── test_login.py
│   ├── test_course.py
│   └── conftest.py
│
├── reports/
│
└── requirements.txt
```

This structure keeps the project organized by separating page objects, test scripts, test data, utilities and configuration files.
