import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course, CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  allCourses: Course[] = [];
  searchTerm = '';
  isLoading = false;

  private coursesSub?: Subscription;

  // injected via the constructor rather than fetched directly in the
  // component, so this class stays free of HTTP-specific code
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesSub = this.courseService.getCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.coursesSub?.unsubscribe();
  }

  get filteredCourses(): Course[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.allCourses;
    }
    return this.allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term)
    );
  }

  trackByCourseId(_index: number, course: Course): number {
    return course.id;
  }
}
