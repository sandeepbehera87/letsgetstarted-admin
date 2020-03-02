import {TestBed} from '@angular/core/testing';
import {ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

import {ToastManager} from './toast.service';

describe('ToastManager', () => {
  let service: ToastManager;
  const mockToaster = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      providers: [{provide: ToastrService, useValue: mockToaster}]
    });
    service = TestBed.inject(ToastManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the success toaster', () => {
    service.showSuccess('Success msg');
    expect(mockToaster.success).toHaveBeenCalledWith('Success msg', 'Success');
  });
  it('should show the error toaster', () => {
    service.showError('Error msg');
    expect(mockToaster.error).toHaveBeenCalledWith('Error msg', 'Error');
  });
  it('should show the warning toaster', () => {
    service.showWarning('Warn msg');
    expect(mockToaster.warning).toHaveBeenCalledWith('Warn msg', 'Alert');
  });
});
