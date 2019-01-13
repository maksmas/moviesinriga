import { TestBed } from '@angular/core/testing';

import { CinamonRepertoireService } from './cinamon-repertoire.service';

describe('CinamonRepertoireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CinamonRepertoireService = TestBed.get(CinamonRepertoireService);
    expect(service).toBeTruthy();
  });
});
