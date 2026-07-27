<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseCatalog } from '../data/courses';
import { useEnrollmentStore } from '../stores/enrollment';

const route = useRoute();
const router = useRouter();
const enrollmentStore = useEnrollmentStore();

const course = computed(() =>
  courseCatalog.find((c) => c.id === Number(route.params.id))
);

function handleEnroll() {
  if (!course.value) {
    return;
  }
  enrollmentStore.enroll(course.value);
  router.push('/profile');
}
</script>

<template>
  <section class="detail-view">
    <RouterLink to="/courses" class="back-link">&larr; Back to courses</RouterLink>

    <div v-if="course" class="detail-card">
      <h2>{{ course.name }}</h2>
      <p class="detail-code">{{ course.code }}</p>

      <dl class="detail-grid">
        <dt>Credits</dt>
        <dd>{{ course.credits }}</dd>
        <dt>Current grade</dt>
        <dd>{{ course.grade }}</dd>
      </dl>

      <button class="enroll-btn" @click="handleEnroll">
        Enroll and go to profile
      </button>
    </div>

    <p v-else class="not-found">Course not found.</p>
  </section>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.back-link {
  align-self: flex-start;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.85rem;
}

.detail-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  max-width: 420px;
}

.detail-code {
  color: var(--ink-muted);
  margin-top: -0.35rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.3rem 1rem;
  margin: 1rem 0;
}

.detail-grid dt {
  color: var(--ink-muted);
  font-size: 0.85rem;
}

.detail-grid dd {
  margin: 0;
  font-weight: 600;
}

.enroll-btn {
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
}

.not-found {
  color: var(--ink-muted);
  font-style: italic;
}
</style>
