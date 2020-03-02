import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

import {UserData} from '../model/userdata';
import {AuthService} from '../../core/auth/auth.service';
import {ToastManager} from '../../components/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toaster: ToastManager,
  ) {}

  userData: UserData = {
    signupEmail: '',
    signupMobile: '',
    signupPassword: '',
    confirmPassword: '',
  };

  ngOnInit() {}

  register = () => {
    this.spinner.show();
    this.authService.userRegistration(this.userData).subscribe(
      res => {
        this.spinner.hide();
        this.toaster.showSuccess(
          'User registration successful. User your email id and password to login now.',
        );
      },
      err => {
        this.spinner.hide();
        this.toaster.showError(
          'Something went wrong. Please try after sometime.',
        );
      },
    );
  }
}
