import {TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './api.service';
import {ErrorHandlerService} from '../lgs-http-error-handling/error-handler.service';

describe('ApiService', () => {
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
    const service: ApiService = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
  });
});
