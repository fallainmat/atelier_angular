import { Component, computed, inject } from '@angular/core';
import { BetCardComponent } from '../bet/bet-card/bet-card.component';
import { BetService } from '../../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../../core/service/race/race.service';
import { RaceState } from '../../core/service/race/race.model';

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

  raceState = toSignal(this.raceService.getRaceState$());

  bets = toSignal(inject(BetService).getBets());

  constructor() {
    console.log(this.raceState());
  }

  startRace() {
    this.raceService.launchNextRace();
  }

  protected readonly RaceState = RaceState;
}
