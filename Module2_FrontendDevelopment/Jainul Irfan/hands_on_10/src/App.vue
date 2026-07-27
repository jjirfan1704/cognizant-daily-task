<script setup>
import Header from './components/Header.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
</script>

<template>
  <Header />
  <main class="page-wrap">
    <ErrorBoundary>
      <RouterView />
    </ErrorBoundary>
  </main>
</template>
