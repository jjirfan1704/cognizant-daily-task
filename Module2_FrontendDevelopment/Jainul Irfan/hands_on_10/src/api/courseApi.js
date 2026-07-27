import apiClient from './apiClient';

// jsonplaceholder doesn't know about "courses", so these fixed arrays map its
// generic posts onto the course shape the rest of the app expects. This is
// the one place that mapping happens — everything downstream just deals with
// { id, name, code, credits, grade } objects.
const courseCodes = ['CS301', 'CS305', 'CS310', 'CS402', 'CS415'];
const courseCredits = [4, 3, 4, 3, 2];
const courseGrades = ['A', 'A-', 'B+', 'A', 'B'];

function mapPostToCourse(post, index = 0) {
  const words = post.title.split(' ').slice(0, 3);
  const name = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id: post.id,
    name,
    code: courseCodes[index] ?? `CS${300 + index}`,
    credits: courseCredits[index] ?? 3,
    grade: courseGrades[index] ?? 'B'
  };
}

export async function getAllCourses() {
  const posts = await apiClient.get('/posts?_limit=5');
  return posts.map((post, index) => mapPostToCourse(post, index));
}

export async function getCourseById(id) {
  const post = await apiClient.get(`/posts/${id}`);
  return mapPostToCourse(post, Number(id) - 1);
}

export async function enrollStudent(studentId, courseId) {
  // jsonplaceholder fakes the write and echoes back an id — good enough to
  // exercise the request/response interceptor pipeline end to end.
  return apiClient.post('/posts', { studentId, courseId });
}
