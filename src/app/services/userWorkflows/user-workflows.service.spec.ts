import { TestBed } from '@angular/core/testing';

import { UserWorkflowsService } from './user-workflows.service';

describe('UserWorkflowsService', () => {
  let service: UserWorkflowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWorkflowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
