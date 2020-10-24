import { TestBed } from '@angular/core/testing';

import { GetclipService } from './getclip.service';

describe('GetclipService', () => {
  let service: GetclipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetclipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
