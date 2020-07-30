import { TestBed } from '@angular/core/testing';

import { EntradaServService } from './entrada-serv.service';

describe('EntradaServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntradaServService = TestBed.get(EntradaServService);
    expect(service).toBeTruthy();
  });
});
