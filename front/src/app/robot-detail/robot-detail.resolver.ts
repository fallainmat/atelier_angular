import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {RobotModel, RobotService} from "../core/service/robot/robot.service";

export const robotDetailResolver: ResolveFn<RobotModel | undefined> = (route, _) => {
  return inject(RobotService).getRobotById(route.params['id']);
};
