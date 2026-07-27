import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileComponent } from './student-profile.component';

describe('StudentProfileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StudentProfileComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentProfileComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    const fixture = TestBed.createComponent(StudentProfileComponent);
    const component = fixture.componentInstance;
    expect(component.profileForm.valid).toBeFalse();
  });

  it('should be invalid with a bad email', () => {
    const fixture = TestBed.createComponent(StudentProfileComponent);
    const component = fixture.componentInstance;
    component.profileForm.setValue({
      name: 'Ananya Krishnan',
      email: 'not-an-email',
      semester: 3
    });
    expect(component.email.errors?.['email']).toBeTruthy();
  });

  it('should be valid with correct data', () => {
    const fixture = TestBed.createComponent(StudentProfileComponent);
    const component = fixture.componentInstance;
    component.profileForm.setValue({
      name: 'Ananya Krishnan',
      email: 'ananya@example.com',
      semester: 5
    });
    expect(component.profileForm.valid).toBeTrue();
  });
});
