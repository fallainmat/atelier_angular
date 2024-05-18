import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { robotDetailResolver } from './robot-detail.resolver';

describe('robotDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => robotDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
