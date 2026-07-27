// Static catalog acting as a stand-in data source. CoursesView copies this
// into its own reactive ref inside onMounted (simulating an initial load),
// and CourseDetailView looks a single entry up by id via the route param.
export const courseCatalog = [
  { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, grade: 'A' },
  { id: 2, name: 'Operating Systems', code: 'CS305', credits: 3, grade: 'B+' },
  { id: 3, name: 'Database Systems', code: 'CS310', credits: 4, grade: 'A-' },
  { id: 4, name: 'Computer Networks', code: 'CS402', credits: 3, grade: 'A' },
  { id: 5, name: 'Machine Learning', code: 'CS415', credits: 3, grade: 'B' }
];
