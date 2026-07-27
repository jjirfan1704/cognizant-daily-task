import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    semester: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(8)
    ])
  });

  submittedSuccessfully = false;

  get name() {
    return this.profileForm.controls.name;
  }

  get email() {
    return this.profileForm.controls.email;
  }

  get semester() {
    return this.profileForm.controls.semester;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    console.log('Profile submitted:', this.profileForm.value);
    this.submittedSuccessfully = true;
  }
}
