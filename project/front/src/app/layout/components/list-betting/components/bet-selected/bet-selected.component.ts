import {Component, input} from '@angular/core';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-bet-selected',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './bet-selected.component.html',
  styleUrl: './bet-selected.component.scss'
})
export class BetSelectedComponent {
  bet = input.required();

}
