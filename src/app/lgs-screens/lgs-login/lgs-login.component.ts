import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';
import { loginSuccess, User } from '../../lgs-state/lgs-auth/lgs.login.action';

@Component({
  selector: 'lgs-login',
  templateUrl: './lgs-login.component.html',
  styleUrls: ['./lgs-login.component.css']
})
export class LgsLoginComponent {
  @Output() loginAction = new EventEmitter<any>();

  loginForm: FormGroup = this.fb.group({
    userId: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required
      ]
    ]
  });
  submitted = false;
  serverError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: LgsApiService,
    private store: Store
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    const { userId, password } = this.loginForm.value;
    this.apiService.signIn({ userId, password }).pipe(
      tap(res => {
        const token = res.token.split('Bearer ')[1];
        const user: User = {
          token,
          userId: res.userId
        }
        this.store.dispatch(loginSuccess({ payload: user }));
        this.router.navigate(['dashboard'], { relativeTo: this.route });
      },
        error => {
          this.serverError = error.error?.message;
        }
      )).subscribe();
  }

  signUp() {
    this.loginAction.emit('signUp');
  }
}
