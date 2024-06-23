import { Component } from '@angular/core';
import { HugeComponentComponent } from './huge-component.component';
import { ContainerDirective } from '../../shared/container.directive';

@Component({
  standalone: true,
  imports: [
    HugeComponentComponent,
    ContainerDirective
  ],
  template: `
    <div [appContainer]="'sky'" class="flex-1 text-white">
      <h1 class="text-center text-4xl mb-10">Defer example</h1>
      <div class="text-center text-2xl border-2 mt-4 p-2 rounded-sm border-white">
        @defer (on interaction; prefetch on hover) {
          <app-huge-component/>
        } @placeholder () {
          <p>Huge component default content</p>
        } @error {
          <p>Component creation error</p>
        } @loading (minimum 4000ms) {
          <p>Chargement en cours</p>
        }

      </div>
    </div>
  `,
  host: {
    'class': 'flex flex-col flex-1'
  }
})
export class ExampleDeferComponent {
}
