import axios from 'axios';

// Single configured Axios instance that every API module builds on. Changing
// the baseURL, timeout, or default headers here changes it for the whole app.
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: attach an Authorization header to every outgoing
// request. This is a hardcoded mock token for now — in a real app it would
// come from an auth store / cookie / localStorage.
apiClient.interceptors.request.use((config) => {
  const mockToken = 'mock-dev-token-123';
  config.headers.Authorization = `Bearer ${mockToken}`;
  return config;
});

// Response interceptor: (a) unwrap response.data so every caller works with
// plain data instead of the full Axios response object, and (b) normalise
// any failure into a consistent { message, statusCode } shape so components
// never have to branch on HTTP status codes themselves.
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const statusCode = error.response ? error.response.status : 0;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong while talking to the server.';

    return Promise.reject({ message, statusCode });
  }
);

export default apiClient;
