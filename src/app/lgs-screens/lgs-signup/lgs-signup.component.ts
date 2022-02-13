import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { LgsApiService } from '../../lgs-api/lgs-api.service';

@Component({
  selector: 'lgs-signup',
  templateUrl: './lgs-signup.component.html',
  styleUrls: ['./lgs-signup.component.css']
})
export class LgsSignupComponent {
  @Output() signupAction = new EventEmitter<any>();

  signUpForm: FormGroup = this.fb.group({
    signupEmail: ['', [Validators.required, Validators.email]],
    signupMobile: ['', Validators.required],
    signupPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    signupEmailAlt: ['']
  });

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService
    ) {
      console.log(this.signUpForm);
    }

  register() {
    const { signupEmail, signupMobile, signupPassword } = this.signUpForm.value;
    this.apiService.userRegistration({ signupEmail, signupMobile, signupPassword }).subscribe(() =>{
      this.signupAction.emit('login');
    });
  }
}
