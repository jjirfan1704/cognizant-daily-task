import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CourseListComponent } from './course-list.component';
import { CourseCardComponent } from '../course-card/course-card.component';

describe('CourseListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CourseListComponent, CourseCardComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CourseListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('filteredCourses should return all courses when searchTerm is empty', () => {
    const fixture = TestBed.createComponent(CourseListComponent);
    const component = fixture.componentInstance;
    component.allCourses = [
      { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, grade: 'A' }
    ];
    component.searchTerm = '';
    expect(component.filteredCourses.length).toBe(1);
  });

  it('filteredCourses should filter by name or code', () => {
    const fixture = TestBed.createComponent(CourseListComponent);
    const component = fixture.componentInstance;
    component.allCourses = [
      { id: 1, name: 'Data Structures', code: 'CS301', credits: 4, grade: 'A' },
      { id: 2, name: 'Operating Systems', code: 'CS305', credits: 3, grade: 'B+' }
    ];
    component.searchTerm = 'os';
    expect(component.filteredCourses.length).toBe(1);
    expect(component.filteredCourses[0].code).toBe('CS305');
  });
});
