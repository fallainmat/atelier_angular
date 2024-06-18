import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { RaceService } from '../../../core/service/race/race.service';
import { Robot } from '../../../core/service/robot/robot.model';

export const robotDetailResolver: ResolveFn<Robot | undefined> = (route) => {
  return inject(RaceService).getRobotByName(route.params['name']);
};
