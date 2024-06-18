import {Component, inject} from '@angular/core';
import {ListRobotCardComponent} from "../list-robot-card/list-robot-card.component";
import {toSignal} from "@angular/core/rxjs-interop";
import { RaceService } from '../../../core/service/race/race.service';
import { Race } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-list-robot',
  standalone: true,
  imports: [ListRobotCardComponent],
  templateUrl: './list-robot.component.html',
  styleUrl: './list-robot.component.scss'
})
export class ListRobotComponent {
  race = toSignal<Race | null>(inject(RaceService).getCurrentRace$());
}
