import { TestBed } from '@angular/core/testing';

import { Card12serviceService } from './card12service.service';

describe('Card12serviceService', () => {
  let service: Card12serviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Card12serviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
