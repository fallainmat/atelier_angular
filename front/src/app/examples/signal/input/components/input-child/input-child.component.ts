import {Component, input, model} from '@angular/core';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-input-child',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './input-child.component.html'
})
export class InputChildComponent {
  checked = model(false);
  disabled = input(false);
  toggle() {
    this.checked.set(!this.checked());
  }
}
