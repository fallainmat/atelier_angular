import { Component, computed, inject } from '@angular/core';
import { BetCardComponent } from './components/bet-card/bet-card.component';
import { BetService } from '../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../core/service/race/race.service';
import { RaceState } from '../core/service/race/race.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BetCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  raceService = inject(RaceService);

  race = toSignal(this.raceService.getCurrentRace$());

  betsOpened = computed(() => {
    return this.race()?.state === RaceState.BetsOpened
  });

  bets = toSignal(inject(BetService).getBets());

  startRace() {
    this.raceService.launchNextRace();
  }
}
