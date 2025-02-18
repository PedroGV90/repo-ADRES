import { TestBed } from '@angular/core/testing';

import { AdquisicionesService } from './adquisiciones.service';

describe('AdquisicionesService', () => {
  let service: AdquisicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdquisicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
