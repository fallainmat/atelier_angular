import { Component } from '@angular/core';
import { QueriesExampleComponent } from './queries-wrapper.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    QueriesExampleComponent,
    RouterLink
  ],
  template: `
    <div class="w-full flex flex-col items-center mt-10">
      <app-queries-example>
        <ul>
          <li><a routerLink="/link1">Link 1</a></li>
          <li><a routerLink="/link2">Link 2</a></li>
        </ul>
      </app-queries-example>
    </div>
  `
})
export class QueriesDemoComponent {
}
