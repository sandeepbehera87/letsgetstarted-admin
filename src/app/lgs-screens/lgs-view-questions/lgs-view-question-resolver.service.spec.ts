import { TestBed } from '@angular/core/testing';

import { LgsViewQuestionResolverService } from './lgs-view-question-resolver.service';

describe('LgsViewQuestionResolverService', () => {
  let service: LgsViewQuestionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgsViewQuestionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
