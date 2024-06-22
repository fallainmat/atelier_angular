import { Component, computed, inject, input } from '@angular/core';
import { JsonPipe, NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { BetService } from '../../../../../core/service/bet/bet.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceService } from '../../../../../core/service/race/race.service';
import { RaceState } from '../../../../../core/service/race/race.model';
import { BetSelectedModel } from '../../../../../core/service/bet/bet.model';

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
  betService = inject(BetService);

  raceState = toSignal(inject(RaceService).getRaceState$());

  betsClosed = computed(() => this.raceState() !== RaceState.BetsOpened);

  betSelected = input.required<BetSelectedModel>();

  deleteBet(betSelected: BetSelectedModel) {
    this.betService.deleteBet(betSelected);
  }

  updateValue(id: string, isIncrement: boolean) {
    this.betService.betsSelected.update(v => v.map(betSelected =>
      betSelected.bet.id === id
        ? {
          ...betSelected,
          coins: isIncrement ? ++betSelected.coins : --betSelected.coins
        }
        : betSelected
    ));
  }
}
