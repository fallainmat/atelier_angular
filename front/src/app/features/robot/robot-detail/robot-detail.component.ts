import { Component, input } from '@angular/core';
import { RobotModel } from '../../../core/service/robot/robot.service';

@Component({
  selector: 'app-robot-detail',
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export class RobotDetailComponent {
  robot = input.required<RobotModel>();

  constructor() {
    console.log('RobotDetailComponent created')
  }
}
