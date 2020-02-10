import {TestBed} from '@angular/core/testing';
import {ToastrModule} from 'ngx-toastr';

import {ToastManager} from './toast.service';

describe('ToastManager', () => {
  let service: ToastManager;

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
    });
    service = TestBed.inject(ToastManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
