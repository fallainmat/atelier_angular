import {Component, inject} from '@angular/core';
import {BetCardComponent} from "./components/bet-card/bet-card.component";
import {BetService} from "../core/service/bet/bet.service";
import {toSignal} from "@angular/core/rxjs-interop";

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
}
