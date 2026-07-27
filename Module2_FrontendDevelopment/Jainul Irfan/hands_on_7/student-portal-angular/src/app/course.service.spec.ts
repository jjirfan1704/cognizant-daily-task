import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map remote posts into Course objects', (done) => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].code).toBe('CS301');
      expect(courses[0].name).toBe('Intro To Angular');
      done();
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    );
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 1, title: 'intro to angular basics' },
      { id: 2, title: 'operating systems overview' }
    ]);
  });
});
