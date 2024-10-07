import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { robotDetailResolver } from './robot-detail.resolver';
import { Robot } from '../../../core/service/robot/robot.model';

describe('robotDetailResolver', () => {
  const executeResolver: ResolveFn<Robot | undefined> = (...resolverParameters) =>
    TestBed.runInInjectionContext(
      () => robotDetailResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
