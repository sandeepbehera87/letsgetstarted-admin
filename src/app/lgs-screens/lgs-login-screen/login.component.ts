import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginUserData } from './login-state';
import * as la from './login-state/login/login.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('login') loginForm;

  authenticated$: Observable<any>;
  hide = true;
  loginData: FormGroup;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store,
    private action$: Actions,
    private fb: FormBuilder
  ) {
    this.authenticated$ = this.action$.pipe(
      ofType(la.LoginActionTypes.USER_LOGIN_SUCCESS)
    );

    this.loginData = this.createForm({
      'user-email': '',
      'user-password': ''
    });
  }

  ngOnInit() {
    this.authenticated$
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(() => {
      this.spinner.hide();
      this.router.navigate(['add-questions']);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLogIn() {
    const loginAction = new la.Login(this.loginData.value as LoginUserData);
    this.spinner.show();
    this.store.dispatch(loginAction);
  }

  private createForm(model: LoginUserData): FormGroup {
    return this.fb.group(model);
  }
}
