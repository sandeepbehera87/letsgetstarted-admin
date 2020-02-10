import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {StoreModule} from '@ngrx/store';
import {CustomMaterialModule} from '../../core/shared/material.module';
import {LoginComponent} from './login.component';
import {HeaderComponent} from '../header/header.component';
import {reducers} from '../reducers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginFormSpy;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        MDBBootstrapModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        HttpClientModule,
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        CustomMaterialModule,
      ],
      declarations: [LoginComponent, HeaderComponent],
      providers: [{provide: Router, useValue: mockRouter}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginFormSpy = spyOn(component.loginForm.form, 'reset');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open sign up form on openSignUp call', () => {
    component.openSignUp();
    expect(component.openSignUpModal).toBeTruthy();
    expect(component.onSignUpSuccess).toBeFalsy();
    expect(loginFormSpy).toHaveBeenCalled();
  });

  it('should make user registration on registerUser call', () => {
    component.user = {
      signupEmail: 'test@test.com',
      signupMobile: '01234567',
      signupPassword: 'test@123',
      confirmPassword: 'test@123',
    };
    component.registerUser();
    expect(component.openSignUpModal).toBeFalsy();
    expect(component.onSignUpSuccess).toBeTruthy();
  });
});
