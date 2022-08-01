import { TestBed } from '@angular/core/testing';

import { LgsErrorService } from './lgs-error.service';

describe('LgsErrorService', () => {
  let service: LgsErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgsErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
