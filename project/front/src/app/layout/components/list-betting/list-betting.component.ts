import {Component, computed, effect, inject, untracked} from '@angular/core';
import {BetSelectedComponent} from "./components/bet-selected/bet-selected.component";
import {BetService} from "../../../core/service/bet/bet.service";
import {NgClass} from "@angular/common";
import {UserService} from "../../../core/service/user/user.service";

@Component({
  selector: 'app-list-betting',
  standalone: true,
  imports: [
    BetSelectedComponent,
    NgClass
  ],
  templateUrl: './list-betting.component.html',
  styleUrl: './list-betting.component.scss'
})
export class ListBettingComponent {
  betService = inject(BetService);
  userService = inject(UserService);

  betsSelected = this.betService.betSelected;
  totalCoins = computed(() => this.betsSelected().reduce((acc, bet) => acc + (bet.coins * parseInt(bet.odds)), 0));

  openModal = false;

  constructor() {
    effect(() => {
      const coinsUsing = this.betsSelected().map(bet => bet.coins).reduce((acc, coins) => acc + coins, 0);
      this.userService.userCurrent.update(user => {
        return user ? {...user, money: untracked(this.userService.moneyCurrent) - coinsUsing} : null
      });
    }, {allowSignalWrites: true});
  }

  validateBet() {
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }
}
