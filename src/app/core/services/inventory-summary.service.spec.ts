import { TestBed } from '@angular/core/testing';

import { InventorySummaryService } from './inventory-summary.service';

describe('InventorySummaryService', () => {
  let service: InventorySummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
