import { TestBed } from '@angular/core/testing';

import { AmigosUsuService } from './amigos-usu.service';

describe('AmigosUsuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmigosUsuService = TestBed.get(AmigosUsuService);
    expect(service).toBeTruthy();
  });
});
