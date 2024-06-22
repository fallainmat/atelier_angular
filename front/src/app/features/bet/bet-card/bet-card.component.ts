import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { BetService } from '../../../core/service/bet/bet.service';
import { FormsModule } from '@angular/forms';
import { BetModel, BetRunnerModel } from '../../../core/service/bet/bet.model';
import { ContainerDirective } from '../../../shared/container.directive';

@Component({
  selector: 'app-bet-card',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass,
    FormsModule,
    NgStyle,
    ContainerDirective
  ],
  templateUrl: './bet-card.component.html',
  styleUrl: './bet-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetCardComponent {
  betConfig = input.required<BetModel>();
  betService = inject(BetService);

  bet(runner: BetRunnerModel, betConfig: BetModel) {
    const { id, name } = betConfig;
    this.betService.saveBet({ ...runner, bet: { id, name }, coins: 5 });
  }
}
