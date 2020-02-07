import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {AuthService} from '../../core/auth/auth.service';
import {AppRoutingModule} from '../app-routing.module';
import {LoginComponent} from './login.component';
import {reducers} from '../reducers';
import {SharedModule} from '../../core/shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginFormSpy;
  let authSpy;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      declarations: [LoginComponent],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginFormSpy = spyOn(component.loginForm.form, 'reset');
    //authSpy = spyOn(authService, 'userRegistration');
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
    //expect(authService.userRegistration).toHaveBeenCalledWith(component.user);
  });
});
