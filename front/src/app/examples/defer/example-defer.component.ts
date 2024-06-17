import { Component } from '@angular/core';
import { HugeComponentComponent } from './huge-component.component';

@Component({
  standalone: true,
  imports: [
    HugeComponentComponent
  ],
  template: `
    @defer (on interaction; prefetch on hover) {
      <app-huge-component/>
    }
    @placeholder () {
      <p>Default content</p>
    } @error {
      <p>Network error</p>
    }
    @loading (minimum 4000ms) {
      <p>Chargement en cours</p>
    }
  `
})
export class ExampleDeferComponent {
}
