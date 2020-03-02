import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastrModule} from 'ngx-toastr';
import {Router} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {reducers} from '../reducers';
import {HeaderComponent} from './header.component';
import {AppRoutingModule} from '../app-routing.module';
import {ErrorHandlerService} from '../../core/http-error-handling/error-handler.service';
import {ToastManager} from '../../components/toast/toast.service';
import {AuthService} from '../../core/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const mockAuthService = {
    signOut: jasmine.createSpy('signOut').and.returnValue(of('')),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule,
        MDBBootstrapModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      declarations: [HeaderComponent],
      providers: [
        ErrorHandlerService,
        ToastManager,
        {provide: Router, useValue: mockRouter},
        {provide: AuthService, useValue: mockAuthService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to register screen on goToRegisterPage click', () => {
    component.goToRegisterPage();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should go to login screen on gotToLoginPage click', () => {
    component.gotToLoginPage();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should go to addQuestion screen on goToAddQuestion click', () => {
    component.goToAddQuestion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['add-questions']);
  });

  it('should go to viewQuestion screen on viewQuestion click', () => {
    component.gotToViewQuestion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['view-questions']);
  });

  it('should call signout api on signout call', () => {
    component.signOut();
    expect(mockAuthService.signOut).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
