import { TestBed } from '@angular/core/testing';

import { PasarUsuarioService } from './pasar-usuario.service';

describe('PasarUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasarUsuarioService = TestBed.get(PasarUsuarioService);
    expect(service).toBeTruthy();
  });
});
