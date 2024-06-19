import { Component, computed, effect, inject } from '@angular/core';
import { RaceState } from '../../../core/service/race/race.model';
import { AsyncPipe, DatePipe, JsonPipe, NgStyle } from '@angular/common';
import { RaceService } from '../../../core/service/race/race.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceStartTimerComponent } from '../race-start-timer/race-start-timer.component';
import { RaceViewHeaderComponent } from '../race-view-header/race-view-header.component';
import { RaceTrackComponent } from '../race-track/race-track.component';
import { RaceResultComponent } from '../race-result/race-result.component';

enum RaceViewState {
  Bet = 'Bet',
  Run = 'Run',
  Result = 'Result'
}

const raceViewStateMap: Record<RaceState, RaceViewState> = {
  [RaceState.BetsOpened]: RaceViewState.Bet,
  [RaceState.BetsClosed]: RaceViewState.Run,
  [RaceState.Started]: RaceViewState.Run,
  [RaceState.InProgress]: RaceViewState.Run,
  [RaceState.Finished]: RaceViewState.Result
}

@Component({
  selector: 'app-race-view',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    DatePipe,
    NgStyle,
    RaceStartTimerComponent,
    RaceViewHeaderComponent,
    RaceTrackComponent,
    RaceResultComponent
  ],
  templateUrl: './race-view.component.html'
})
export class RaceViewComponent {
  raceService = inject(RaceService);

  race = toSignal(this.raceService.getCurrentRace$());

  raceViewState = computed(() => {
    const raceInfos = this.race();
    return raceInfos ? raceViewStateMap[raceInfos.state] : null
  });

  protected readonly RaceState = RaceState;

  constructor() {
    effect(() => {
      if (this.race()?.state === RaceState.Started) {
        const audio = new Audio('/assets/sound/pan.mp3');
        audio.play();
      }
    })
  }

  protected readonly RaceViewState = RaceViewState;
}
