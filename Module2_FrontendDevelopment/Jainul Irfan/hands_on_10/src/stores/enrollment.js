import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { enrollStudent } from '../api/courseApi';

const MOCK_STUDENT_ID = 'student-001';

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrolledCourses = ref([]);
  const isEnrolling = ref(false);
  const enrollError = ref(null);

  const totalCredits = computed(() =>
    enrolledCourses.value.reduce((sum, course) => sum + course.credits, 0)
  );

  function isEnrolled(courseId) {
    return enrolledCourses.value.some((c) => c.id === courseId);
  }

  function enroll(course) {
    if (isEnrolled(course.id)) {
      return;
    }
    enrolledCourses.value.push(course);
  }

  function unenroll(courseId) {
    enrolledCourses.value = enrolledCourses.value.filter(
      (c) => c.id !== courseId
    );
  }

  // Advanced Pinia pattern: one action that calls the API layer *and*
  // updates state, so a component just calls fetchAndEnroll(course) instead
  // of awaiting an API call itself and then separately committing a mutation.
  async function fetchAndEnroll(course) {
    if (isEnrolled(course.id)) {
      return;
    }
    isEnrolling.value = true;
    enrollError.value = null;
    try {
      await enrollStudent(MOCK_STUDENT_ID, course.id);
      enroll(course);
    } catch (err) {
      enrollError.value = err.message || 'Enrollment failed. Please try again.';
    } finally {
      isEnrolling.value = false;
    }
  }

  // Pinia's built-in store.$reset() only exists for Option Stores. This is a
  // Setup Store (Composition API style), so $reset has to be defined
  // manually and returned like any other action — it restores every ref to
  // its initial value.
  function $reset() {
    enrolledCourses.value = [];
    isEnrolling.value = false;
    enrollError.value = null;
  }

  return {
    enrolledCourses,
    isEnrolling,
    enrollError,
    totalCredits,
    isEnrolled,
    enroll,
    unenroll,
    fetchAndEnroll,
    $reset
  };
});
