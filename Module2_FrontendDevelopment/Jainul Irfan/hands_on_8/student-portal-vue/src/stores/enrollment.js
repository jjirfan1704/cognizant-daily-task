import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrolledCourses = ref([]);

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

  return {
    enrolledCourses,
    totalCredits,
    isEnrolled,
    enroll,
    unenroll
  };
});
