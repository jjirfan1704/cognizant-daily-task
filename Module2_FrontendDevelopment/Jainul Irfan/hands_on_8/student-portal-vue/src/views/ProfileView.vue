<script setup>
import { useEnrollmentStore } from '../stores/enrollment';

const enrollmentStore = useEnrollmentStore();
</script>

<template>
  <section class="profile-view">
    <h2>My Profile</h2>

    <div class="summary-bar">
      <span>{{ enrollmentStore.enrolledCourses.length }} enrolled</span>
      <span>{{ enrollmentStore.totalCredits }} total credits</span>
    </div>

    <ul v-if="enrollmentStore.enrolledCourses.length" class="enrolled-list">
      <li v-for="course in enrollmentStore.enrolledCourses" :key="course.id">
        <div>
          <strong>{{ course.name }}</strong>
          <span class="course-code">{{ course.code }}</span>
        </div>
        <button class="unenroll-btn" @click="enrollmentStore.unenroll(course.id)">
          Remove
        </button>
      </li>
    </ul>

    <p v-else class="empty-state">
      You haven't enrolled in any courses yet.
    </p>
  </section>
</template>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-bar {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--ink-muted);
}

.enrolled-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 420px;
}

.enrolled-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
}

.course-code {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: var(--ink-muted);
}

.unenroll-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  color: var(--ink-muted);
}

.empty-state {
  color: var(--ink-muted);
  font-style: italic;
}
</style>
