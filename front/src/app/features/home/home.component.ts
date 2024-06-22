import { Component, inject } from '@angular/core';
import { BetCardComponent } from '../bet/bet-card/bet-card.component';
import { BetService } from '../../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../../core/service/race/race.service';
import { RaceState } from '../../core/service/race/race.model';
import { ListBettingComponent } from '../bet/list-betting/list-betting.component';
import { RouterOutlet } from '@angular/router';
import { RaceViewComponent } from '../race/race-view/race-view.component';
import { ContainerDirective } from '../../shared/container.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BetCardComponent,
    ListBettingComponent,
    RouterOutlet,
    RaceViewComponent,
    ContainerDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { class: 'h-full flex flex-col' }
})
export class HomeComponent {
  raceService = inject(RaceService);

  raceState = toSignal(this.raceService.getRaceState$());

  bets = inject(BetService).bets;

  raceStartOptions: Array<{ title: string; timer: number }> = [
    { title: 'Nouvelle course', timer: 25000 },
    { title: 'Course rapide', timer: 8000 }
  ]

  protected readonly RaceState = RaceState;

  startRace(raceDueTimeMs: number) {
    this.raceService.launchNextRace(raceDueTimeMs);
  }
}
