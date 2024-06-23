import { Component, signal } from '@angular/core';
import { HugeComponentComponent } from './huge-component.component';
import { ContainerDirective } from '../../shared/container.directive';

@Component({
  standalone: true,
  imports: [
    HugeComponentComponent,
    ContainerDirective
  ],
  template: `
    <div [appContainer]="'sky'" class="flex-1 text-white mb-2">
      <a class="cursor-pointer" (click)="addContent()">Ajouter du contenu</a>
      <h1 class="text-center text-4xl mb-20">Defer example</h1>
      <p class="mb-4">{{ pageContent() }}</p>
      <div class="text-center text-2xl border-2 p-2 rounded-sm border-white">

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
  pageContent = signal<string>('');

  addContent() {
    const tokens = ['Mega Man', 'Optimus Prime', 'Johnny 5', 'Wall-E'];
    let text = '';
    for (var i = 0; i < 80; i++) {
      text += tokens[Math.floor(Math.random() * tokens.length)] + ' ';
    }
    this.pageContent.update((prev) => prev + text);
  }
}
