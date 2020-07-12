import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserData } from './register-state/register';
import { AuthService } from '../../lgs-core/lgs-auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  userData: FormGroup;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.userData = this.createForm({
      signupEmail: '',
      signupMobile: '',
      signupPassword: '',
      confirmPassword: ''
    });
  }

  ngOnInit() {}

  register = () => {
    this.spinner.show();
    this.authService.userRegistration(this.userData.value as UserData).subscribe(
      (res) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  private createForm(model: UserData): FormGroup {
    return this.fb.group(model);
  }
}
