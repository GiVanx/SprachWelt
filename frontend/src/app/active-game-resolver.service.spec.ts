import { TestBed } from '@angular/core/testing';

import { ActiveGameResolverService } from './active-game-resolver.service';

describe('ActiveGameResolverService', () => {
  let service: ActiveGameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
