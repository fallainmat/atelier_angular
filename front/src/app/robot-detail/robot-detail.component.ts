import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {RobotModel} from "../core/robot.service";

@Component({
  selector: 'app-robot-detail',
  standalone: true,
  imports: [
    RouterLink,
    JsonPipe
  ],
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export class RobotDetailComponent {
  robot = input.required<RobotModel>();
}
