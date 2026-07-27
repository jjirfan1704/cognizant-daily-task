import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Global, app-wide error handler. onErrorCaptured() in ErrorBoundary.vue
// only sees errors thrown inside the component tree it wraps; this handler
// is a last-resort net for anything that slips past that (errors thrown
// outside render, e.g. in a raw event listener or a timer callback). It
// can't render a fallback UI by itself, so it's mainly for logging —
// the visible fallback UI is the ErrorBoundary's job.
app.config.errorHandler = (error, instance, info) => {
  console.error('[Global error handler]', error, info);
};

app.mount('#app');
