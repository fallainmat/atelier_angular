import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  template: `
    <ng-container *ngIf="messages$ | async as messages; else noMessages">
      <p *ngFor="let message of messages; trackBy: trackByFn">
        {{ message.body }}
      </p>
    </ng-container>
    <ng-template #noMessages>
      <p>No messages</p>
    </ng-template>
    <ng-template [ngIf]="messages$ | async" let-messages>
      <p *ngFor="let message of messages; trackBy: trackByFn">
        {{ message.body }}
      </p>
    </ng-template>
    <a class="block" *ngIf="!(messages$ | async)" (click)="addMessages()">
      Add messages
    </a>
  `,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  standalone: true
})
export class ExampleDirectiveComponent {
  messages$ = new BehaviorSubject<Array<{ body: string, id: number }> | null>(null);

  trackByFn(index: number, message: { body: string, id: number }) {
    return message.id;
  };

  addMessages() {
    this.messages$.next([
      { id: 1, body: 'message 1' },
      { id: 2, body: 'message 2' },
      { id: 3, body: 'message 3' }
    ]);
  }
}
