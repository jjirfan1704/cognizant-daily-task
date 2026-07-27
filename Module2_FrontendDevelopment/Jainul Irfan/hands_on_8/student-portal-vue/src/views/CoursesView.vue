<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import CourseCard from '../components/CourseCard.vue';
import { useEnrollmentStore } from '../stores/enrollment';
import { courseCatalog } from '../data/courses';

const courses = ref([]);
const searchTerm = ref('');
const isLoading = ref(false);

const enrollmentStore = useEnrollmentStore();

onMounted(() => {
  // simulate an initial fetch/load of the 5 course records
  isLoading.value = true;
  setTimeout(() => {
    courses.value = courseCatalog;
    isLoading.value = false;
  }, 300);
});

const filteredCourses = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) {
    return courses.value;
  }
  return courses.value.filter(
    (course) =>
      course.name.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term)
  );
});

function handleEnroll(course) {
  enrollmentStore.enroll(course);
}
</script>

<template>
  <section class="courses-view">
    <h2>My Courses</h2>

    <input
      v-model="searchTerm"
      type="text"
      class="search-box"
      placeholder="Search by course name or code..."
    />

    <div v-if="isLoading" class="loading-row">
      <span class="spinner"></span>
      Loading courses...
    </div>

    <div v-else class="course-grid">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        :name="course.name"
        :code="course.code"
        :credits="course.credits"
        :grade="course.grade"
      >
        <div class="card-actions">
          <RouterLink :to="`/courses/${course.id}`" class="link-btn">
            View details
          </RouterLink>
          <button
            class="enroll-btn"
            :disabled="enrollmentStore.isEnrolled(course.id)"
            @click="handleEnroll(course)"
          >
            {{ enrollmentStore.isEnrolled(course.id) ? 'Enrolled' : 'Enroll' }}
          </button>
        </div>
      </CourseCard>
    </div>

    <p v-if="!isLoading && filteredCourses.length === 0" class="empty-state">
      No courses found.
    </p>
  </section>
</template>

<style scoped>
.courses-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-box {
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  max-width: 360px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.9rem;
}

.loading-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--ink-muted);
  font-size: 0.9rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.4rem;
  border-top: 1px solid var(--border);
}

.link-btn {
  font-size: 0.82rem;
  color: var(--primary);
  text-decoration: none;
}

.enroll-btn {
  font-size: 0.8rem;
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.35rem 0.7rem;
}

.enroll-btn:disabled {
  background-color: #b6aed0;
  cursor: not-allowed;
}

.empty-state {
  color: var(--ink-muted);
  font-style: italic;
}
</style>
