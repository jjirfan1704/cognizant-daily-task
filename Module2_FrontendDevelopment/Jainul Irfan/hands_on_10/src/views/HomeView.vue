<script setup>
</script>

<template>
  <section class="home-view">
    <h2>Welcome back</h2>
    <p>
      Browse your courses, check details on any of them, and manage your
      profile — all from one place.
    </p>
    <RouterLink class="cta" to="/courses">Go to Courses</RouterLink>
  </section>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 480px;
}

.home-view p {
  color: var(--ink-muted);
}

.cta {
  align-self: flex-start;
  background-color: var(--primary);
  color: #fff;
  text-decoration: none;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>
