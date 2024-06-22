import { Component, input } from '@angular/core';
import { Race, RaceState } from '../../../core/service/race/race.model';
import { NgStyle } from '@angular/common';
import { RaceBotComponent } from '../race-bot/race-bot.component';

@Component({
  selector: 'app-race-track',
  standalone: true,
  imports: [
    NgStyle,
    RaceBotComponent
  ],
  templateUrl: './race-track.component.html',
  styleUrl: './race-track.component.scss'
})
export class RaceTrackComponent {
  race = input.required<Race | null>();

  protected readonly RaceState = RaceState;
}
