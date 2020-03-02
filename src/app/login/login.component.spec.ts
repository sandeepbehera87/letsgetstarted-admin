import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {of, throwError} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSpinnerService} from 'ngx-spinner';
import {StoreModule} from '@ngrx/store';
import {CustomMaterialModule} from '../../core/shared/material.module';
import {LoginComponent} from './login.component';
import {HeaderComponent} from '../header/header.component';
import {reducers} from '../reducers';
import {LoginData} from '../model/logindata';
import {AuthService} from '../../core/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const loginData: LoginData = {
    email: 'test@gmaill.com',
    password: 'test123',
  };
  const response = {
    token: 'token',
  };
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const mockSpinner = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };
  const mockAuthService = {
    signIn: jasmine.createSpy('signIn').and.returnValue(of(response)),
  };
  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
    subscribe: jasmine.createSpy('subscribe'),
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
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: NgxSpinnerService, useValue: mockSpinner},
        {provide: AuthService, useValue: mockAuthService},
        {provide: Store, useValue: mockStore},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the user login action onLogIn click ', () => {
    component.loginData = loginData;
    component.onLogIn();
    expect(mockSpinner.show).toHaveBeenCalled();
    expect(mockAuthService.signIn).toHaveBeenCalledWith(loginData);
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(Object));
    expect(mockSpinner.hide).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['add-questions']);
  });
  xit('should hise spinner on error while user login ', () => {
    mockAuthService.signIn = jasmine
      .createSpy('signIn')
      .and.returnValue(throwError({status: 404}));
    component.loginData = loginData;
    component.onLogIn();
    expect(mockSpinner.hide).toHaveBeenCalled();
  });
});
