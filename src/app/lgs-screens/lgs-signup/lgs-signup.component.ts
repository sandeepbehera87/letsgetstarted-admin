import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LgsSharedModalComponent } from '../../lgs-shared/lgs-shared-modal/lgs-shared-modal.component';
import { LgsApiService } from '../../lgs-api/lgs-api.service';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'lgs-signup',
  templateUrl: './lgs-signup.component.html',
  styleUrls: ['./lgs-signup.component.css']
})
export class LgsSignupComponent {
  @Output() signupAction = new EventEmitter<any>();
  @ViewChild('registrationConfirmModal', { static: true })
  registrationConfirmModal!: LgsSharedModalComponent;

  signUpForm: FormGroup = this.fb.group({
    email: ['', {updateOn: 'blur', validators: [Validators.required, Validators.email]}],
    mobile: ['', {updateOn: 'blur', validators: [
      Validators.required,
      Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{10}$')
    ]}],
    userId: ['', {updateOn: 'blur', validators: [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_]*$')
    ]}],
    password: ['', {updateOn: 'blur', validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
    ]}],
    'confirm-password': ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
    ]],
    signupEmailAlt: ['']
  },
    { validators: [ConfirmedValidator('password', 'confirm-password')] }
  );

  get f() {
    return this.signUpForm?.controls;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService
  ) {
    console.log(this.signUpForm);
  }

  register() {
    const { email, mobile, password, userId } = this.signUpForm.value;
    this.apiService.userRegistration({ email, mobile, password, userId }).subscribe(() => {
      this.registrationConfirmModal.show();
    });
  }

  signIn() {
    this.signupAction.emit('login');
  }
}
