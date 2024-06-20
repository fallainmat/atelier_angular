import {Component, signal} from '@angular/core';
import {CounterChildComponent} from "../counter/components/counter-child/counter-child.component";
import {InputChildComponent} from "./components/input-child/input-child.component";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CounterChildComponent,
    InputChildComponent,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  checked = signal(false);
  disabled = signal(false);
}
