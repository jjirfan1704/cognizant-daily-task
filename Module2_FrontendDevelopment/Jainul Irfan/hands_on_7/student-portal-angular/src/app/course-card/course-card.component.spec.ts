import { TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CourseCardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the inputs it is given', () => {
    const fixture = TestBed.createComponent(CourseCardComponent);
    const component = fixture.componentInstance;
    component.name = 'Data Structures';
    component.code = 'CS301';
    component.credits = 4;
    component.grade = 'A';
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Data Structures');
    expect(el.textContent).toContain('CS301');
    expect(el.textContent).toContain('4 credits');
  });
});
