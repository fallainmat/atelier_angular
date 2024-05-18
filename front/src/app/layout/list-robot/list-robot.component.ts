import {Component, inject} from '@angular/core';
import {CardComponent} from "../../shared/card/card.component";
import {RobotModel, RobotService} from "../../core/robot.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-list-robot',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './list-robot.component.html',
  styleUrl: './list-robot.component.scss'
})
export class ListRobotComponent {
  protected robots = toSignal<RobotModel[]>(inject(RobotService).getRobots());
}
