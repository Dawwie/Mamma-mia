import { TestBed } from '@angular/core/testing';

import { PizzasService } from './pizza.service';

describe('PizzasService', () => {
  let service: PizzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
