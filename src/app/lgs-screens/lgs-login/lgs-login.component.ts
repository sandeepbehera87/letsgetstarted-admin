import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';
import { LgsErrorService } from '../../lgs-shared/lgs-error-service/lgs-error.service';
import { LgsToastService } from '../../lgs-shared/lgs-toast/lgs-toast.service';
import { User } from '../../lgs-state/lgs-auth/lgs.login.action';
import { LgsAuthService } from '../../lgs-state/lgs-auth/lgs-auth.service';

@Component({
  standalone: false,
  selector: 'lgs-login',
  templateUrl: './lgs-login.component.html',
  styleUrls: ['./lgs-login.component.css']
})
export class LgsLoginComponent {
  @Output() loginAction = new EventEmitter<any>();

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: LgsApiService,
    private authService: LgsAuthService,
    private toastService: LgsToastService,
    private errorService: LgsErrorService,
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    const { userId, password } = this.loginForm.value;
    this.submitted = true;

    this.apiService.signIn({ userId, password }).subscribe({
      next: (res) => {
        if (!res?.token) {
          this.showLoginError('Invalid login response. Please try again.');
          this.submitted = false;
          return;
        }
        const token = res.token.split('Bearer ')[1] || res.token;
        const user: User = { token, userId };
        this.authService.setSession(user);
        this.router.navigate(['/shell/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.showLoginError(this.errorService.getDisplayMessage(error, {
          fallback: 'Login failed. Please check your credentials and try again.',
          statusMessages: {
            400: 'Incorrect user ID or password.',
            404: 'User not found. Please check your credentials.',
            500: 'Server error. Please try again later.',
          },
        }));
        this.submitted = false;
      },
    });
  }

  signUp() {
    this.loginAction.emit('signUp');
  }

  private showLoginError(message: string): void {
    this.toastService.showError(message);
  }
}