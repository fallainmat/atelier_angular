import { Component, input } from '@angular/core';
import { RaceState } from '../../../core/service/race/race.model';
import { Robot } from '../../../core/service/robot/robot.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-race-bot',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './race-bot.component.html',
  styleUrl: './race-bot.component.scss'
})
export class RaceBotComponent {
  robot = input.required<Robot>()
  trackLength = input.required<number>();
  protected readonly RaceState = RaceState;
}
