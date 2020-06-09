import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';

import { CustomMaterialModule } from '../../lgs-shared/material.module';
import { HeaderComponent } from '../../lgs-components/lgs-header/header.component';
import { AuthService } from '../../lgs-core/lgs-auth-service/auth.service';
import { LoginComponent } from './login.component';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MDBBootstrapModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        StoreModule.forRoot({}),
        HttpClientModule,
        CustomMaterialModule,
      ],
      declarations: [LoginComponent, HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: NgxSpinnerService, useValue: mockSpinner },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Store, useValue: mockStore },
        Actions,
        ofType,
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
    const spinnerSpy = jest.spyOn((component as any).spinner, 'show');
    const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
    component.onLogIn();
    expect(spinnerSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });
  xit('should hise spinner on error while user login ', () => {
    mockAuthService.signIn = jasmine
      .createSpy('signIn')
      .and.returnValue(throwError({ status: 404 }));
    component.onLogIn();
    expect(mockSpinner.hide).toHaveBeenCalled();
  });
});
