import { Component, computed, effect, inject, signal } from '@angular/core';
import { RaceState } from '../../core/service/race/race.model';
import { AsyncPipe, DatePipe, JsonPipe, NgStyle } from '@angular/common';
import { RaceService } from '../../core/service/race/race.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Robot } from '../../core/service/robot/robot.model';

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

  courseResult = computed<Array<Robot>>(() => {
    const race = this.raceInfos();
    return race
      ? race.robots.sort((r1, r2) => r2.state.distanceTraveled - r1.state.distanceTraveled)
      : [];
  })

  protected readonly RaceState = RaceState;

  private raceTimer = 0;

  constructor() {
    effect(() => {
      if (this.raceInfos() === null) {
        this.raceStartTime.set(0);
      } else if (this.raceInfos()?.state === RaceState.Started) {
        const audio = new Audio('/assets/sound/pan.mp3');
        audio.play();
      } else if (this.raceStartTime() === 0) {
        this.initRaceTimer();
        // TODO this should not be called after start
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
