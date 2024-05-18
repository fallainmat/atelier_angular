import {Component, input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BetModel} from "../../../core/service/bet/bet.service";

@Component({
  selector: 'app-bet-card',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './bet-card.component.html',
  styleUrl: './bet-card.component.scss'
})
export class BetCardComponent {
  betConfig = input.required<BetModel>();

  bet(betConfig: BetModel) {
    console.log('bet', betConfig);
  }
}
