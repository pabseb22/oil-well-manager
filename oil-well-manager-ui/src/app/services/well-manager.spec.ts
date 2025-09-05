import { TestBed } from '@angular/core/testing';

import { WellManager } from './well-manager';

describe('WellManager', () => {
  let service: WellManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
