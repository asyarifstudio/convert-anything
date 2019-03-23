import { TestBed } from '@angular/core/testing';

import { TextConverterService } from './text-converter.service';

describe('TextConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextConverterService = TestBed.get(TextConverterService);
    expect(service).toBeTruthy();
  });
});
