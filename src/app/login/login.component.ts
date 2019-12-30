import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalComponent} from '../../components/modal/modal.component';
import {AuthService} from '../../core/auth/auth.service';
import {ToastManager} from '../../core/toast/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserData} from '../model/userdata';
import {LoginData} from '../model/logindata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('login', {static: false}) loginForm;
  @ViewChild('signupForm', {static: false}) signupForm;
  @ViewChild(ModalComponent, {static: false}) modalComponent: ModalComponent;

  user: UserData = {
    signupEmail: '',
    signupMobile: '',
    signupPassword: '',
    confirmPassword: ''
  };
  loginData: LoginData = {
    email: '',
    password: ''
  };
  openSignUpModal = false;
  onSignUpSuccess = false;
  emailNotverified = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastManager,
    private spinner: NgxSpinnerService,
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
    this.openSignUpModal = false;
    this.onSignUpSuccess = true;
    this.authService.userRegistration(this.user).then(
      res => {
        this.authService.verifyEmail().then(
          response => {
            this.modalComponent.show();
          },
          err => {
            console.error(err);
          },
        );
      },
      err => {
        this.toastr.showError(err.message);
        this.openSignUp();
        console.error(err);
      },
    );
  }

  onLogIn() {
    this.authService.signIn(this.loginData).then(
      res => {
        if (AuthService.isEmailVerified()) {
          this.emailNotverified = false;
          this.router.navigate(['dashboard', this.loginData.email]);
        } else {
          this.emailNotverified = true;
          setTimeout(() => {
            this.modalComponent.show();
          }, 500);
        }
      },
      err => {
        this.spinner.hide();
        this.toastr.showError('Email id or password is invalid');
      },
    );
  }

  resendVerification() {
    this.authService.verifyEmail().then(
      response => {
        this.toastr.showSuccess('Email verifaction is sent to your mail id');
      },
      err => {
        console.error(err);
      },
    );
  }
}
