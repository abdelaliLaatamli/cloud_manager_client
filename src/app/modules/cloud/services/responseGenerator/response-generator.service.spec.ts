import { TestBed } from '@angular/core/testing';

import { ResponseGeneratorService } from './response-generator.service';

describe('ResponseGeneratorService', () => {
  let service: ResponseGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
