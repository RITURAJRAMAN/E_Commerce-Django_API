import { TestBed } from '@angular/core/testing';

import { CartstateService } from './cartstate.service';

describe('CartstateService', () => {
  let service: CartstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
