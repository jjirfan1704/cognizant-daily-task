<script setup>
import { storeToRefs } from 'pinia';
import { useEnrollmentStore } from '../stores/enrollment';

const enrollmentStore = useEnrollmentStore();

// storeToRefs() pulls reactive state/getters out of the store as individual
// refs while preserving reactivity. Plain destructuring
// (`const { enrolledCourses } = enrollmentStore`) would break reactivity
// here because it copies the current value instead of a live reference.
const { enrolledCourses } = storeToRefs(enrollmentStore);
</script>

<template>
  <header class="site-header">
    <div class="brand">
      <span class="brand-mark">SP</span>
      <span class="brand-name">Student Portal</span>
    </div>

    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>

    <div class="enrolled-badge">
      Enrolled: {{ enrolledCourses.length }}
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.9rem 1.5rem;
  background-color: var(--primary);
  color: #ffffff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.brand-mark {
  background-color: var(--accent);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  margin-right: auto;
}

.nav-links a {
  color: #ece7f7;
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-links a.router-link-active {
  border-bottom-color: var(--accent);
  color: #ffffff;
}

.enrolled-badge {
  font-size: 0.85rem;
  background-color: var(--primary-dark);
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
}
</style>
