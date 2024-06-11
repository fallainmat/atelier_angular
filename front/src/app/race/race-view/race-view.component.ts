import { Component, effect, inject, signal } from '@angular/core';
import { RaceState } from '../../core/service/race/race.model';
import { AsyncPipe, DatePipe, JsonPipe, NgStyle } from '@angular/common';
import { RaceService } from '../../core/service/race/race.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-race-view',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    DatePipe,
    NgStyle
  ],
  templateUrl: './race-view.component.html',
  styleUrl: './race-view.component.scss'
})
export class RaceViewComponent {
  raceService = inject(RaceService);

  raceInfos = toSignal(this.raceService.getCurrentRace$());

  raceStartTime = signal<number>(0);

  protected readonly RaceState = RaceState;

  private raceTimer = 0;

  constructor() {
    effect(() => {
      if (this.raceInfos() === null) {
        this.raceStartTime.set(0);
      } else if (this.raceStartTime() === 0) {
        this.initRaceTimer();
      }
    }, { allowSignalWrites: true })
  }

  private initRaceTimer() {
    clearInterval(this.raceTimer);
    const raceInfos = this.raceInfos();
    if (raceInfos?.state === RaceState.BetsOpened) {
      this.raceTimer = setInterval(() => {
        const remainingTime = Math.ceil((raceInfos.endBetTime.getTime() - new Date().getTime()) / 1000);
        this.raceStartTime.set(remainingTime);
        if (remainingTime < 0) {
          clearInterval(this.raceTimer);
        }
      }, 1000);
    }
  }
}
