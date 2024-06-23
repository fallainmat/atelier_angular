import {Component, input} from '@angular/core';
import {Robot} from "../../../core/service/robot/robot.model";

@Component({
  selector: 'app-robot-detail',
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss',
  host: {
    'class': 'flex flex-col flex-1'
  }
})
export class RobotDetailComponent {
  robot = input.required<Robot>();
}
