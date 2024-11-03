import { Component, computed, effect, input, signal } from '@angular/core';
import { Race, RaceState } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-race-start-timer',
  standalone: true,
  imports: [],
  templateUrl: './race-start-timer.component.html',
  styleUrl: './race-start-timer.component.scss'
})
export class RaceStartTimerComponent {

  race = input.required<Race | null>();

  raceRemainingTime = signal(0);

  raceTimer = computed(() => {
    return this.race()?.state === RaceState.BetsOpened ? this.raceRemainingTime() : 0;
  });

  private raceTimerTask = 0;

  constructor() {
    effect((onCleanup) => {
      if (this.race()?.state === RaceState.BetsOpened) {
        this.startTimer();
      }
      onCleanup(() => this.stopTimer());
    })
  }

  private startTimer() {
    this.raceTimerTask = window.setInterval(() => {
      const endBetTime = this.race()?.endBetTime.getTime() || new Date().getTime();
      const remainingTime = Math.ceil((endBetTime - new Date().getTime()) / 1000);
      this.raceRemainingTime.set(remainingTime);
      if (remainingTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.raceTimerTask);
  }
}
