<script setup>
defineProps({
  name: { type: String, required: true },
  code: { type: String, required: true },
  credits: { type: Number, required: true },
  grade: { type: String, required: true }
});
</script>

<template>
  <article class="course-card">
    <div class="card-top">
      <h3>{{ name }}</h3>
      <span class="course-code">{{ code }}</span>
    </div>

    <div class="card-body">
      <span class="credits">{{ credits }} credits</span>
      <span class="grade" :class="{ 'grade-good': grade.startsWith('A') }">
        Grade: {{ grade }}
      </span>
    </div>

    <slot />
  </article>
</template>

<style scoped>
.course-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.card-top h3 {
  font-size: 1.05rem;
}

.course-code {
  font-size: 0.78rem;
  color: var(--ink-muted);
  background: var(--surface);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
}

.card-body {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--ink-muted);
}

.grade-good {
  color: var(--primary);
  font-weight: 600;
}
</style>
