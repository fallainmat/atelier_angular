import {Component, inject, input} from '@angular/core';
import {JsonPipe, NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {BetSelectedModel, BetService} from "../../../../../core/service/bet/bet.service";

@Component({
  selector: 'app-bet-selected',
  standalone: true,
  imports: [
    JsonPipe,
    NgOptimizedImage,
    NgClass,
    NgStyle
  ],
  templateUrl: './bet-selected.component.html',
  styleUrl: './bet-selected.component.scss'
})
export class BetSelectedComponent {
  betSelected = input.required<BetSelectedModel>();

  betService = inject(BetService);
  betsSelected = this.betService.betSelected;
  raceActivated = this.betService.raceActivated;

  deleteBet(betSelected: BetSelectedModel) {
    this.betService.deleteBet(betSelected);
  }

  updateValue(id: string, isIncrement: boolean) {
    this.betsSelected.update(v => v.map(betSelected => betSelected.bet.id === id ? {
      ...betSelected,
      coins: isIncrement ? ++betSelected.coins : --betSelected.coins
    } : betSelected));
  }
}
