import { Component, computed, inject, input } from '@angular/core';
import { JsonPipe, NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { BetSelectedModel, BetService } from '../../../../../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../../../../../core/service/race/race.service';
import { RaceState } from '../../../../../core/service/race/race.model';

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
  race = toSignal(inject(RaceService).getCurrentRace$());

  betSelected = input.required<BetSelectedModel>();

  betService = inject(BetService);

  betsSelected = this.betService.betsSelected;

  betsClosed = computed(() => {
    return this.race()?.state !== RaceState.BetsOpened
  });

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
