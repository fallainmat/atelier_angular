import { Component, computed, inject } from '@angular/core';
import { BetCardComponent } from '../bet/bet-card/bet-card.component';
import { BetService } from '../../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../../core/service/race/race.service';
import { RaceState } from '../../core/service/race/race.model';
import { ListBettingComponent } from '../bet/list-betting/list-betting.component';
import { RouterOutlet } from '@angular/router';
import { RaceViewComponent } from '../race/race-view/race-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BetCardComponent,
    ListBettingComponent,
    RouterOutlet,
    RaceViewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {class: 'h-full flex flex-col'}
})
export class HomeComponent {
  raceService = inject(RaceService);

  raceState = toSignal(this.raceService.getRaceState$());

  // TODO Race change computed
  bets = toSignal(inject(BetService).getBets());

  startRace(raceDueTimeMs: number) {
    this.raceService.launchNextRace(raceDueTimeMs);
  }

  protected readonly RaceState = RaceState;
}
