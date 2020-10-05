import { TestBed } from '@angular/core/testing';

import { DialogServService } from './dialog-serv.service';

describe('DialogServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogServService = TestBed.get(DialogServService);
    expect(service).toBeTruthy();
  });
});
