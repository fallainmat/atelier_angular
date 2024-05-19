import {Component, DestroyRef, inject} from '@angular/core';
import {BetCardComponent} from "./components/bet-card/bet-card.component";
import {BetService} from "../core/service/bet/bet.service";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

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
  bets = toSignal(inject(BetService).getBets());
  destroyRef = inject(DestroyRef);
  betService = inject(BetService);

  startRace() {
    this.betService.startRace().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
