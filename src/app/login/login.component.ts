import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginData} from '../model/logindata';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {LoginAction} from './action.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('login') loginForm;

  hide = true;
  loginData: LoginData = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {}

  onLogIn() {
    this.spinner.show();
    this.authService.signIn(this.loginData).subscribe(
      response => {
        this.store.dispatch(LoginAction.login({token: response.token}));
        this.spinner.hide();
        this.router.navigate(['add-questions']);
      },
      error => {
        this.spinner.hide();
      },
    );
  }
}
