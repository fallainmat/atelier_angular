import { Component } from '@angular/core';
import { HugeComponentComponent } from './huge-component.component';

@Component({
  standalone: true,
  imports: [
    HugeComponentComponent
  ],
  template: `
    <h1 class="text-center text-4xl mb-20">Defer example</h1>
    <div class="text-center text-2xl border-2 p-2 rounded-sm border-black">
      @defer (on interaction; prefetch on hover) {
        <app-huge-component/>
      }
      @placeholder () {
        <p>Huge component default content</p>
      } @error {
        <p>Component creation error</p>
      }
      @loading (minimum 4000ms) {
        <p>Chargement en cours</p>
      }
    </div>
  `
})
export class ExampleDeferComponent {
}
