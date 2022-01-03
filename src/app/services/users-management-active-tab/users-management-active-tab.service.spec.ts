import { TestBed } from '@angular/core/testing';

import { UsersManagementActiveTabService } from './users-management-active-tab.service';

describe('UsersManagementActiveTabService', () => {
  let service: UsersManagementActiveTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersManagementActiveTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
