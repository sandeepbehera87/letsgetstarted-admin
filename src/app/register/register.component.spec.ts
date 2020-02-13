import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {RegisterComponent} from './register.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {CustomMaterialModule} from '../../core/shared/material.module';
import {HeaderComponent} from '../header/header.component';
import {ErrorHandlerService} from '../../core/http-error-handling/error-handler.service';
import {ToastManager} from '../../core/toast/toast.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        HttpClientModule,
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
        BrowserAnimationsModule,
        MDBBootstrapModule,
        CustomMaterialModule,
      ],
      declarations: [RegisterComponent, HeaderComponent],
      providers: [
        ErrorHandlerService,
        ToastManager,
        {provide: Router, useValue: mockRouter},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false on calling register function', () => {
    expect(component.register()).toBeFalsy();
  });
});
