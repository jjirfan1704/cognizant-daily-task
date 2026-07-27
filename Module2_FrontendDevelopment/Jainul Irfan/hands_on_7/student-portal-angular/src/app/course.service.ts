import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  grade: string;
}

// Fallback data shape mirrors what the placeholder API returns
// (id, title) so it can be mapped into Course objects for display.
interface RemotePost {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

  private readonly courseCodes = ['CS301', 'CS305', 'CS310', 'CS402', 'CS415'];
  private readonly courseCredits = [4, 3, 4, 3, 2];
  private readonly courseGrades = ['A', 'A-', 'B+', 'A', 'B'];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return new Observable<Course[]>((subscriber) => {
      this.http.get<RemotePost[]>(this.apiUrl).subscribe({
        next: (posts) => {
          const courses: Course[] = posts.map((post, index) => ({
            id: post.id,
            name: this.toCourseName(post.title),
            code: this.courseCodes[index] ?? `CS${300 + index}`,
            credits: this.courseCredits[index] ?? 3,
            grade: this.courseGrades[index] ?? 'B'
          }));
          subscriber.next(courses);
          subscriber.complete();
        },
        error: (err) => subscriber.error(err)
      });
    });
  }

  private toCourseName(rawTitle: string): string {
    const words = rawTitle.split(' ').slice(0, 3);
    const titleCased = words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1)
    );
    return titleCased.join(' ');
  }
}
