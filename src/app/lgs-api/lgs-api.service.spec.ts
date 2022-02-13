import { TestBed } from '@angular/core/testing';

import { LgsApiService } from './lgs-api.service';

describe('LgsApiService', () => {
  let service: LgsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
