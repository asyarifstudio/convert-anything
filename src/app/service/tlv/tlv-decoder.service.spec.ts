import { TestBed } from '@angular/core/testing';

import { TlvDecoderService } from './tlv-decoder.service';

describe('TlvDecoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TlvDecoderService = TestBed.get(TlvDecoderService);
    expect(service).toBeTruthy();
  });
});
