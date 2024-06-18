import { Component, computed, input } from '@angular/core';
import { Robot } from '../../../core/service/robot/robot.model';
import { Race } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-race-result',
  standalone: true,
  imports: [],
  templateUrl: './race-result.component.html',
  styleUrl: './race-result.component.scss'
})
export class RaceResultComponent {
  race = input<Race | null | undefined>();

  courseResult = computed<Array<Robot>>(() => {
    const race = this.race();
    return race
      ? race.robots.sort((r1, r2) => r2.state.distanceTraveled - r1.state.distanceTraveled)
      : [];
  })
}
