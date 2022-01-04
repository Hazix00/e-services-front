import { TestBed } from '@angular/core/testing';

import { LayoutViewToggleService } from '../layoutViewToggle/layout-view-toggle.service';

describe('LayoutViewToggleService', () => {
  let service: LayoutViewToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutViewToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
