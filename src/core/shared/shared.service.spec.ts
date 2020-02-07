import {TestBed} from '@angular/core/testing';

import {SharedService} from './shared.service';

xdescribe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });
});
