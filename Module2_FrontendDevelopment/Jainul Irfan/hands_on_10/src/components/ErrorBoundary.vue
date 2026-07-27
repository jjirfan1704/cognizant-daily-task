<script setup>
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);
const errorMessage = ref('');

// onErrorCaptured catches errors thrown by any descendant component during
// render, in a watcher, or in a lifecycle hook — this is Vue's equivalent of
// a React Error Boundary. Returning `false` stops the error from propagating
// further up the component tree once we've handled it here.
onErrorCaptured((error) => {
  hasError.value = true;
  errorMessage.value = error.message || 'Something went wrong.';
  console.error('[ErrorBoundary] caught:', error);
  return false;
});

function retry() {
  hasError.value = false;
  errorMessage.value = '';
}
</script>

<template>
  <div v-if="hasError" class="error-fallback" role="alert">
    <h2>Something went wrong</h2>
    <p>{{ errorMessage }}</p>
    <button type="button" @click="retry">Try again</button>
  </div>
  <slot v-else />
</template>

<style scoped>
.error-fallback {
  background-color: #fdecec;
  border: 1px solid #f3b7bb;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  max-width: 480px;
  color: #7a1f24;
}

.error-fallback button {
  margin-top: 0.75rem;
  background-color: #a4222f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}
</style>
