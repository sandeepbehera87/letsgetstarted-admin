import { TestBed } from '@angular/core/testing';

import { LgsPermissionGuardService } from './lgs-permission-guard.service';

describe('LgsPermissionGuardService', () => {
  let service: LgsPermissionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgsPermissionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
