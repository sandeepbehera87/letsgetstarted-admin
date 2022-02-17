import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

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

  signUpForm: FormGroup = this.fb.group({
    signupEmail: ['', {updateOn: 'blur', validators: [Validators.required, Validators.email]}],
    signupMobile: ['', {updateOn: 'blur', validators: Validators.required}],
    signupPassword: ['', {updateOn: 'blur', validators: Validators.required}],
    confirmPassword: ['', Validators.required],
    signupEmailAlt: ['']
  },
    { validators: [ConfirmedValidator('signupPassword', 'confirmPassword')] }
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
    const { signupEmail, signupMobile, signupPassword } = this.signUpForm.value;
    this.apiService.userRegistration({ signupEmail, signupMobile, signupPassword }).subscribe(() => {
      this.signupAction.emit('login');
    });
  }

  signIn() {
    this.signupAction.emit('login');
  }
}
