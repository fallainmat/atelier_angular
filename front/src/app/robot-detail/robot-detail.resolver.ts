import { ResolveFn } from '@angular/router';
import {RobotModel, RobotService} from "../core/robot.service";
import {inject} from "@angular/core";

export const robotDetailResolver: ResolveFn<RobotModel | undefined> = (route, _) => {
  return inject(RobotService).getRobotById(route.params['id']);
};
