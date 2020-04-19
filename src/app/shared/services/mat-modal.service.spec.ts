import { TestBed } from '@angular/core/testing';

import { MatModalService } from './mat-modal.service';

describe('MatModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatModalService = TestBed.get(MatModalService);
    expect(service).toBeTruthy();
  });
});
