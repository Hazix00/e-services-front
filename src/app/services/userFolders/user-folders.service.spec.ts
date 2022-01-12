import { TestBed } from '@angular/core/testing';

import { UserFoldersService } from './user-folders.service';

describe('UserFoldersService', () => {
  let service: UserFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
