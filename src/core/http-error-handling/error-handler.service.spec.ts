import {TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {ErrorHandlerService} from './error-handler.service';
import {componentFactoryName} from '@angular/compiler';
import {HttpErrorResponse} from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockSpinner = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: NgxSpinnerService, useValue: mockSpinner},
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error for different error status', () => {
    const errorResponse1 = new HttpErrorResponse({status: 404});
    service.handleError(errorResponse1);
    expect(mockSpinner.hide).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/404']);
    const errorResponse2 = new HttpErrorResponse({status: 500});
    service.handleError(errorResponse2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/500']);
    const errorResponse3 = new HttpErrorResponse({status: 403});
    service.handleError(errorResponse3);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['session-expire']);
  });
});
