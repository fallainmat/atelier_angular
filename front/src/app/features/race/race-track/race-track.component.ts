import { Component, input } from '@angular/core';
import { Race, RaceState } from '../../../core/service/race/race.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-race-track',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './race-track.component.html',
  styleUrl: './race-track.component.scss'
})
export class RaceTrackComponent {

  race = input<Race | null | undefined>(null);

  protected readonly RaceState = RaceState;
}
