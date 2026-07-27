// ---------- Data ----------

const courses = [
  { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, grade: 'A' },
  { id: 2, name: 'Operating Systems', code: 'CS305', credits: 3, grade: 'B+' },
  { id: 3, name: 'Database Systems', code: 'CS310', credits: 4, grade: 'A-' },
  { id: 4, name: 'Computer Networks', code: 'CS402', credits: 3, grade: 'A' },
  { id: 5, name: 'Machine Learning', code: 'CS415', credits: 3, grade: 'B' }
];

// ---------- Elements ----------

const courseGrid = document.getElementById('course-grid');
const searchInput = document.getElementById('course-search');
const resultsCount = document.getElementById('results-count');

// ---------- Rendering ----------

function renderCourses(list) {
  courseGrid.innerHTML = '';

  list.forEach((course) => {
    const li = document.createElement('li');
    li.className = 'course-card';
    li.tabIndex = 0; // keyboard-focusable as a whole card
    li.setAttribute('role', 'group');
    li.setAttribute('aria-label', `${course.name}, ${course.code}`);

    li.innerHTML = `
      <div class="card-top">
        <h3>${course.name}</h3>
        <span class="course-code">${course.code}</span>
      </div>
      <div class="card-body">
        <span class="credits">${course.credits} credits</span>
        <span class="grade ${course.grade.startsWith('A') ? 'grade-good' : ''}">
          Grade: ${course.grade}
        </span>
      </div>
      <div class="card-actions">
        <button type="button" class="enroll-btn" data-course-id="${course.id}">
          Enroll
        </button>
      </div>
    `;

    // Pressing Enter (or Space) while the card itself is focused triggers the
    // same action as clicking its Enroll button, per WCAG 2.1.1 (keyboard).
    li.addEventListener('keydown', (event) => {
      if (event.target !== li) {
        return; // let the button/inputs inside the card handle their own key events
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleEnroll(course.id, li);
      }
    });

    li.querySelector('.enroll-btn').addEventListener('click', () => {
      handleEnroll(course.id, li);
    });

    courseGrid.appendChild(li);
  });

  updateResultsCount(list.length);
}

function updateResultsCount(count) {
  // This text node lives inside an element with role="status" and
  // aria-live="polite" in the HTML, so screen readers announce the change
  // automatically whenever this text changes.
  resultsCount.textContent = `${count} course${count === 1 ? '' : 's'} found`;
}

function handleEnroll(courseId, cardEl) {
  const button = cardEl.querySelector('.enroll-btn');
  button.textContent = 'Enrolled';
  button.disabled = true;
}

// ---------- Search filtering ----------

searchInput.addEventListener('input', () => {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = term
    ? courses.filter(
        (course) =>
          course.name.toLowerCase().includes(term) ||
          course.code.toLowerCase().includes(term)
      )
    : courses;
  renderCourses(filtered);
});

// ---------- Mobile nav toggle (aria-expanded) ----------

const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// ---------- Profile form validation ----------

const profileForm = document.getElementById('profile-form');
const saveConfirmation = document.getElementById('save-confirmation');

const fieldValidators = {
  'full-name': (value) => value.trim().length > 0,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  semester: (value) => {
    const num = Number(value);
    return value !== '' && num >= 1 && num <= 8;
  }
};

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;

  Object.keys(fieldValidators).forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    const fieldIsValid = fieldValidators[fieldId](input.value);

    errorEl.hidden = fieldIsValid;
    input.setAttribute('aria-invalid', String(!fieldIsValid));
    if (!fieldIsValid) {
      isValid = false;
    }
  });

  saveConfirmation.hidden = !isValid;
  if (isValid) {
    console.log('Profile submitted:', new FormData(profileForm));
  }
});

// ---------- Initial render ----------

renderCourses(courses);
