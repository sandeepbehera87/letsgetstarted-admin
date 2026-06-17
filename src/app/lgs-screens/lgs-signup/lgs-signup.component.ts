import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { LgsApiService } from '../../lgs-api/lgs-api.service';
import { LgsErrorService } from '../../lgs-shared/lgs-error-service/lgs-error.service';
import { LgsToastService } from '../../lgs-shared/lgs-toast/lgs-toast.service';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!control || !matchingControl) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ...matchingControl.errors, confirmedValidator: true });
    } else {
      const errors = { ...(matchingControl.errors || {}) };
      delete errors['confirmedValidator'];
      matchingControl.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
}

@Component({
  standalone: false,
  selector: 'lgs-signup',
  templateUrl: './lgs-signup.component.html',
  styleUrls: ['./lgs-signup.component.css']
})
export class LgsSignupComponent {
  @Output() signupAction = new EventEmitter<string>();

  signUpForm: FormGroup;
  isRegistering = false;

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService,
    private toastService: LgsToastService,
    private errorService: LgsErrorService,
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]],
      userId: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),
      ]],
      'confirm-password': ['', [Validators.required]],
      signupEmailAlt: [''],
    }, {
      validators: [ConfirmedValidator('password', 'confirm-password')],
    });
  }

  register(): void {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.invalid) {
      this.showSignupError('Please complete all required fields correctly.');
      return;
    }

    const { email, mobile, password, userId } = this.signUpForm.value;
    this.isRegistering = true;

    this.apiService.userRegistration({ email, mobile, password, userId }).subscribe({
      next: () => {
        this.isRegistering = false;
        this.signUpForm.reset();
        this.toastService.showSuccess('Registration successful! Please sign in.');
        this.signupAction.emit('login');
      },
      error: (error) => {
        this.isRegistering = false;
        console.error('Signup error:', error);
        this.showSignupError(this.errorService.getDisplayMessage(error, {
          fallback: 'Registration failed. Please try again.',
          statusMessages: {
            400: 'User already exists or registration data is invalid.',
            500: 'Server error. Please try again later.',
          },
        }));
      },
    });
  }

  private showSignupError(message: string): void {
    this.toastService.showError(message);
  }
}