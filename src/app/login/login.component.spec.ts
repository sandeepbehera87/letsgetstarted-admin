import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {ToastrModule} from 'ngx-toastr';
import {AuthService} from '../../core/auth/auth.service';
import {AppRoutingModule} from '../app-routing.module';
import {environment} from '../../environments/environment';
import {LoginComponent} from './login.component';
import {ModalComponent} from '../../components/modal/modal.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginFormSpy;
  let authSpy;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      declarations: [ModalComponent, LoginComponent],
      providers: [AuthService, AngularFireAuth, AngularFireDatabase],
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
      confirmPassword: 'test@123'
    }
    component.registerUser();
    expect(component.openSignUpModal).toBeFalsy();
    expect(component.onSignUpSuccess).toBeTruthy();
    expect(authService.userRegistration).toHaveBeenCalledWith(component.user);
  });
});
