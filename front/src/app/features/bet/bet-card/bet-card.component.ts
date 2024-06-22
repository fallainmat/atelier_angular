import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { BetModel, BetService, BetType, RunnerModel } from '../../../core/service/bet/bet.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bet-card',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass,
    FormsModule,
    NgStyle
  ],
  templateUrl: './bet-card.component.html',
  styleUrl: './bet-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetCardComponent {
  betConfig = input.required<BetModel>();
  betService = inject(BetService);

  protected readonly BetType = BetType;

  bet(runner: RunnerModel, betConfig: BetModel) {
    const { id, action, name } = betConfig;
    this.betService.saveBet({ ...runner, bet: { id, action, name }, coins: 5 });
  }
}