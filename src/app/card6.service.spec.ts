import { TestBed } from '@angular/core/testing';

import { Card6Service } from './card6.service';

describe('Card6Service', () => {
  let service: Card6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Card6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
