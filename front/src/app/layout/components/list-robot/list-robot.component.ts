import {Component, inject} from '@angular/core';
import {CardComponent} from "./components/card/card.component";
import {toSignal} from "@angular/core/rxjs-interop";
import {RobotModel, RobotService} from "../../../core/service/robot/robot.service";
import { RaceService } from '../../../core/service/race/race.service';
import { Race } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-list-robot',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list-robot.component.html',
  styleUrl: './list-robot.component.scss'
})
export class ListRobotComponent {
  protected race = toSignal<Race | null>(inject(RaceService).getCurrentRace$());
}
