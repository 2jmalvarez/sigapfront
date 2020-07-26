import { TestBed } from '@angular/core/testing';

import { ComunicService } from './comunic.service';

describe('ComunicService', () => {
  let service: ComunicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
