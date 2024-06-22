import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Race } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-race-view-header',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './race-view-header.component.html'
})
export class RaceViewHeaderComponent {
  race = input.required<Race | null>()
}
