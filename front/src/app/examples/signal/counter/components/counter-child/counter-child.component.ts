import {Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-counter-child',
  standalone: true,
  imports: [],
  templateUrl: './counter-child.component.html',
  styleUrl: './counter-child.component.scss'
})
export class CounterChildComponent {
  timer = signal(0);
  timerEffect = effect(() => {
    const timerId = setInterval(() => {
     this.timer.update((value) => value + 1);
      console.log('timer', this.timer());
    }, 1000);
  });

  stopSetInterval() {
    this.timerEffect.destroy()
  }
}
