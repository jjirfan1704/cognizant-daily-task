# SDLC vs TDLC - V Model & Agile QA Integration

## Task 1

### 9. V-Model Mapping

The V-Model shows that every development phase has a corresponding testing phase.

```text
Requirements Analysis                        Acceptance Testing
         \                                        /
          \                                      /
           \                                    /
            \                                  /
          System Design                 System Testing
               \                            /
                \                          /
                 \                        /
                  \                      /
          Architecture Design     Integration Testing
                    \              /
                     \            /
                      \          /
                     Module Design
                           |
                           |
                        Coding
                           |
                           |
                     Unit Testing
```

In the V-Model, the left side represents the software development activities and the right side represents the testing activities. Coding is done after the design phase and before the testing phases begin.

---

### 10. SDLC and TDLC Mapping

**Requirements Analysis → Acceptance Testing**

During the requirements phase, the Acceptance Test Plan is prepared based on the customer's requirements. Acceptance Testing later verifies that all business requirements have been satisfied.

---

**System Design → System Testing**

During System Design, the overall structure of the application is planned. Based on this, the System Test Plan is prepared to verify the complete application.

---

**Architecture Design → Integration Testing**

Architecture Design defines how different modules communicate with each other. Integration Test Cases are prepared to verify these interactions.

---

**Module Design → Unit Testing**

Module Design focuses on individual modules or functions. Unit Test Cases are prepared to verify each module separately.

---

### 11. Entry and Exit Criteria

**Unit Testing**

Entry Criteria: Module development should be completed and unit test cases should be prepared.

Exit Criteria: All unit test cases should be executed successfully and no critical defects should remain.

---

**Integration Testing**

Entry Criteria: Unit testing should be completed and all required modules should be integrated.

Exit Criteria: Communication between different modules should work correctly and major integration defects should be fixed.

---

**System Testing**

Entry Criteria: The complete application should be available for testing and all system test cases should be ready.

Exit Criteria: All planned system test cases should be executed successfully and there should be no open Critical or High severity defects.

---

**Acceptance Testing**

Entry Criteria: System testing should be completed and the application should be ready for customer validation.

Exit Criteria: The customer accepts the application and confirms that all business requirements have been satisfied.

---

### 12. QA Involvement in the V-Model

QA should be involved from the beginning of the project instead of waiting until testing starts.

The first place where QA should participate is during the **Requirements Analysis** phase. QA can review the requirements, identify missing or unclear points and make sure they are testable.

The second place is during the **System Design** phase. QA can review the design documents and start preparing test cases early, which helps identify problems before development begins.

---

## Task 2

### 13. Problems with Waterfall Testing

In the Waterfall model, testing starts only after development is completed. This causes several problems.

- Bugs are found very late, making them more expensive and time-consuming to fix.

- If the requirements were misunderstood, developers may need to rewrite a large amount of code.

- Testing becomes difficult because all modules are tested together at the end of the project.

---

### 14. QA Role in Agile Ceremonies

**Sprint Planning**

QA discusses user stories with the team, understands the requirements and prepares acceptance criteria and test cases before development begins.

---

**Daily Standup**

QA shares testing progress, reports defects, discusses blockers and works with developers to resolve issues.

---

**Sprint Review**

QA verifies completed features, checks whether the acceptance criteria are satisfied and participates in the product demonstration.

---

**Retrospective**

QA discusses problems faced during testing, suggests improvements and shares ideas to improve the testing process in the next sprint.

---

### 15. Shift-Left Testing Practices

**a) Reviewing requirements**

QA reviews the requirements before coding starts to make sure they are complete, clear and testable.

---

**b) Writing test cases before coding (TDD/BDD)**

Preparing test cases before development helps developers understand what is expected and reduces misunderstandings later.

---

**c) Static code analysis**

Developers use static analysis tools to identify coding issues and security problems before running the application.

---

**d) API contract testing before integration**

The request and response format of the API is verified before different modules are integrated. This helps reduce integration issues later.

---

### 16. Acceptance Criteria (Given-When-Then)

**Scenario 1 - Successful Course Creation**

**Given** the college admin is logged into the application

**When** the admin enters valid course details and clicks Create

**Then** the course should be created successfully and should appear in the course list.

---

**Scenario 2 - Duplicate Course Code**

**Given** a course with the same course code already exists

**When** the admin tries to create another course using the same course code

**Then** an error message should be displayed stating that the course code already exists.

---

**Scenario 3 - Missing Required Fields**

**Given** the admin is on the Create Course page

**When** the admin leaves required fields empty and submits the form

**Then** validation messages should be displayed and the course should not be created.
