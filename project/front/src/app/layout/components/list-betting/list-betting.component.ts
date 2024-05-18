import {Component, signal} from '@angular/core';
import {BetSelectedComponent} from "./components/bet-selected/bet-selected.component";

@Component({
  selector: 'app-list-betting',
  standalone: true,
  imports: [
    BetSelectedComponent
  ],
  templateUrl: './list-betting.component.html',
  styleUrl: './list-betting.component.scss'
})
export class ListBettingComponent {
  betsSelected = signal([])

  validateBet() {
    console.log('validate bet');
  }
}
