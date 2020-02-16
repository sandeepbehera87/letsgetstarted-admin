import {TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';

describe('AuthService', () => {
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      providers: [ErrorHandlerService, {provide: Router, useValue: mockRouter}],
    }),
  );

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });
});
