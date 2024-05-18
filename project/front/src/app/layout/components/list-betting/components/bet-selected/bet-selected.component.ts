import {Component, inject, input} from '@angular/core';
import {JsonPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {BetSelectedModel, BetService} from "../../../../../core/service/bet/bet.service";

@Component({
  selector: 'app-bet-selected',
  standalone: true,
  imports: [
    JsonPipe,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './bet-selected.component.html',
  styleUrl: './bet-selected.component.scss'
})
export class BetSelectedComponent {
  betSelected = input.required<BetSelectedModel>();

  betService = inject(BetService);
  betsSelected = this.betService.betSelected;
  validate = this.betService.validateBet;

  deleteBet(betSelected: BetSelectedModel) {
    this.betService.deleteBet(betSelected);
  }

  updateValue(id: string, isIncrement: boolean) {
    this.betsSelected.update(v => v.map(betSelected => betSelected.bet.id === id ? {
      ...betSelected,
      coins: isIncrement ? betSelected.coins + 1 : betSelected.coins - 1
    } : betSelected));
  }
}
