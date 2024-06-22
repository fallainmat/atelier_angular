import { Component, computed, effect, input, OnDestroy, signal } from '@angular/core';
import { Race, RaceState } from '../../../core/service/race/race.model';

@Component({
  selector: 'app-race-start-timer',
  standalone: true,
  imports: [],
  templateUrl: './race-start-timer.component.html',
  styleUrl: './race-start-timer.component.scss'
})
export class RaceStartTimerComponent implements OnDestroy {

  race = input.required<Race | null>();

  raceRemainingTime = signal(0);

  raceTimer = computed(() => {
    if (this.race()?.state === RaceState.BetsOpened) {
      return this.raceRemainingTime()
    } else {
      return 0;
    }
  });

  private raceTimerTask = 0;

  constructor() {
    effect(() => {
      if (this.race()?.state === RaceState.BetsOpened) {
        this.startTimer();
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.raceTimerTask);
  }

  private startTimer() {
    this.raceTimerTask = setInterval(() => {
      const endBetTime = this.race()?.endBetTime.getTime() || new Date().getTime();
      const remainingTime = Math.ceil((endBetTime - new Date().getTime()) / 1000);
      this.raceRemainingTime.set(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(this.raceTimerTask);
      }
    }, 1000);
  }
}
