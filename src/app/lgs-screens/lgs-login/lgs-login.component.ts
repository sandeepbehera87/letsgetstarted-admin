import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';
import { loginSuccess } from 'src/app/lgs-state/lgs-auth/lgs.login.action';

@Component({
  selector: 'lgs-login',
  templateUrl: './lgs-login.component.html',
  styleUrls: ['./lgs-login.component.css']
})
export class LgsLoginComponent {
  @Output() loginAction = new EventEmitter<any>();
  
  loginForm: FormGroup = this.fb.group({
    email: ['s@s.in', [Validators.required, Validators.email]],
    password: [
      '1',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)
      ]
    ]
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: LgsApiService,
    private store: Store
    ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.apiService.signIn({ email, password }).subscribe(res => {
      const token = res.token.split('Bearer ')[1];
      this.store.dispatch(loginSuccess({payload: token}));
      this.router.navigate(['dashboard'], { relativeTo: this.route });
    });
  }

  signUp() {
    this.loginAction.emit('signUp');
  }
}
