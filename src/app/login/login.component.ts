import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalComponent} from '../../components/modal/modal.component';
import {AuthService} from '../../core/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserData} from '../model/userdata';
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
  @ViewChild('login', {static: false}) loginForm;
  @ViewChild('signupForm', {static: false}) signupForm;
  @ViewChild(ModalComponent, {static: false}) modalComponent: ModalComponent;

  hide = true;

  user: UserData = {
    signupEmail: '',
    signupMobile: '',
    signupPassword: '',
    confirmPassword: '',
  };
  loginData: LoginData = {
    email: '',
    password: '',
  };
  openSignUpModal = false;
  onSignUpSuccess = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {}

  openSignUp() {
    this.loginForm.form.reset();
    if (this.signupForm) this.signupForm.form.reset();
    this.openSignUpModal = true;
    this.onSignUpSuccess = false;
    setTimeout(() => {
      this.modalComponent.show();
    }, 500);
  }

  registerUser() {
    this.spinner.show();
    this.openSignUpModal = false;
    this.onSignUpSuccess = true;
    const userData = {
      email: this.user.signupEmail,
      mobile: this.user.signupMobile,
      password: this.user.signupPassword,
    };
    this.authService.userRegistration(userData).subscribe(
      response => {
        this.modalComponent.hide();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
    );
  }

  onLogIn() {
    console.log('onLogIn');
    this.spinner.show();
    this.authService.signIn(this.loginData).subscribe(
      response => {
        console.log('response');
        // this.store.dispatch(LoginAction.login({token: response.token}));
        this.spinner.hide();
        this.router.navigate(['dashboard'], {
          queryParams: {pagename: 'addQuestion'},
        });
      },
      error => {
        this.spinner.hide();
      },
    );
  }
}
